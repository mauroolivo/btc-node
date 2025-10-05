"use client";

import {WalletTx, WalletTxs} from "@/models/wallet";
import WalletTxC from "@/app/wallet/[[...segmentName]]/wallet-tx-c";
import useSWR from "swr";
import {fetcher} from "@/api/api";
import React from "react";
import {ParamsDictionary} from "@/models/api";

export default function WalletTxsList() {

  const {data, error, isLoading} = useSWR<WalletTxs>(
    [
      "listtransactions",
      {"label": "*", "count": 1000, "skip": 0, "include_watchonly": true},
    ],
    ([m, p]: [string, ParamsDictionary]) => fetcher(m, p),
  );

  function txsList(): React.JSX.Element {
    let list_items: unknown[] = [];
    if (error) return <div>Failed to load addresses</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;
    if (data.result === undefined) {
      return <div>No txs in this wallet</div>
    } else {

      if (data.result.length > 0) {
        list_items = data.result.map((tx, idx) =>
          <div
            key={idx}
            className="cursor-pointer transition-opacity duration-200 hover:opacity-80"
            onClick={() => {/* handle click */}}
            role="button"
            tabIndex={0}
          >
            <WalletTxC walletTx={tx}/>
          </div>
        );
      }
    }
    return (<>{list_items}</>)
  }

  return (
    <>
      <div>Transactions {data?.result?.length}</div>

      {txsList()}

    </>
  );
}
