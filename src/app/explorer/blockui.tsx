'use client'

import {toDateString} from "@/util/util";

import {Button} from "@/components/ui/button"
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
          <div>
            <div><span className={"param-label"}>Block hash:</span> <span>{response.result.hash}</span></div>
            <div><span className={"param-label"}>Height:</span> <span>{response.result.height}</span></div>
            <div><span className={"param-label"}>Confirmations:</span> <span>{response.result.confirmations}</span></div>
            <div><span className={"param-label"}>Time:</span> <span>{toDateString(response.result.time)}</span></div>

            <div><span className={"param-label"} >Prev block:</span> <span
              className="underline hover:no-underline hover:cursor-pointer" onClick={() => onBlockAction(response.result.previousblockhash)}>{response.result.previousblockhash}</span></div>
            <div><span className={"param-label"} >Next block:</span> <span
              className="underline hover:no-underline hover:cursor-pointer" onClick={() => onBlockAction(response.result.nextblockhash)}>{response.result.nextblockhash}</span></div>
            {more &&
              <>
                <div><span className={"param-label"}>Version:</span> <span>{response.result.versionHex + " (" + response.result.version + ")"}</span></div>
                <div><span className={"param-label"} >Merkle root:</span> <span className="underline hover:no-underline hover:cursor-pointer" >{response.result.merkleroot}</span></div>
                <div><span className={"param-label"}>Nonce:</span> <span>{response.result.nonce}</span></div>
                <div><span className={"param-label"}>Bits:</span> <span>{response.result.bits}</span></div>
                <div><span className={"param-label"}>Difficulty:</span> <span>{response.result.difficulty}</span></div>
                <div><span className={"param-label"}>Size:</span> <span>{response.result.size}</span></div>
                <div><span className={"param-label"}>Weight:</span> <span>{response.result.weight}</span></div>

              </>
            }
          </div>
          <div><span className={"param-label"}>Transactions:</span> <span>{response.result.tx.length}</span></div>

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
