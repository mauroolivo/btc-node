"use client";

import {UTXO, UTXOResponse} from "@/models/wallet";
import WalletUTXOC from "@/app/wallet/[[...segmentName]]/wallet-utxo-c";
import {fetcher} from "@/api/api";
import useSWR from "swr";
import React from "react";
import {ParamsDictionary} from "@/models/api";

export default function WalletUTXOs() {

  const [shouldFetch, setShouldFetch] = React.useState(true);
  const [utxos, setUtxos] = React.useState<UTXO[]>([]);
  const { data, error, isLoading } = useSWR<UTXOResponse>(
    shouldFetch
      ? [
        "listunspent",
        {},
      ]
      : null,
    ([m, p]: [string, ParamsDictionary]) => fetcher(m, p)
  );
  if(data?.result !== undefined) {
    console.log("data", data.result);
    setUtxos(data.result);
    setShouldFetch(false);
  }

  function utxosList(): React.JSX.Element {
    const list_items = utxos.map((utxo, idx) =>
      <div key={idx}>
        <WalletUTXOC walletUTXO={utxo}/>
      </div>
    );
    return (<>{list_items}</>)
  }

  return (
    <>
      <div className="param-title text-center">Unspent Transactions</div>
      {utxosList()}
    </>
  );
}
