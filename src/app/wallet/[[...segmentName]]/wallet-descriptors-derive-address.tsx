"use client";

import {DeriveAddressesResponse, DescriptorInfoResponse, DescriptorInfoResult} from "@/models/wallet";
import {fetcher} from "@/api/api";
import React from "react";
import {Button} from "@/components/ui/button"

;
import useSWR, {mutate} from "swr";
import {Input} from "postcss";


export default function WalletDescriptorsDeriveAddress() {

  const [shouldFetch, setShouldFetch] = React.useState(false);
  const [dField, setDField] = React.useState<string>("");
  const [addresses, setAddresses] = React.useState<string[]>([]);

  const res = useSWR<DeriveAddressesResponse>(
    shouldFetch
      ? [
        "deriveaddresses",
        [dField],
      ]
      : null,
    ([m, p]: [string, (string | boolean | number)[]]) => fetcher(m, p)
  );

  if(res.data?.result !== undefined) {
    setAddresses(res.data.result)
    setShouldFetch(false);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const d = formData.get('descriptor')?.toString()
    if (d !== undefined) {
      setDField(d)
      setShouldFetch(true);
    }
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="space-y-6">
          Derive addresses
        </div>
        <input className="border-1 p-1 min-w-96 mt-2 mb-2" placeholder="Desciptor" name="descriptor" />
        <Button type="submit" >Derive</Button>
      </form>
      {
        addresses.length > 0 &&
        <p>{addresses.toString()}</p>
      }
    </>
  );
}
