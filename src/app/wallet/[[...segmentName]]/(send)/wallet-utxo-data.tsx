"use client";

import {ChangeAddressResponse, DeriveAddressesResponse, UTXO, UTXOResponse} from "@/models/wallet";
import WalletUtxoRow from "@/app/wallet/[[...segmentName]]/(send)/wallet-utxo-row";
import {fetcher} from "@/api/api";
import useSWR from "swr";
import React, {useRef} from "react";
import {ParamsDictionary} from "@/models/api";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";


export default function WalletUtxoData(
  {
    selected,
//                                            handleSelect,
//                                            isSelected,
  }: {
    selected: { txid: string; vout: number, amount: number }[];
//   handleSelect: (txid: string, vout: number) => void;
//   isSelected: (txid: string, vout: number) => boolean;
  }
) {
  const [form, setForm] = useState({
    recipient_address: "",
    recipient_amount: "",
    change_address: "",
    change_amount: "",
    fee_amount: "",
  });

  const fields = [
    {name: "recipient_address", label: "Recipient Address", type: "text"},
    {name: "recipient_amount", label: "Recipient Amount", type: "number"},

    {name: "change_address", label: "Change Address", type: "text"},
    {name: "change_amount", label: "Change Amount", type: "number"},
    {name: "fee_amount", label: "Fee Amount", type: "number"},

  ];
  const [open, setOpen] = React.useState(false);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const [isReady, setIsReady] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const [changeAddress, setChangeaddress] = React.useState<string>("");
  const res = useSWR<ChangeAddressResponse>(
    shouldFetch
      ? [
        "getrawchangeaddress",
        {},
      ]
      : null,
    ([m, p]: [string, ParamsDictionary]) => fetcher(m, p)
  );

  const add = res.data?.result
  if (add !== undefined && add !== null) {
    setChangeaddress(add)
    form["change_address"] = add
    setShouldFetch(false);
  }

  function totalAmount(): number {
    let total = 0;
    selected.forEach((utxo) => {
      total += utxo.amount;
    });
    return total;
  }

  console.log("changeAddress: " + changeAddress)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOpen(true)
  }

  function onConfirm() {

    setOpen(false)
    // setShouldFetch(true);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const {name, value, type} = e.target;
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
    if (
      parseFloat(e.target.form?.recipient_amount.value) > 0 &&
      (e.target.form?.recipient_address.value.trim()).length > 0 &&
      parseFloat(e.target.form?.change_amount.value) > 0 &&
      (e.target.form?.change_address.value.trim()).length > 0 &&
      parseFloat(e.target.form?.fee_amount.value) > 0
    ) {
      setIsReady(true);
    }
    setErrorMsg(null);
  }

  function utxosList(): React.JSX.Element {
    let list_items: unknown[] = [];

    list_items = selected.map((utxo, idx) => (
      <div

        key={idx}
        className="w-full bg-gray-950 mb-4 p-2 border-gray-900 border"
        role="button"
        tabIndex={0}
      >
        <div className="w-full text-center font-bold font-mono text-prominent">Input #{idx}</div>
        <div className={"text-xl text-white"}>
          {/*{(utxo.amount > 0 ? "+" : "") + utxo.amount}*/}
        </div>
        <div className={"text-zinc-400"}>{utxo.txid}</div>
        <div className={"text-zinc-400"}>{utxo.vout}</div>
        <div className={"text-zinc-400"}>{utxo.amount}</div>
        {/*<div className={"text-zinc-400"}>{utxo.address}</div>*/}

      </div>
    ));

    return (<>{list_items}</>)
  }

  return (

    <div className="flex justify-center items-center mt-5">

      <AlertDialog open={open}>
        {/*<AlertDialogTrigger>show alert</AlertDialogTrigger>*/}
        <AlertDialogContent className={" bg-black"}>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Transactions</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
            <div>Recipient Address: <span className="text-prominent">{form.recipient_address}</span></div>
            <div>Recipient Amount: <span className="text-prominent">{form.recipient_amount}</span></div>
            <div>Change Address: <span className="text-prominent">{form.change_address}</span></div>
            <div>Change Amount: <span className="text-prominent">{form.change_amount}</span></div>
            <div>Fee Amount: <span className="text-prominent">{form.fee_amount}</span></div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onConfirm()}>Confirm</AlertDialogAction>
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

          {utxosList()}
          <div>Total amount: {totalAmount()}</div>
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

            if (field.type === "number") {
              return (
                <div key={field.name}>
                  <p>{field.label}</p>
                  <input
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
                </div>
              );
            }
            return (
              <div key={field.name}>
                <p>{field.label}</p>
                <input
                  key={field.name}
                  className="border-1 p-1"
                  placeholder={field.label}
                  name={field.name}
                  type={field.type}
                  value={form[field.name as keyof typeof form] as string}
                  onChange={handleChange}
                />
              </div>
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

