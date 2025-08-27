'use client'

import {toDateString} from "@/util/util";

import {
  Button,
} from "flowbite-react";
import {BlockResponse} from "@/models/block";
import {useState} from "react";

export default function BlockUI({response, onBlockAction}: {
  response: BlockResponse,
  onBlockAction: (arg: string) => void
}) {

  const [more, setMore] = useState<boolean>(false)

  function showTxs() {
    console.log(response.result.tx.length);
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
              <Button
                onClick={() => onBlockAction(response.result.previousblockhash)}>{response.result.previousblockhash}</Button>
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Next block
            </div>
            <div className="param-value">
              <Button
                onClick={() => onBlockAction(response.result.nextblockhash)}>{response.result.nextblockhash}</Button>
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
          <div className="float-right inline-flex gap-2">
            {!more && <Button onClick={() => {
              setMore(true)
            }}>More</Button>}
            {more && <Button onClick={() => {
              setMore(false)
            }}>Less</Button>}
            <Button onClick={() => {
              showTxs()
            }}>show transactions</Button>
          </div>
        </>
      }
    </>
  )
}
