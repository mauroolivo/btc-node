"use client";

import {UTXO} from "@/models/wallet";
import {toDateString} from "@/util/util";

export default function WalletUTXOC({walletUTXO}: {
  walletUTXO: UTXO
}) {

  return (
    <>
      <div className="w-full justify-center md:flex-none lg:flex lg:gap-20 ">
        <div className="md:w-full lg:w-14 grow">
          <div className="param-box">
            <div className="param-key">
              TxId
            </div>
            <div className="param-value">
              {walletUTXO.txid}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Amount
            </div>
            <div className="param-value">
              {walletUTXO.amount}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Confirmations
            </div>
            <div className="param-value">
              {walletUTXO.confirmations}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Parent descs
            </div>
            <div className="param-value">
              {walletUTXO.parent_descs.toString()}
            </div>
          </div>
        </div>
        <div className="md:w-full lg:w-14 grow">
          <div className="param-box">
            <div className="param-key">
              Address
            </div>
            <div className="param-value">
              {walletUTXO.address}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              ScriptPubKey
            </div>
            <div className="param-value">
              {walletUTXO.scriptPubKey}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Desc
            </div>
            <div className="param-value">
              {walletUTXO.desc}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
