"use client";

import {UTXO, WalletInfoResponse, WalletTx} from "@/models/wallet";

import {TabItem, Tabs} from "flowbite-react";
import WalletInfo from "@/app/wallet/wallet-info";
import WalletTxs from "@/app/wallet/wallet-txs";
import WalletUTXOs from "@/app/wallet/wallet-utxos";
import WalletAddresses from "@/app/wallet/wallet-addresses";
import WalletDescriptors from "@/app/wallet/wallet-descriptors";
export default function WalletHome({walletInfo, txs, utxos, unconfBal}: {
  walletInfo: WalletInfoResponse,
  txs: WalletTx[],
  utxos: UTXO[],
  unconfBal: number
}) {

  return (
    <>
      <Tabs aria-label="Default tabs" variant="default" className="custom-tabs">
        <TabItem title="Wallet info">
          <WalletInfo walletInfo={walletInfo} unconfBal={unconfBal}/>
        </TabItem>
        <TabItem title="Transactions" >
          <WalletTxs walletTxs={txs} />
        </TabItem>
        <TabItem title="UNSPENT" >
          <WalletUTXOs walletUTXOs={utxos}/>
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
