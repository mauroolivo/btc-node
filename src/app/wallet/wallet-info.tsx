"use client";

import {UnconfirmedBalance, UTXOResponse, WalletInfoResponse} from "@/models/wallet";
import {toDateString} from "@/util/util";
import useSWR from "swr";
import {fetcher} from "@/api/api";
import React from "react";

export default function WalletInfo() {
  const [wInfo, setWInfo] = React.useState<WalletInfoResponse | null>(null);
  const [unconfBal, setUnconfBal] = React.useState<UnconfirmedBalance | null>(null);
  const r1 = useSWR<WalletInfoResponse>(
    wInfo === null ?
    ["getwalletinfo", [],] : null,
    ([m, p]: [string, (string | boolean | number)[]]) => fetcher(m, p)
  );
  if(r1.data !== undefined) {
    setWInfo(r1.data);
  }
  const r2 = useSWR<UnconfirmedBalance>(
    unconfBal === null ?
      ["getunconfirmedbalance", [],] : null,
    ([m, p]: [string, (string | boolean | number)[]]) => fetcher(m, p)
  );
  if(r2.data !== undefined) {
    setUnconfBal(r2.data)
  }
  // walletInfo={walletInfo} unconfBal={unconfBal}
  return (

    <>
    {wInfo !== null &&
      <>
      <div className="param-title text-center">Wallet info</div>
      <div className="w-full justify-center md:flex-none lg:flex lg:gap-20 ">

        <div className="md:w-full lg:w-14 grow">
          <div className="param-box">
            <div className="param-key">
              Name
            </div>
            <div className="param-value">
              {wInfo.result.walletname}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Version
            </div>
            <div className="param-value">
              {wInfo.result.walletversion}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Format
            </div>
            <div className="param-value">
              {wInfo.result.format}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Balance
            </div>
            <div className="param-value">
              {wInfo.result.balance}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Unconfirmed balance
            </div>
            <div className="param-value">
              {unconfBal?.result}
            </div>
          </div>
        </div>
        <div className="md:w-full lg:w-14 grow">
          <div className="param-box">
            <div className="param-key">
              Avoid reuse
            </div>
            <div className="param-value">
              {wInfo.result.avoid_reuse}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Scanning
            </div>
            <div className="param-value">
              {wInfo.result.scanning}
            </div>
          </div>

          <div className="param-box">
            <div className="param-key">
              Descriptors
            </div>
            <div className="param-value">
              {wInfo.result.descriptors}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              External signer
            </div>
            <div className="param-value">
              {wInfo.result.external_signer}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Birth time
            </div>
            <div className="param-value">
              {toDateString(wInfo.result.birthtime)}
            </div>
          </div>
        </div>
      </div>
    </>
}
    </>
  );
}
