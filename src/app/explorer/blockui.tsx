'use client'

import {toDateString} from "@/util/util";

import {
  Button,
} from "flowbite-react";
import {BlockResponse} from "@/models/block";
import {useState} from "react";
import TxDetailUI from "@/app/explorer/txdetailui";

export default function BlockUI({response, onBlockAction, onTxAction}: {
  response: BlockResponse,
  onBlockAction: (arg: string) => void,
  onTxAction: (arg: string) => void,
}) {

  const [more, setMore] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const offset = 0

  function moreTxs() {
    setPage(page + 1)
  }


  function txs(): React.JSX.Element {
    const txs = response.result.tx.slice(offset, page)
    const list_items = txs.map((tx, idx) =>
      <div key={idx}>
        <TxDetailUI result={tx} onTxAction={onTxAction}/>
      </div>
    );
    return (<>{list_items}</>)
  }

  return (
    <>
      {response &&
        <>
          <div className="param-box">
            <div className="param-key">
              Block hash
            </div>
            <div className="param-value">
              {response.result.hash}
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
              Block height
            </div>
            <div className="param-value">
              {response.result.height}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Block height
            </div>
            <div className="param-value">
              {response.result.height}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Time
            </div>
            <div className="param-value">
              {toDateString(response.result.time)}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Previous block
            </div>
            <div className="param-value">
              <div className="underline hover:no-underline hover:cursor-pointer" onClick={() => onBlockAction(response.result.previousblockhash)}>{response.result.previousblockhash}</div>
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Next block
            </div>
            <div className="param-value">
              <div className="underline hover:no-underline hover:cursor-pointer" onClick={() => onBlockAction(response.result.nextblockhash)}>{response.result.nextblockhash}</div>
            </div>
          </div>
          {more &&
            <>
              <div className="param-box">
                <div className="param-key">
                  Version
                </div>
                <div className="param-value">
                  {response.result.versionHex + " (" + response.result.version + ")"}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  merkleroot
                </div>
                <div className="param-value">
                  {response.result.merkleroot}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  nonce
                </div>
                <div className="param-value">
                  {response.result.nonce}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Bits
                </div>
                <div className="param-value">
                  {response.result.bits}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Difficulty
                </div>
                <div className="param-value">
                  {response.result.difficulty}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Stripped size
                </div>
                <div className="param-value">
                  {response.result.strippedsize}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Size
                </div>
                <div className="param-value">
                  {response.result.size}
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
            </>
          }
          <div className="param-box">
            <div className="param-key">
              Transactions
            </div>
            <div className="param-value">
              {response.result.tx.length}
            </div>
          </div>
          <div className="w-full grid justify-items-end">
            {!more && <Button onClick={() => {
              setMore(true)
            }}>More</Button>}
            {more && <Button onClick={() => {
              setMore(false)
            }}>Less</Button>}
          </div>
          {txs()}
          <div className="w-full grid justify-items-center">
            <Button onClick={() => {
              moreTxs()
            }}>show transactions ({page}/{response.result.tx.length})</Button>
          </div>
        </>

      }
    </>
  )
}
