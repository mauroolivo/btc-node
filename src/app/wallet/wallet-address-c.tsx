"use client";

import {UTXO} from "@/models/wallet";
import {toDateString} from "@/util/util";

export default function WalletAddressC({address}: {
  address: unknown[]
}) {

  return (
    <>
      <div className="w-full justify-center md:flex-none lg:flex lg:gap-20 ">
        <div className="md:w-full lg:w-14 grow">
          <div className="param-box">
            <div className="param-key">
              0
            </div>
            <div className="param-value">
              {address[0] as string}
            </div>
          </div>


        </div>
        <div className="md:w-full lg:w-14 grow">
          <div className="param-box">
            <div className="param-key">
              1
            </div>
            <div className="param-value">
              {address[1] as string}
            </div>
          </div>


        </div>
      </div>
    </>
  );
}
