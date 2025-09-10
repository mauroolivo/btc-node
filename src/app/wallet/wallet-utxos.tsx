"use client";

import {UTXO, WalletInfoResponse, WalletTx} from "@/models/wallet";
import WalletUTXOC from "@/app/wallet/wallet-utxo-c";

export default function WalletUTXOs({walletUTXOs}: {
  walletUTXOs: UTXO[]
}) {

  function utxos(): React.JSX.Element {
    const list_items = walletUTXOs.map((utxo, idx) =>
      <div key={idx}>
        <WalletUTXOC walletUTXO={utxo}/>
      </div>
    );
    return (<>{list_items}</>)
  }

  return (
    <>
      <div className="param-title text-center">Unspent Transactions</div>
      {utxos()}
    </>
  );
}
