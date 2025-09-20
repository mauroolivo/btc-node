"use client";

import {TabItem, Tabs} from "flowbite-react";
import WalletAddresses from "@/app/wallet/[[...segmentName]]/wallet-addresses";
import WalletDescriptors from "@/app/wallet/[[...segmentName]]/wallet-descriptors";
import WalletTxsList from "@/app/wallet/[[...segmentName]]/wallet-txs";
import WalletUTXOs from "@/app/wallet/[[...segmentName]]/wallet-utxos";
import WalletInfo from "@/app/wallet/[[...segmentName]]/wallet-info";
export default function WalletHome() {

  return (
    <>
      <Tabs aria-label="Default tabs" variant="default" className="custom-tabs">
        <TabItem title="Wallet info">
          <WalletInfo />
        </TabItem>
        <TabItem title="Transactions" >
          <WalletTxsList />
        </TabItem>
        <TabItem title="UNSPENT" >
          <WalletUTXOs />
        </TabItem>
        <TabItem title="Addresses">
          <WalletAddresses />
        </TabItem>
        <TabItem title="Descriptors">
          <WalletDescriptors />
        </TabItem>
      </Tabs>
    </>
  );
}
