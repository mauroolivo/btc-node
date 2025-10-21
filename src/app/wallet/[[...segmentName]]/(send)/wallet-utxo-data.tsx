"use client";

import {ChangeAddressResponse, DeriveAddressesResponse, UTXO, UTXOResponse} from "@/models/wallet";
import WalletUtxoRow from "@/app/wallet/[[...segmentName]]/(send)/wallet-utxo-row";
import {fetcher} from "@/api/api";
import useSWR from "swr";
import React, {useRef} from "react";
import {ParamsDictionary} from "@/models/api";
import {useState} from "react";
import {Button} from "@/components/ui/button";


export default function WalletUtxoData(
  {
                                           selected,
//                                            handleSelect,
//                                            isSelected,
                                         }: {
  selected: { txid: string; vout: number }[];
//   handleSelect: (txid: string, vout: number) => void;
//   isSelected: (txid: string, vout: number) => boolean;
}
) {
  const [form, setForm] = useState({
    address: "",
    amount: "",
    fee_rate: "",
    subtractfeefromamount: true,
    replaceable: true,
  });
  const fields = [
    { name: "address", label: "Address", type: "text" },
    { name: "amount", label: "Amount", type: "number" },
    { name: "fee_rate", label: "Fee Rate (sats/vbyte)", type: "number" },
    { name: "subtractfeefromamount", label: "Subtract fee from amount", type: "checkbox" },
    { name: "replaceable", label: "Replaceable", type: "checkbox" },
  ];
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
  if( add !== undefined && add !== null) {
    setChangeaddress(add)
    setShouldFetch(false);
  }

  console.log("changeAddress: " + changeAddress)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // setOpen(true)
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

    // light validation
    setIsReady(false);
    if ( parseFloat(e.target.form?.amount.value) > 0 && (e.target.form?.address.value.trim()).length > 0 &&
      parseFloat(e.target.form?.fee_rate.value) >= 1 ) {
      setIsReady(true);
    }
    setErrorMsg(null);
  }

  function utxosList(): React.JSX.Element {
    let list_items: unknown[] = [];

        list_items = selected.map((utxo, idx) => (
          <div
            key={idx}
            className="cursor-pointer transition-opacity duration-200 hover:opacity-80"
            role="button"
            tabIndex={0}
          >
            <div>
              <div className={"text-xl text-white"}>
                {/*{(utxo.amount > 0 ? "+" : "") + utxo.amount}*/}
              </div>
              <div className={"text-zinc-400"}>{utxo.txid}</div>
              <div className={"text-zinc-400"}>{utxo.vout}</div>
              {/*<div className={"text-zinc-400"}>{utxo.address}</div>*/}
            </div>
          </div>
        ));

    return (<>{list_items}</>)
  }
  return (

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
        <p>Change Address:</p>
        <p>{changeAddress}</p>

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
  );
}

