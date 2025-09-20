"use client";

import {UnconfirmedBalance, UTXOResponse, WalletInfoResponse} from "@/models/wallet";
import {toDateString} from "@/util/util";
import useSWR from "swr";
import {fetcher} from "@/api/api";
import React from "react";

export default function WalletInfo() {

  const [shouldFetch, setShouldFetch] = React.useState(true);
  const r1 = useSWR<WalletInfoResponse>(
    shouldFetch ?
    ["getwalletinfo", [],] : null,
    ([m, p]: [string, (string | boolean | number)[]]) => fetcher(m, p)
  );

  const r2 = useSWR<UnconfirmedBalance>(
    shouldFetch ?
      ["getunconfirmedbalance", [],] : null,
    ([m, p]: [string, (string | boolean | number)[]]) => fetcher(m, p)
  );

  return (

    <>
    {r1.data !== undefined &&
      <>
      <div className="param-title text-center">Wallet info</div>
      <div className="w-full justify-center md:flex-none lg:flex lg:gap-20 ">

        <div className="md:w-full lg:w-14 grow">
          <div className="param-box">
            <div className="param-key">
              Name
            </div>
            <div className="param-value">
              {r1.data.result.walletname}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Version
            </div>
            <div className="param-value">
              {r1.data.result.walletversion}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Format
            </div>
            <div className="param-value">
              {r1.data.result.format}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Balance
            </div>
            <div className="param-value">
              {r1.data.result.balance}
            </div>
          </div>
          { r2.data !== undefined &&
          <div className="param-box">
            <div className="param-key">
              Unconfirmed balance
            </div>
            <div className="param-value">
              {r2.data.result}
            </div>
          </div>
          }
        </div>
        <div className="md:w-full lg:w-14 grow">
          <div className="param-box">
            <div className="param-key">
              Avoid reuse
            </div>
            <div className="param-value">
              {r1.data.result.avoid_reuse}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Scanning
            </div>
            <div className="param-value">
              {r1.data.result.scanning}
            </div>
          </div>

          <div className="param-box">
            <div className="param-key">
              Descriptors
            </div>
            <div className="param-value">
              {r1.data.result.descriptors}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              External signer
            </div>
            <div className="param-value">
              {r1.data.result.external_signer}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Birth time
            </div>
            <div className="param-value">
              {toDateString(r1.data.result.birthtime)}
            </div>
          </div>
        </div>
      </div>
    </>
}
    </>
  );
}
