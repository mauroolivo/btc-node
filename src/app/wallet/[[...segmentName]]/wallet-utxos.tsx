"use client";

import {UTXO, UTXOResponse} from "@/models/wallet";
import WalletUTXOC from "@/app/wallet/[[...segmentName]]/wallet-utxo-c";
import {fetcher} from "@/api/api";
import useSWR from "swr";
import React from "react";
import {ParamsDictionary} from "@/models/api";
import WalletTxC from "@/app/wallet/[[...segmentName]]/wallet-tx-c";

export default function WalletUTXOs() {

  const {data, error, isLoading} = useSWR<UTXOResponse>(
    [
      "listunspent",
      {},
    ],
    ([m, p]: [string, ParamsDictionary]) => fetcher(m, p)
  );

  function utxosList(): React.JSX.Element {
    let list_items: unknown[] = [];
    if (error) return <div>Failed to load addresses</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;
    if (data.result === undefined) {
      return <div>No txs in this wallet</div>
    } else {
      if (data.result.length > 0) {
        list_items = data.result.map((utxo, idx) =>
        <div
          key={idx}
          className="cursor-pointer transition-opacity duration-200 hover:opacity-80"
          onClick={() => {/* handle click */}}
          role="button"
          tabIndex={0}
        >
          <WalletUTXOC walletUTXO={utxo}/>
        </div>
        );
      }
    }
    return (<>{list_items}</>)
  }

  return (
    <>
      <div className="param-title text-center">Unspent Transactions {data?.result?.length}</div>
      {utxosList()}
    </>
  );
}
