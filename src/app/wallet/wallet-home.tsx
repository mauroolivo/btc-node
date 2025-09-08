"use client";

import {WalletInfo} from "@/models/wallet";
import {toDateString} from "@/util/util";

export default function WalletHome({walletInfo}: {
  walletInfo: WalletInfo
}) {

  return (
    <>
      <div className="space-y-6"></div>
      <>
        <div className="param-title text-center">Wallet info</div>
        <div className="w-full justify-center md:flex-none lg:flex lg:gap-20 ">

          <div className="md:w-full lg:w-14 grow">
            <div className="param-box">
              <div className="param-key">
                Name
              </div>
              <div className="param-value">
                {walletInfo.result.walletname}
              </div>
            </div>
            <div className="param-box">
              <div className="param-key">
                Version
              </div>
              <div className="param-value">
                {walletInfo.result.walletversion}
              </div>
            </div>
            <div className="param-box">
              <div className="param-key">
                Format
              </div>
              <div className="param-value">
                {walletInfo.result.format}
              </div>
            </div>
            <div className="param-box">
              <div className="param-key">
                Balance
              </div>
              <div className="param-value">
                {walletInfo.result.balance} tBTC
              </div>
            </div>
            <div className="param-box">
              <div className="param-key">
                Birth time
              </div>
              <div className="param-value">
                {toDateString(walletInfo.result.birthtime)}
              </div>
            </div>
          </div>
          <div className="md:w-full lg:w-14 grow">
            <div className="param-box">
              <div className="param-key">
                Avoid reuse
              </div>
              <div className="param-value">
                {walletInfo.result.avoid_reuse}
              </div>
            </div>
            <div className="param-box">
              <div className="param-key">
                Scanning
              </div>
              <div className="param-value">
                {walletInfo.result.scanning}
              </div>
            </div>

            <div className="param-box">
              <div className="param-key">
                Descriptors
              </div>
              <div className="param-value">
                {walletInfo.result.descriptors}
              </div>
            </div>
            <div className="param-box">
              <div className="param-key">
                External signer
              </div>
              <div className="param-value">
                {walletInfo.result.external_signer}
              </div>
            </div>

          </div>
        </div>
      </>
    </>
  );
}
