"use client";

import {UTXO, WalletInfoResponse, WalletTx} from "@/models/wallet";

import {TabItem, Tabs} from "flowbite-react";
import WalletInfo from "@/app/wallet/wallet-info";
import WalletTxs from "@/app/wallet/wallet-txs";
import WalletUTXOs from "@/app/wallet/wallet-utxos";
import WalletAddresses from "@/app/wallet/wallet-addresses";
export default function WalletHome({walletInfo, txs, utxos}: {
  walletInfo: WalletInfoResponse,
  txs: WalletTx[],
  utxos: UTXO[]
}) {

  // console.log(utxos)
  return (
    <>
      <Tabs aria-label="Default tabs" variant="default" className="custom-tabs">
        <TabItem title="Wallet info">
          <WalletInfo walletInfo={walletInfo}/>
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
      </Tabs>
    </>
  );
}
