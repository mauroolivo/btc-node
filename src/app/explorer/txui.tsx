'use client'
import {TxResponse} from "@/models/tx";
import {toDateString} from "@/util/util";

import {
  Button,
} from "flowbite-react";
import {useState} from "react";
import TxDetailUI from "@/app/explorer/txdetailui";

export default function TxUI({response, onBlockAction}: {
  response: TxResponse,
  onBlockAction: (arg: string) => void
}) {

  const [more, setMore] = useState<boolean>(false)

  return (
    <>
      {response &&
        <>
          <div>
            <div className="param-box">
              <div className="param-key">
                TxID
              </div>
              <div className="param-value">
                {response.result.txid}
              </div>
            </div>
            <div className="param-box">
              <div className="param-key">
                Confirmations
              </div>
              <div className="param-value">
                {response.result.confirmations}
              </div>
            </div>
            <div className="param-box">
              <div className="param-key">
                Block hash
              </div>
              <div className="param-value">
                <div className="underline hover:no-underline hover:cursor-pointer" onClick={() => onBlockAction(response.result.blockhash)}>{response.result.blockhash}</div>
              </div>
            </div>
            <div className="param-box">
              <div className="param-key">
                Block time
              </div>
              <div className="param-value">
                {toDateString(response.result.time)}
              </div>
            </div>
            <div className="param-box">
              <div className="param-key">
                Size
              </div>
              <div className="param-value">
                {response.result.size} B
              </div>
            </div>
            <div className="param-box">
              <div className="param-key">
                Tx hash (wTxid)
              </div>
              <div className="param-value">
                {response.result.hash}
              </div>
            </div>
            {more &&
              <>
                <div className="param-box">
                  <div className="param-key">
                    version
                  </div>
                  <div className="param-value">
                    {response.result.version}
                  </div>
                </div>
                <div className="param-box">
                  <div className="param-key">
                    vsize
                  </div>
                  <div className="param-value">
                    {response.result.vsize}
                  </div>
                </div>
                <div className="param-box">
                  <div className="param-key">
                    Weight
                  </div>
                  <div className="param-value">
                    {response.result.weight}
                  </div>
                </div>
                <div className="param-box">
                  <div className="param-key">
                    Locktime
                  </div>
                  <div className="param-value">
                    {response.result.locktime}
                  </div>
                </div>
                <div className="param-box">
                  <div className="param-key">
                    Hex
                  </div>
                  <div className="param-value">
                    {response.result.hex}
                  </div>
                </div>
              </>
            }
            <div className="float-right inline-flex gap-2 mt-2 mb-2">
              {!more && <Button onClick={() => {
                setMore(true)
              }}>More</Button>}
              {more && <Button onClick={() => {
                setMore(false)
              }}>Less</Button>}
            </div>
          </div>

          <TxDetailUI response={response} />
        </>
      }
    </>
  )
}
