"use client";

import WalletAddresses from "@/app/wallet/[[...segmentName]]/wallet-addresses";
import WalletDescriptors from "@/app/wallet/[[...segmentName]]/wallet-descriptors";
import WalletTxsList from "@/app/wallet/[[...segmentName]]/wallet-txs";
import WalletUTXOs from "@/app/wallet/[[...segmentName]]/wallet-utxos";
import WalletInfo from "@/app/wallet/[[...segmentName]]/wallet-info";
import React from "react";
export default function WalletHome() {

  enum Tab {
    INFO,
    TRANSACTION,
    UNSPENT,
    ADDRESS,
    DESCRIPTOR
  }
  const [current, setCurrent] = React.useState(Tab.INFO);
  const isActive = (tab: Tab) => current === tab;
  return (
    <>

      <div className={" flex flex-wrap gap-8 uppercase justify-end"}>
        <a className={isActive(Tab.INFO) ? "active" : ""} onClick={() => {setCurrent(Tab.INFO)}}>Wallet info</a>
        <a className={isActive(Tab.TRANSACTION) ? "active" : ""} onClick={() => {setCurrent(Tab.TRANSACTION)}}>Transactions</a>
        <a className={isActive(Tab.UNSPENT) ? "active" : ""} onClick={() => {setCurrent(Tab.UNSPENT)}}>UTXO</a>
        <a className={isActive(Tab.ADDRESS) ? "active" : ""} onClick={() => {setCurrent(Tab.ADDRESS)}}>Addresses</a>
        <a className={isActive(Tab.DESCRIPTOR) ? "active" : ""} onClick={() => {setCurrent(Tab.DESCRIPTOR)}}>Descriptor</a>
      </div>
      {
        current == Tab.INFO && <WalletInfo />
      }
      {
        current == Tab.TRANSACTION && <WalletTxsList />
      }
      {
        current == Tab.UNSPENT && <WalletUTXOs />
      }
      {
        current == Tab.ADDRESS && <WalletAddresses />
      }
      {
        current == Tab.DESCRIPTOR && <WalletDescriptors />
      }

    </>
  );
}
