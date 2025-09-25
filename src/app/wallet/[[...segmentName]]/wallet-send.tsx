'use client';
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {ParamsDictionary} from "@/models/api";
import useSWR from "swr";
import {NewAddressResponse, SendResponse} from "@/models/wallet";
import {fetcher} from "@/api/api";

const fields = [
  { name: "address", label: "Address", type: "text" },
  { name: "amount", label: "Amount", type: "number" },
  { name: "fee_rate", label: "Fee Rate (if empty takes default)", type: "number" },
  { name: "subtractfeefromamount", label: "Subtract fee from amount", type: "checkbox" },
  { name: "replaceable", label: "Replaceable", type: "checkbox" },
];

export default function WalletSend() {
  const [form, setForm] = useState({
    address: "",
    amount: "",
    subtractfeefromamount: true,
    replaceable: true,
    fee_rate: "",
  });

  const addressRef = useRef<HTMLTextAreaElement>(null);

  const [shouldFetch, setShouldFetch] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const payload: ParamsDictionary = {
    "address": form.address,
    "amount": parseFloat(form.amount),
    "subtractfeefromamount": form.subtractfeefromamount,
    "replaceable": form.replaceable,
    "fee_rate": parseFloat(form.fee_rate),
  }
  console.log(payload)
  console.log("shouldFetch is " + shouldFetch)
  const {data, error, isLoading} = useSWR<SendResponse>(
    shouldFetch
      ? [
        "sendtoaddress",
        payload
      ]
      : null,
    ([m, p]: [string, ParamsDictionary]) => fetcher(m, p)
  );
  if(data !== undefined) {
    console.log("DATA")
    console.log(data)
    setShouldFetch(false);
    if (data?.result !== undefined) {
      console.log("OK")
      console.log(data?.result);
    }
    else {
      console.log("NO data")
      console.log(data?.error)
      setErrorMsg(data?.error?.message || "Unknown error");
    }
  }

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
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const p: ParamsDictionary = form

    console.log(p);
    setShouldFetch(true);
  }
  console.log("error is " + data?.error)
  return (

    <div className="flex justify-center items-center mt-5">

      <form
        onSubmit={onSubmit}
        className="space-y-4 pt-4 w-full max-w-md p-6 rounded shadow"
      >
        <div className="grid grid-cols-1 gap-4">
          {
            errorMsg &&

            (<p>Error: {errorMsg}</p>)
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
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
}