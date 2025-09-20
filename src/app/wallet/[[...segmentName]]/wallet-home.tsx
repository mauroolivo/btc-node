"use client";

import {Button, TabItem, Tabs} from "flowbite-react";
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

  return (
    <>

      <div className={" flex flex-wrap gap-8 uppercase justify-end"}>
        <div className={""} onClick={() => {setCurrent(Tab.INFO)}}>Wallet info</div>
        <div className={""} onClick={() => {setCurrent(Tab.TRANSACTION)}}>Transactions</div>
        <div className={""} onClick={() => {setCurrent(Tab.UNSPENT)}}>UTXO</div>
        <div className={""} onClick={() => {setCurrent(Tab.ADDRESS)}}>Addresses</div>
        <div className={""} onClick={() => {setCurrent(Tab.DESCRIPTOR)}}>Descriptor</div>
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
