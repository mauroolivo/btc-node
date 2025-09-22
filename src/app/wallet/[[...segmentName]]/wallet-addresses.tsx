"use client";

import {ListAddressResponse} from "@/models/wallet";
import {fetcher} from "@/api/api";
import React from "react";
import {Button} from "@/components/ui/button"

;
import useSWR, {mutate} from "swr";
import WalletAddressNew from "@/app/wallet/[[...segmentName]]/wallet-address-new";
import WalletAddressC from "@/app/wallet/[[...segmentName]]/wallet-address-c";
import WalletUTXOC from "@/app/wallet/[[...segmentName]]/wallet-utxo-c";
import WalletAddressInfo from "@/app/wallet/[[...segmentName]]/wallet-address-info";
import {
  AlertDialog, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {ParamsDictionary} from "@/models/api";

export default function WalletAddresses() {
  const [show, setShow] = React.useState(false);
  const [infoAddress, setInfoAddress] = React.useState<string | null>(null);
  // const [shouldFetch, setShouldFetch] = React.useState(false);
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const {data, error, isLoading} = useSWR<ListAddressResponse>(
    shouldFetch
      ? [
        "listaddressgroupings",
        [],
      ]
      : null,
    ([m, p]: [string, ParamsDictionary]) => fetcher(m, p)
  );

  function addresses(): React.JSX.Element {
    const list_items: unknown[] = [];
    if (error) return <div>Failed to load addresses</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;
    if (data.result === undefined) {
      return <div>No addresses in this wallet</div>
    } else {
      if (data.result.length > 0) {
        for (const [idx, groups] of data.result.entries()) {
          if (groups.length > 0) {
            for (const [, address] of groups.entries()) {
              list_items.push(<div key={idx}>
                <WalletAddressC address={address} />
              </div>)
            }
          }
        }
      }
    }
    return <>{list_items}</>;
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>New Address</AlertDialogTrigger>
        <AlertDialogContent className={" bg-black  min-w-[50%] "}>
          <AlertDialogHeader>
            <AlertDialogTitle>Generate new address</AlertDialogTitle>
            <AlertDialogDescription>Select address type</AlertDialogDescription>
            <WalletAddressNew/>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/*<AlertDialogAction>Continue</AlertDialogAction>*/}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="param-title text-center">Addresses</div>
      {addresses()}
    </>
  );
}
