"use client";

import {ListAddressResponse} from "@/models/wallet";
import {fetcher} from "@/api/api";
import React from "react";
import useSWR from "swr";
import WalletAddressDetail from "@/app/wallet/[[...segmentName]]/(address)/wallet-address-detail";
import {
  AlertDialog, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {ParamsDictionary} from "@/models/api";
import WalletAddressRow from "@/app/wallet/[[...segmentName]]/(address)/wallet-address-row";

export default function WalletAddresses() {
  const [cAddress, setCAddress] = React.useState<string | null>(null);
  const [show, setShow] = React.useState(false);
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const {data, error, isLoading} = useSWR<ListAddressResponse>(
    shouldFetch
      ? [
        "listaddressgroupings",
        {},
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
        console.log("PIPPO")
        console.log(data.result)
        let prog_idx = 0
        for (const [idx, groups] of data.result.entries()) {
          if (groups.length > 0) {
            for (const [, address] of groups.entries()) {
              list_items.push(
                <div
                  key={prog_idx}
                  className="cursor-pointer transition-opacity duration-200 hover:opacity-80"
                  onClick={() => {
                    setCAddress(address[0] as string)
                    setShow(true)
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <WalletAddressRow address={address}/>
                </div>
              )
              prog_idx += 1
            }
          }
        }
      }
    }
    return <>{list_items}</>;
  }

  return (
    <>
      <AlertDialog open={cAddress !== null && show}>
        <AlertDialogContent className={" bg-black  min-w-[80%] "}>
          <AlertDialogHeader>
            <AlertDialogTitle>Address info</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
            <WalletAddressDetail address={cAddress as string}/>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShow(false)}>Cancel</AlertDialogCancel>
            {/*<AlertDialogAction>Continue</AlertDialogAction>*/}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="param-title text-center">Addresses</div>
      {addresses()}
    </>
  );
}
