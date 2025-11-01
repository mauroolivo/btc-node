"use client";

import React from "react";
import useSWR from "swr";
import {ChangeAddressResponse, CreateRawTransactionResponse} from "@/models/wallet";
import {ParamsDictionary} from "@/models/api";
import {
  createRawTransaction,
  fetcher,
  getblockchaininfo,
  sendRawTransaction,
  signRawTransactionWithWallet
} from "@/api/api";
import {Button} from "@/components/ui/button";


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


  function payload() {
    const inputs = utxo_list.map((utxo) => {
      const input: ParamsDictionary = {};
      input["txid"] = utxo.txid;
      input["vout"] = utxo.vout;
      return input;
    });
    // I originally userd ParamsDictionary[] but found this example using an object and works
    // https://bitcoin.stackexchange.com/questions/80905/bitcoin-cli-createrawtransaction-with-3-outputs-example
    const outputs = { [recipient_address]: recipient_amount, [change_address]: change_amount } as ParamsDictionary;
    const payload: ParamsDictionary = {
        inputs,
        outputs,
      };
    return payload;
  }
  async function createTx() {
    console.log("creating tx");
    try {
      const createRawTransactionResponse = await createRawTransaction(payload());
      const hex = createRawTransactionResponse.result;

      if(hex !== null) {
        console.log("tx", hex);
        const sign_payload: ParamsDictionary = {
          "hexstring": hex,
        }
        const signRawTransactionResult = await sign(sign_payload);
        const sign_hex = signRawTransactionResult?.result?.hex
        if (sign_hex !== undefined) {
          console.log("sign_hex", sign_hex);
          const broad_payload: ParamsDictionary = {
            "hexstring": sign_hex,
          }
          const broadcastResult = await broadcast(broad_payload);
          console.log("broadcastResult", broadcastResult);
          const tx_id = broadcastResult?.result;
          if(tx_id !== null) {
            console.log("SUCCESSFULLY SENT tx_id", tx_id);
          } else {
            console.log("broadcast tx error");
          }
        } else {
          console.log("signed tx error");
        }
      } else {
        // show sign error
        console.error("createRawTransaction returned null hex");
      }
    } catch (err) {
      console.error("create failed:", err);
      // setErrorMsg(r?.error?.message || "Unknown error");
    }
  }
  async function sign(payload: ParamsDictionary) {
    try {
      return await signRawTransactionWithWallet(payload)

    } catch (err) {
      console.error("sign failed:", err);
      return
    }
  }

  async function broadcast(payload: ParamsDictionary) {
    try {
      return await sendRawTransaction(payload)

    } catch (err) {
      console.error("broadcast failed:", err);
      return
    }
  }

  return (
    <>
      <div>Recipient Address: <span className="text-prominent">{recipient_address}</span></div>
      <div>Change Address: <span className="text-prominent">{change_address}</span></div>

      <div>Recipient Amount: <span className="text-prominent">{recipient_amount}</span></div>
      <div>Change Amount: <span className="text-prominent">{change_amount}</span></div>
      <div>Fee Amount: <span className="text-prominent">{fee_amount}</span></div>
      <div>Inputs amount: {total_amount}</div>

      <Button onClick={() => createTx()}>Create tx</Button>
    </>
  );
}
