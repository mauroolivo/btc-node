"use client";

import {WalletInfoResponse, WalletTx} from "@/models/wallet";

import {TabItem, Tabs} from "flowbite-react";
import WalletInfo from "@/app/wallet/wallet-info";
import WalletTxs from "@/app/wallet/wallet-txs";
export default function WalletHome({walletInfo, txs}: {
  walletInfo: WalletInfoResponse,
  txs: WalletTx[]
}) {

  console.log(txs)
  return (
    <>
      <Tabs aria-label="Default tabs" variant="default">
        <TabItem active title="Wallet info" >
          <WalletInfo walletInfo={walletInfo}/>
        </TabItem>
        <TabItem title="Transactions" >
          <WalletTxs walletTxs={txs} />
        </TabItem>
      </Tabs>
    </>
  );
}
