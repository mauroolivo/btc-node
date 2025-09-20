"use client";

import {UTXO} from "@/models/wallet";
import {toDateString} from "@/util/util";
import React from "react";

export default function WalletAddressC({address, onInfoAddress}: {
  address: unknown[],
  onInfoAddress: (addr: string) => void
}) {

  return (
    <>
      <div className="w-full justify-center md:flex-none lg:flex lg:gap-20 ">
        <div className="md:w-full lg:w-14 grow">
          <div className="param-box">
            <div className="param-key">
              {address[0] as string}
              <button
                onClick={() => navigator.clipboard.writeText(address[0] as string) }>
                Copy
              </button>
              <button
                onClick={() => onInfoAddress(address[0] as string) }>
                Info
              </button>
            </div>
            <div className="param-value">
              {address[1] as string}
            </div>
          </div>
          {/*<div className="param-box">*/}
          {/*  <div className="param-key">*/}
          {/*    amount*/}
          {/*  </div>*/}
          {/*  <div className="param-value">*/}
          {/*    {address[1] as string}*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        {/*<div className="md:w-full lg:w-14 grow">*/}
        {/*  */}


        {/*</div>*/}
      </div>
    </>
  );
}
