"use client";

import {ListAddressResponse} from "@/models/wallet";
import {fetcher} from "@/api/api";
import React from "react";
import {Button} from "flowbite-react";;
import useSWR, { mutate } from "swr";
import WalletAddressNew from "@/app/wallet/wallet-address-new";

export default function WalletAddresses() {
  const [show, setShow] = React.useState(false);
  const [shouldFetch, setShouldFetch] = React.useState(false);
  const { data, error, isLoading } = useSWR<ListAddressResponse>(
    shouldFetch
      ? [
        "listaddressgroupings",
        [],
      ]
      : null,
    ([m, p]: [string, (string | boolean | number)[]]) => fetcher(m, p)
  );

  function hadleDismiss() {
    console.log("address created");
    mutate(["listaddressgroupings", []]);
    setShow(false);
  }
  function addresses(): React.JSX.Element {

    if (error) return <div>Failed to load addresses</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;
    if (data.result.length == 0) {
      return <div>No addresses in this wallet</div>
    } else {
      const group = data.result[0]
      if (group.length == 0) {
        return <div>No addresses in this wallet</div>
      } else {
        const address = group[0]
        if (address.length == 0) {
          return <div>No addresses in this wallet</div>
        } else {
          return (<div>
            <div>address: {address[0] as string}</div>
            <div>amount: {address[1] as string}</div>
          </div>)
        }
      }
    }
  }
  return (
    <>
      <Button onClick={() => setShouldFetch(true)}>Fetch</Button>
      <Button onClick={() => mutate(["listaddressgroupings", []])}>Refresh</Button>
      <Button onClick={() => setShow(true)}>New Address</Button>
      <div className="param-title text-center">Addresses</div>
      {addresses()}
      <WalletAddressNew show={show} onDismiss={hadleDismiss} />
    </>
  );
}
