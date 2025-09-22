"use client";

import {WalletTx, WalletTxs} from "@/models/wallet";
import WalletTxC from "@/app/wallet/[[...segmentName]]/wallet-tx-c";
import useSWR from "swr";
import {fetcher} from "@/api/api";
import React from "react";
import {ParamsDictionary} from "@/models/api";


export default function WalletTxsList() {
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const [txs, setTxs] = React.useState<WalletTx[]>([]);
  const { data, error, isLoading } = useSWR<WalletTxs>(
    shouldFetch
      ? [
        "listtransactions",
        [],
      ]
      : null,
    ([m, p]: [string, ParamsDictionary]) => fetcher(m, p)
  );
  if(data?.result !== undefined) {
    console.log("data", data.result);
    setTxs(data.result);
    setShouldFetch(false);
  }

  function txsList(): React.JSX.Element {
    const list_items = txs.map((tx, idx) =>
      <div key={idx}>
        <WalletTxC walletTx={tx}/>
      </div>
    );
    return (<>{list_items}</>)
  }
  return (
    <>
      <div className="param-title text-center">Transactions</div>

        {txsList()}

    </>
  );
}
