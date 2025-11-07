"use client";

import {WalletTx, WalletTxs} from "@/models/wallet";
import WalletTxRow from "@/app/wallet/[[...segmentName]]/(tx)/wallet-tx-row";
import useSWR from "swr";
import {fetcher} from "@/api/api";
import React from "react";
import {ParamsDictionary} from "@/models/api";
import {
  AlertDialog, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

export default function WalletTxsList() {

  const [open, setOpen] = React.useState(false);
  const [tx, setTx] = React.useState<WalletTx | null>(null);

  const {data, error, isLoading} = useSWR<WalletTxs>(
    [
      "listtransactions",
      {"label": "*", "count": 1000, "skip": 0, "include_watchonly": true},
    ],
    ([m, p]: [string, ParamsDictionary]) => fetcher(m, p),
  );

  function handleOnTxClick(tx: WalletTx) {
    setTx(tx)
    setOpen(true)
  }
  function txsList(): React.JSX.Element {
    let list_items: unknown[] = [];
    if (error) return <div>Failed to load addresses</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;
    if (data.result === undefined) {
      return <div>No txs in this wallet</div>
    } else {

      if (data.result.length > 0) {
        list_items = data.result.map((tx, idx) =>
          <div
            key={idx}
            className="cursor-pointer transition-opacity duration-200 hover:opacity-80"
            onClick={() => {/* handle click */}}
            role="button"
            tabIndex={0}
          >
            <WalletTxRow walletTx={tx} onTx={handleOnTxClick}/>
          </div>
        );
      }
    }
    return (<>{list_items}</>)
  }

  return (
    <>
      <AlertDialog open={open}>
        {/*<AlertDialogTrigger>show alert</AlertDialogTrigger>*/}

        <AlertDialogContent className={"bg-black min-w-[80%] w-full max-w-4xl mx-auto p-6 rounded-lg"}>
          <AlertDialogHeader>
            <AlertDialogTitle>Detail</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
            {tx &&
              /* Responsive 2-column grid: single column on very small screens, two columns on sm+ */
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Address</span>
                  <span className="text-prominent break-words">{tx.address}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Amount</span>
                  <span className="text-prominent">{tx.amount}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Parent descs</span>
                  <span className="text-prominent">{Array.isArray(tx.parent_descs) ? tx.parent_descs.join(', ') : String(tx.parent_descs ?? '')}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Category</span>
                  <span className="text-prominent">{tx.category}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Label</span>
                  <span className="text-prominent">{tx.label}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Vout</span>
                  <span className="text-prominent">{String(tx.vout ?? '')}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Abandoned</span>
                  <span className="text-prominent">{String(tx.abandoned ?? '')}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Confirmations</span>
                  <span className="text-prominent">{String(tx.confirmations ?? '')}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Blockhash</span>
                  <span className="text-prominent break-words">{tx.blockhash}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Blockheight</span>
                  <span className="text-prominent">{String(tx.blockheight ?? '')}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Blockindex</span>
                  <span className="text-prominent">{String(tx.blockindex ?? '')}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Blocktime</span>
                  <span className="text-prominent">{String(tx.blocktime ?? '')}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Txid</span>
                  <span className="text-prominent break-words">{tx.txid}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Wtxid</span>
                  <span className="text-prominent break-words">{tx.wtxid}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Wallet conflicts</span>
                  <span className="text-prominent">{Array.isArray(tx.walletconflicts) ? tx.walletconflicts.join(', ') : String(tx.walletconflicts ?? '')}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Mempool conflicts</span>
                  <span className="text-prominent">{Array.isArray(tx.mempoolconflicts) ? tx.mempoolconflicts.join(', ') : String(tx.mempoolconflicts ?? '')}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Time</span>
                  <span className="text-prominent">{String(tx.time ?? '')}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">Time received</span>
                  <span className="text-prominent">{String(tx.timereceived ?? '')}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-zinc-400">BIP125 replaceable</span>
                  <span className="text-prominent">{String(tx["bip125-replaceable"])}</span>
                </div>

              </div>
            }
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>Close</AlertDialogCancel>
            {/*<AlertDialogAction onClick={() => onConfirm()}>Confirm</AlertDialogAction>*/}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div>Transactions {data?.result?.length}</div>
      {txsList()}
    </>
  );
}
