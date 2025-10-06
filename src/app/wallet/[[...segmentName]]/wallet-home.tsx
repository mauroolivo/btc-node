"use client";

import WalletAddresses from "@/app/wallet/[[...segmentName]]/(address)/wallet-addresses";
import WalletDescriptors from "@/app/wallet/[[...segmentName]]/wallet-descriptors";
import WalletTxsList from "@/app/wallet/[[...segmentName]]/(tx)/wallet-txs";
import WalletUTXOs from "@/app/wallet/[[...segmentName]]/(utxo)/wallet-utxos";
import WalletInfo from "@/app/wallet/[[...segmentName]]/wallet-info";
import React from "react";
import WalletSend from "@/app/wallet/[[...segmentName]]/(send)/wallet-send";
import WalletReceive from "@/app/wallet/[[...segmentName]]/wallet-receive";
import WalletSendUtxo from "@/app/wallet/[[...segmentName]]/(send)/wallet-send-utxo";
export default function WalletHome() {

  enum Tab {
    INFO,
    TRANSACTION,
    ADDRESS,
    DESCRIPTOR,
    RECEIVE,
    SEND,
    SEND_UTXO
  }
  const [current, setCurrent] = React.useState(Tab.INFO);
  const isActive = (tab: Tab) => current === tab;
  return (
    <>
      <div className={" flex flex-wrap gap-8 uppercase justify-end pb-12"}>
        <a className={isActive(Tab.INFO) ? "active" : ""} onClick={() => {setCurrent(Tab.INFO)}}>Wallet info</a>
        <a className={isActive(Tab.TRANSACTION) ? "active" : ""} onClick={() => {setCurrent(Tab.TRANSACTION)}}>Transactions</a>
        <a className={isActive(Tab.ADDRESS) ? "active" : ""} onClick={() => {setCurrent(Tab.ADDRESS)}}>Addresses</a>
        <a className={isActive(Tab.DESCRIPTOR) ? "active" : ""} onClick={() => {setCurrent(Tab.DESCRIPTOR)}}>Descriptor</a>
        <a className={isActive(Tab.RECEIVE) ? "active" : ""} onClick={() => setCurrent(Tab.RECEIVE)}>Receive</a>
        <a className={isActive(Tab.SEND) ? "active" : ""} onClick={() => setCurrent(Tab.SEND)}>Send</a>
        <a className={isActive(Tab.SEND_UTXO) ? "active" : ""} onClick={() => setCurrent(Tab.SEND_UTXO)}>Spend UTXO</a>
      </div>
      { current === Tab.INFO && <WalletInfo /> }
      { current === Tab.TRANSACTION && <WalletTxsList /> }
      { current === Tab.ADDRESS && <WalletAddresses /> }
      { current === Tab.DESCRIPTOR && <WalletDescriptors /> }
      { current === Tab.RECEIVE && <WalletReceive /> }
      { current === Tab.SEND && <WalletSend /> }
      { current === Tab.SEND_UTXO && <WalletSendUtxo /> }
    </>
  );
}
