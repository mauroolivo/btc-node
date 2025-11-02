'use client';
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {ParamsDictionary} from "@/models/api";
import useSWR from "swr";
import {NewAddressResponse, SendResponse} from "@/models/wallet";
import {createRawTransaction, fetcher, sendToAddress} from "@/api/api";
import {
  AlertDialog, AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import WalletAddressDetail from "@/app/wallet/[[...segmentName]]/(address)/wallet-address-detail";

const fields = [
  { name: "address", label: "Address", type: "text" },
  { name: "amount", label: "Amount", type: "number" },
  { name: "fee_rate", label: "Fee Rate (sats/vbyte)", type: "number" },
  { name: "subtractfeefromamount", label: "Subtract fee from amount", type: "checkbox" },
  { name: "replaceable", label: "Replaceable", type: "checkbox" },
];

export default function WalletSend() {
  const [form, setForm] = useState({
    address: "",
    amount: "",
    fee_rate: "",
    subtractfeefromamount: true,
    replaceable: true,
  });

  const addressRef = useRef<HTMLTextAreaElement>(null);

  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const [newTx, setNewTx] = React.useState<string | null>(null);

  const payload: ParamsDictionary = {
    "address": form.address,
    "amount": parseFloat(form.amount),
    "fee_rate": parseFloat(form.fee_rate),
    "subtractfeefromamount": form.subtractfeefromamount,
    "replaceable": form.replaceable,
  }
  console.log(payload)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" && "checked" in e.target
        ? (e.target as HTMLInputElement).checked
        : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Auto-expand textarea
    if (name === "address" && addressRef.current) {
      addressRef.current.style.height = "auto";
      addressRef.current.style.height = addressRef.current.scrollHeight + "px";
    }

    // light validation
    setIsReady(false);
    if ( parseFloat(e.target.form?.amount.value) > 0 && (e.target.form?.address.value.trim()).length > 0 &&
      parseFloat(e.target.form?.fee_rate.value) >= 1 ) {
      setIsReady(true);
    }
    setErrorMsg(null);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOpen(true)
  }
  async function send() {
    try {
      await sendToAddress(payload).then(r => {
        if(r !== undefined) {
          if (r?.result !== undefined) {
            /// show success message
            setErrorMsg(null);
            setNewTx(r?.result);
            setForm({
              address: "",
              amount: "",
              fee_rate: "",
              subtractfeefromamount: true,
              replaceable: true,
            });
            console.log(r?.result);
          }
          else {
            setErrorMsg(r?.error?.message || "Unknown error");
          }
        }
      })
      // console.log("raw transaction:", rt);
    } catch (err) {
      setErrorMsg("Network Unknown error " + err);
    }
  }
  function onConfirm() {
    setOpen(false)
    send()
  }

  return (

    <div className="flex justify-center items-center mt-5">

      <AlertDialog open={open}>
        {/*<AlertDialogTrigger>show alert</AlertDialogTrigger>*/}
        <AlertDialogContent className={" bg-black"}>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Transactions</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
            <div>Address: <span className="text-prominent">{form.address}</span></div>
            <div>Amount: <span className="text-prominent">{form.amount}</span></div>
            <div>Fee rate: <span className="text-prominent">{form.fee_rate}</span></div>
            <div>Subtract fee from amount: <span className="text-prominent">{form.subtractfeefromamount ? "true" : "false"}</span></div>
            <div>Replaceable by fee: <span className="text-prominent">{form.replaceable ? "true" : "false"}</span></div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onConfirm()}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={newTx !== null}>
        {/*<AlertDialogTrigger>show alert</AlertDialogTrigger>*/}
        <AlertDialogContent className={" bg-black"}>
          <AlertDialogHeader>
            <AlertDialogTitle>New transaction created</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
            <div>Tx ID: <span className="text-prominent">{newTx}</span></div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setNewTx(null)}>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <form
        onSubmit={onSubmit}
        className="space-y-4 pt-4 w-full max-w-md p-6 rounded shadow"
      >
        <div className="grid grid-cols-1 gap-4">
          {
            errorMsg &&
            (<p className="text-red-500">Error: {errorMsg}</p>)
          }

          {fields.map((field) => {
            if (field.name === "address") {
              return (
                <label key={field.name} className="flex flex-col">
                  {field.label}
                  <textarea
                    ref={addressRef}
                    className="border-1 p-1 resize-none overflow-hidden min-h-[40px]"
                    placeholder={field.label}
                    name={field.name}
                    value={form[field.name as keyof typeof form] as string}
                    onChange={handleChange}
                    rows={2}
                  />
                </label>
              );
            }
            if (field.type === "checkbox") {
              return (
                <label key={field.name} className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={form[field.name as keyof typeof form] as boolean}
                    onChange={handleChange}
                    className="sr-only peer"
                    id={field.name}
                  />
                  <span className="w-5 h-5 rounded border border-gray-400 flex items-center justify-center peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors duration-150">
                    <svg
                      className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                  <span>{field.label}</span>
                </label>
              );
            }
            if (field.type === "number") {
              return (
                <input
                  key={field.name}
                  className="border-1 p-1"
                  placeholder={field.label}
                  name={field.name}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9\.]*"
                  value={form[field.name as keyof typeof form] as string}
                  onChange={handleChange}
                  autoComplete="off"
                />
              );
            }
            return (
              <input
                key={field.name}
                className="border-1 p-1"
                placeholder={field.label}
                name={field.name}
                type={field.type}
                value={form[field.name as keyof typeof form] as string}
                onChange={handleChange}
              />
            );
          })}
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={!isReady}>Send</Button>
        </div>
      </form>
    </div>
  );
}