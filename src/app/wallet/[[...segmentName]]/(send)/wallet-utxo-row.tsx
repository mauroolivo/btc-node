"use client";

import {UTXO} from "@/models/wallet";
import {toDateString} from "@/util/util";
import {ChevronRight} from "lucide-react";

export default function WalletUtxoRow({
                                        walletUTXO,
                                        checked,
                                        onChangeAction
                                      }: {
  walletUTXO: UTXO,
  checked: boolean,
  onChangeAction: () => void
}) {

  return (
    <>
      <div className={`m-1 p-2 ${checked ? "bg-blue-900" : ""} rounded-md transition-colors duration-200`}>
        <div className="flex justify-between items-center">
          <div>
            <div className={"text-xl text-white"}>
              {(walletUTXO.amount > 0 ? "+" : "") + walletUTXO.amount}
            </div>
            <div className={"text-zinc-400"}>{walletUTXO.txid}</div>
            <div className={"text-zinc-400"}>{walletUTXO.vout}</div>
            <div className={"text-zinc-400"}>{walletUTXO.address}</div>
          </div>
          <label className="flex items-center cursor-pointer select-none relative ml-4">
            <input
              type="checkbox"
              checked={checked}
              onChange={onChangeAction}
              className="sr-only"
              tabIndex={0}
            />
            <span
              className="w-6 h-6 flex items-center justify-center rounded-md border-2 border-zinc-400 bg-zinc-900 transition-colors duration-200 checked:border-blue-500 checked:bg-blue-500 relative">
        {checked && (
          <svg
            className="w-4 h-4 text-white absolute"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7"/>
          </svg>
        )}
      </span>
          </label>
        </div>
      </div>
    </>
  );
}
