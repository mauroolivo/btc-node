"use client";

import React from "react";
import useSWR from "swr";
import {ChangeAddressResponse, CreateRawTransactionResponse} from "@/models/wallet";
import {ParamsDictionary} from "@/models/api";
import {fetcher} from "@/api/api";


export default function WalletUtxoSummary({
                                            recipient_address,
                                            change_address,
                                            recipient_amount,
                                            change_amount,
                                            fee_amount,
                                            total_amount,
                                            utxo_list
}:
                                          {recipient_address: string,
                                            change_address: string,
                                            recipient_amount: number,
                                            change_amount: number,
                                            fee_amount: number,
                                            total_amount: number,
                                            utxo_list: { txid: string; vout: number; amount: number }[]
                                          }) {

  const [shouldFetch, setShouldFetch] = React.useState(true);

  // ensure inputs is created before usage and stable across renders
  const inputs: ParamsDictionary[] = React.useMemo(() => {
    return utxo_list.map((utxo) => {
      const input: ParamsDictionary = {};
      input["txid"] = utxo.txid;
      input["vout"] = utxo.vout;
      return input;
    });
  }, [utxo_list]);

  // outputs as an array (match expected shape)
  // I originally userd ParamsDictionary[] but found this example using an object and works
  // https://bitcoin.stackexchange.com/questions/80905/bitcoin-cli-createrawtransaction-with-3-outputs-example
  const outputs: ParamsDictionary = React.useMemo(() => {
    return { [recipient_address]: recipient_amount, [change_address]: change_amount } as ParamsDictionary;
  }, [recipient_address, recipient_amount, change_address, change_amount]);
  // memoize payload so it's not recreated every render
  const payload: ParamsDictionary = React.useMemo(() => {
    return {
      inputs,
      outputs,
    };
  }, [inputs, outputs]);
  const res = useSWR<CreateRawTransactionResponse>(
    shouldFetch
      ? [
        "createrawtransaction",
        payload,
      ]
      : null,
    ([m, p]: [string, ParamsDictionary]) => fetcher(m, p)
  );

  console.log(payload)

  console.log(res.data);

  const hex = res.data?.result
  if (hex !== undefined && hex !== null) {
    // setChangeaddress(add)
    console.log(hex);
    setShouldFetch(false);
  }

  return (
    <>
      <div>Recipient Address: <span className="text-prominent">{recipient_address}</span></div>
      <div>Change Address: <span className="text-prominent">{change_address}</span></div>

      <div>Recipient Amount: <span className="text-prominent">{recipient_amount}</span></div>
      <div>Change Amount: <span className="text-prominent">{change_amount}</span></div>
      <div>Fee Amount: <span className="text-prominent">{fee_amount}</span></div>
      <div>Inputs amount: {total_amount}</div>
    </>
  );
}
