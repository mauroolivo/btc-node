'use client'
import {TxResponse} from "@/models/tx";
import {toDateString} from "@/util/util";

import {Button} from "@/components/ui/button"
import {useState} from "react";
import TxDetailUI from "@/app/explorer/txdetailui";

export default function TxUI({response, onBlockAction, onTxAction}: {
  response: TxResponse,
  onBlockAction: (arg: string) => void,
  onTxAction: (arg: string) => void
}) {

  const [more, setMore] = useState<boolean>(false)

  return (
    <>
      {response &&
        <>
          <div>
            <p className={"text-prominent"}>transaction details</p>
            <div><span className={"param-label"}>Tx ID:</span> <span>{response.result.txid}</span></div>
            <div><span className={"param-label"}>Block hash:</span> <span
              className="underline hover:no-underline hover:cursor-pointer"
              onClick={() => onBlockAction(response.result.blockhash)}>{response.result.blockhash}</span></div>
            <div><span className={"param-label"}>Confirmations:</span> <span>{response.result.confirmations}</span>
            </div>
            <div><span className={"param-label"}>Time:</span> <span>{response.result.time > 0 ? toDateString(response.result.time) : ""}</span></div>
            <div><span className={"param-label"}>Size:</span> <span>{response.result.size} B</span></div>
            <div><span className={"param-label"}>Tx hash (wTxid):</span> <span>{response.result.hash}</span></div>
            {more &&
              <>
                <div><span className={"param-label"}>Version:</span> <span>{response.result.version}</span></div>
                <div><span className={"param-label"}>Vsize:</span> <span>{response.result.vsize}</span></div>
                <div><span className={"param-label"}>Locktime:</span> <span>{response.result.locktime}</span></div>
                <div><span className={"param-label"}>Weight:</span> <span>{response.result.weight}</span></div>
                {/*<div><span className={"param-label"}>Hex:</span> <span>{response.result.hex}</span></div>*/}
              </>
            }
          </div>

          <div className={"mb-6"}>
            <div className="inline-flex gap-2 mt-2 mb-2">
              {!more && <Button onClick={() => {
                setMore(true)
              }}>More</Button>}
              {more && <Button onClick={() => {
                setMore(false)
              }}>Less</Button>}
            </div>
          </div>

          <TxDetailUI result={response.result} onTxAction={onTxAction} />
        </>
      }
    </>
  )
}
