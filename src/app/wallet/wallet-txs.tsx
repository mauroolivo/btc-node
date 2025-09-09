"use client";

import {WalletInfoResponse, WalletTx} from "@/models/wallet";
import {toDateString} from "@/util/util";
import TxDetailUI from "@/app/explorer/txdetailui";
import WalletTxC from "@/app/wallet/wallet-tx-c";



export default function WalletTxs({walletTxs}: {
  walletTxs: WalletTx[]
}) {

  function txs(): React.JSX.Element {
    const list_items = walletTxs.map((tx, idx) =>
      <div key={idx}>
        <WalletTxC walletTx={tx}/>
      </div>
    );
    return (<>{list_items}</>)
  }
  return (
    <>
      <div className="param-title text-center">Transactions</div>

        {txs()}

    </>
  );
}
