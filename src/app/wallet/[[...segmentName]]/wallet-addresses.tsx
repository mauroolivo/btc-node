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
import {ChevronRight} from "lucide-react";

export default function WalletAddresses() {
  const [cAddress, setCAddress] = React.useState<string | null>(null);

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
                  onClick={() => {setCAddress(address[0] as string)}}
                  role="button"
                  tabIndex={0}
                >
                  <div className="m-1 p-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <div>{address[1] as string}</div>
                        <div>{address[0] as string}</div>
                      </div>
                      <ChevronRight />
                    </div>
                  </div>
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
      {/*<AlertDialog>*/}
      {/*  <AlertDialogTrigger>New Address</AlertDialogTrigger>*/}
      {/*  <AlertDialogContent className={" bg-black  min-w-[50%] "}>*/}
      {/*    <AlertDialogHeader>*/}
      {/*      <AlertDialogTitle>Generate new address</AlertDialogTitle>*/}
      {/*      <AlertDialogDescription>Select address type</AlertDialogDescription>*/}
      {/*      <WalletAddressNew/>*/}
      {/*    </AlertDialogHeader>*/}
      {/*    <AlertDialogFooter>*/}
      {/*      <AlertDialogCancel>Cancel</AlertDialogCancel>*/}
      {/*      /!*<AlertDialogAction>Continue</AlertDialogAction>*!/*/}
      {/*    </AlertDialogFooter>*/}
      {/*  </AlertDialogContent>*/}
      {/*</AlertDialog>*/}

      <AlertDialog open={cAddress !== null}>
        <AlertDialogContent className={" bg-black  min-w-[80%] "}>
          <AlertDialogHeader>
            <AlertDialogTitle>Address info</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
            <WalletAddressInfo address={cAddress as string}/>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=> setCAddress(null)}>Cancel</AlertDialogCancel>
            {/*<AlertDialogAction>Continue</AlertDialogAction>*/}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="param-title text-center">Addresses</div>
      {addresses()}
    </>
  );
}
