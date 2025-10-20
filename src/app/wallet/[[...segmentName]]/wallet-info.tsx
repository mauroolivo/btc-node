"use client";

import {UnconfirmedBalance, WalletInfoResponse} from "@/models/wallet";
import {toDateString} from "@/util/util";
import useSWR from "swr";
import {fetcher} from "@/api/api";
import React from "react";
import {ParamsDictionary} from "@/models/api";

export default function WalletInfo() {

  const [shouldFetch, setShouldFetch] = React.useState(true);
  const r1 = useSWR<WalletInfoResponse>(
    shouldFetch ?
    ["getwalletinfo", [],] : null,
    ([m, p]: [string, ParamsDictionary]) => fetcher(m, p)
  );

  const r2 = useSWR<UnconfirmedBalance>(
    shouldFetch ?
      ["getunconfirmedbalance", [],] : null,
    ([m, p]: [string, ParamsDictionary]) => fetcher(m, p)
  );

  return (
    <>
      {r1.data !== undefined &&
        <div>
          <div><span className={"param-label"}>Balance:</span> <span className={"text-xl"}>{r1.data.result.balance}</span></div>
          {r2.data !== undefined &&
            <div><span className={"param-label"}>Unconfirmed balance:</span> <span>{r1.data.result.unconfirmed_balance}</span></div>
          }
          <div><span className={"param-label"}>Name:</span> <span>{(r1.data.result.walletname === "" ? "`default`" : r1.data.result.walletname)}</span></div>
          <div><span className={"param-label"}>Version:</span> <span>{r1.data.result.walletversion}</span></div>
          <div><span className={"param-label"}>Avoid reuse:</span> <span>{r1.data.result.avoid_reuse ? "true" : "false"}</span></div>
          <div><span className={"param-label"}>Scanning:</span> <span>{r1.data.result.scanning ? "true": "false"}</span></div>
          <div><span className={"param-label"}>Descriptors:</span> <span>{r1.data.result.descriptors ? "true": "false"}</span></div>
          <div><span className={"param-label"}>External signer:</span> <span>{r1.data.result.external_signer ? "true": "false"}</span></div>
          <div><span className={"param-label"}>Birth time:</span> <span>{toDateString(r1.data.result.birthtime)}</span></div>
        </div>
      }
    </>
  );
}
