"use client";

import {Button} from "@/components/ui/button"
import React from "react";
import useSWR, {mutate} from "swr";
import {AddressInfoResponse, AddressInfoResult, ListAddressResponse, NewAddressResponse} from "@/models/wallet";
import {fetcher} from "@/api/api";
import {
  AlertDialog, AlertDialogCancel,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

export default function WalletAddressInfo({address}: {
  address: string
}) {

  const {data, error, isLoading} = useSWR<AddressInfoResponse>(
    [
      "getaddressinfo",
      [address],
    ]
    ,
    ([m, p]: [string, (string | boolean | number)[]]) => fetcher(m, p)
  );

  if (error) return <div>Failed to load address info</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;
  if (address === null) return <div>No address selected</div>;

  function content(): React.JSX.Element {
    if (data !== undefined) {

      return (
        <>
          <div className="w-full justify-center md:flex-none lg:flex lg:gap-20 ">
            <div className="md:w-full lg:w-14 grow">
              <div className="param-box">
                <div className="param-key">
                  Address
                </div>
                <div className="param-value">
                  {data.result.address}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Is witness
                </div>
                <div className="param-value">
                  {data.result.iswitness ? "true" : "false"}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Is script
                </div>
                <div className="param-value">
                  {data.result.isscript ? "true" : "false"}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Is watchonly
                </div>
                <div className="param-value">
                  {data.result.iswatchonly ? "true" : "false"}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Is compressed
                </div>
                <div className="param-value">
                  {data.result.iscompressed ? "true" : "false"}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Pub Key
                </div>
                <div className="param-value">
                  {data.result.pubkey}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Script Pub Key
                </div>
                <div className="param-value">
                  {data.result.scriptPubKey}
                </div>
              </div>
            </div>
            <div className="md:w-full lg:w-14 grow">
              <div className="param-box">
                <div className="param-key">
                  hd key path
                </div>
                <div className="param-value">
                  {data.result.hdkeypath}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Desc
                </div>
                <div className="param-value">
                  {data.result.desc}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Parent Desc
                </div>
                <div className="param-value">
                  {data.result.parent_desc}
                </div>
              </div>
            </div>
          </div>
        </>
      )
    } else {
      return <p>Invalid data</p>
    }


  }

  return (
    <>
      {content()}
    </>
  );
}
