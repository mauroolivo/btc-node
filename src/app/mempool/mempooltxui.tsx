'use client'
import {TxResponse} from "@/models/tx";
import {toDateString} from "@/util/util";

import {useState} from "react";
import TxDetailUI from "@/app/explorer/txdetailui";
import {RawmempoolTx} from "@/models/mempool";

export default function Mempooltxui({data /*, onBlockAction, onTxAction*/}: {
  data: RawmempoolTx,
  // onBlockAction: (arg: string) => void,
  // onTxAction: (arg: string) => void
}) {

  // const [more, setMore] = useState<boolean>(false)

  return (
    <>
      <div className="param-title text-center">{data.txid_key}</div>
      <div className="w-full justify-center md:flex-none lg:flex lg:gap-20 ">

        <div className="md:w-full lg:w-14 grow">
          <div className="param-box">
            <div className="param-key">
              Time
            </div>
            <div className="param-value">
              {toDateString(data.time)}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              vsize
            </div>
            <div className="param-value">
              {data.vsize}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Weight
            </div>
            <div className="param-value">
              {data.weight}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Height
            </div>
            <div className="param-value">
              {data.height}
            </div>
          </div>


        </div>
        <div className="md:w-full lg:w-14 grow">

          <div className="param-box">
            <div className="param-key">
              descendant count
            </div>
            <div className="param-value">
              {data.descendantcount}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              descendant size
            </div>
            <div className="param-value">
              {data.descendantsize}
            </div>
          </div>

          <div className="param-box">
            <div className="param-key">
              wtxid
            </div>
            <div className="param-value">
              {data.wtxid}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
