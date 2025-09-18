"use client";

import {TabItem, Tabs} from "flowbite-react";
import WalletAddresses from "@/app/wallet/wallet-addresses";
import WalletDescriptors from "@/app/wallet/wallet-descriptors";
import WalletTxsList from "@/app/wallet/wallet-txs";
import WalletUTXOs from "@/app/wallet/wallet-utxos";
export default function WalletHome() {

  return (
    <>
      <Tabs aria-label="Default tabs" variant="default" className="custom-tabs">
        {/*<TabItem title="Wallet info">*/}
        {/*  <WalletInfo walletInfo={walletInfo} unconfBal={unconfBal}/>*/}
        {/*</TabItem>*/}
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
