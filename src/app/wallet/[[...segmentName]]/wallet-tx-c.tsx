"use client";

import {WalletTx} from "@/models/wallet";
import {toDateString} from "@/util/util";
import {ArrowBigDownDash, ArrowBigUpDash} from "lucide-react";

function getIcon(tx: WalletTx): React.JSX.Element {
  if (tx.category === "receive") {
  return <ArrowBigDownDash className="" size={32} strokeWidth={1}/>;
  } else {
    return <ArrowBigUpDash className="" size={32} strokeWidth={1}/>;
  }
}
export default function WalletTxC({walletTx}: {
  walletTx: WalletTx
}) {

  return (
    <>

      <div className="border-1 border-white m-1 p-2">
        {getIcon(walletTx)}  {walletTx.amount} {toDateString(walletTx.blocktime)} {walletTx.category.toUpperCase()}
      </div>

      {/*<div className="w-full justify-center md:flex-none lg:flex lg:gap-20 ">*/}
      {/*<div className="md:w-full lg:w-14 grow">*/}
      {/*  <div className="param-box">*/}
      {/*    <div className="param-key">*/}
      {/*      TxId*/}
      {/*    </div>*/}
      {/*    <div className="param-value">*/}
      {/*      {walletTx.txid}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="param-box">*/}
      {/*    <div className="param-key">*/}
      {/*      Amount*/}
      {/*    </div>*/}
      {/*    <div className="param-value">*/}
      {/*      {walletTx.amount}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="param-box">*/}
      {/*    <div className="param-key">*/}
      {/*      Confirmations*/}
      {/*    </div>*/}
      {/*    <div className="param-value">*/}
      {/*      {walletTx.confirmations}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="param-box">*/}
      {/*    <div className="param-key">*/}
      {/*      Parent descs*/}
      {/*    </div>*/}
      {/*    <div className="param-value">*/}
      {/*      {walletTx.parent_descs === undefined ? "" : walletTx.parent_descs.join(", ")}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="md:w-full lg:w-14 grow">*/}
      {/*  <div className="param-box">*/}
      {/*    <div className="param-key">*/}
      {/*      Address*/}
      {/*    </div>*/}
      {/*    <div className="param-value">*/}
      {/*      {walletTx.address}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="param-box">*/}
      {/*    <div className="param-key">*/}
      {/*      Block hash*/}
      {/*    </div>*/}
      {/*    <div className="param-value">*/}
      {/*      {walletTx.blockhash}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="param-box">*/}
      {/*    <div className="param-key">*/}
      {/*      Block time*/}
      {/*    </div>*/}
      {/*    <div className="param-value">*/}
      {/*      {toDateString(walletTx.blocktime)}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="param-box">*/}
      {/*    <div className="param-key">*/}
      {/*      bip125-replaceable*/}
      {/*    </div>*/}
      {/*    <div className="param-value">*/}
      {/*      {walletTx["bip125-replaceable"]}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*</div>*/}
    </>
  );
}
