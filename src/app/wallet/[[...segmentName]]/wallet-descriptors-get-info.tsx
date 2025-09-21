"use client";

import {DeriveAddressesResponse, DescriptorInfoResponse, DescriptorInfoResult} from "@/models/wallet";
import {fetcher} from "@/api/api";
import React from "react";
import {Button} from "@/components/ui/button"

;
import useSWR, {mutate} from "swr";
import {Input} from "postcss";


export default function WalletDescriptorsGetInfo() {

  const [shouldFetch, setShouldFetch] = React.useState(false);
  const [dField, setDField] = React.useState<string>("");
  const [descriptor, setDescriptor] = React.useState<DescriptorInfoResult | null>(null);

  const {data, error, isLoading} = useSWR<DescriptorInfoResponse>(
    shouldFetch
      ? [
        "getdescriptorinfo",
        [dField],
      ]
      : null,
    ([m, p]: [string, (string | boolean | number)[]]) => fetcher(m, p)
  );

  if(data?.result !== undefined) {
    setDescriptor(data.result)
    console.log(data.result)
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
          Get descriptor info
        </div>
        <input className="border-1 p-1 min-w-96 mt-2 mb-2" placeholder="Desciptor" name="descriptor" />
        <Button type="submit" >Get</Button>
      </form>
      {
        descriptor &&
        <p>{descriptor.descriptor}</p>
      }
    </>
  );
}
