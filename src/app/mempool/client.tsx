'use client'
import {useState, useEffect} from 'react'
import {RawmempoolTx} from "@/models/mempool";
import {getblock, getblockhash, getmempoolinfo, getRawmempool, getrawtransaction} from "@/api/api";
import {Button} from "@/components/ui/button"

import Mempooltxui from "@/app/mempool/mempooltxui";
import {TxResponse} from "@/models/tx";
import {Mempoolinfo} from "@/models/blockchain";
import {toDateString} from "@/util/util";
import TxUI from "@/app/explorer/txui";

export default function Client({mempoolinfo, txs}: {
  mempoolinfo: Mempoolinfo | null,
  // mempoolTx: RawmempoolTx | null,
  txs: RawmempoolTx[],

}) {

  const [input, setInput] = useState<string>("")
  const [page, setPage] = useState<number>(5)
  const offset = 0
  // const [mempoolinfo, setMempoolinfo] = useState<Mempoolinfo | null>(null)
  const [mempoolTx, setMempoolTx] = useState<RawmempoolTx | null>(null)
  const [txData, setTxData] = useState<TxResponse | null>(null)

  function isValid(): boolean {
    if (input.length === 64) {
      return true
    }
    return false
  }

  function moreTxs() {
    setPage(page + 1)
  }

  function tx_list(): React.JSX.Element {
    const txs_slice = txs.slice(offset, page)
    const list_items = txs_slice.map((item, idx) =>
      <div key={idx}>
        {item &&
          <div>
            <div className="param-box">
              <div className="param-key underline hover:no-underline hover:cursor-pointer"
                   onClick={() => {
                     handleSearch(item.txid_key)
                   }}>{item.txid_key}
              </div>
              <div className="param-value">
                <div>{item.height}</div>
                <div>{toDateString(item.time)}</div>
              </div>
            </div>
          </div>
        }
      </div>
    );
    return (<>{list_items}</>)
  }

  async function handleSearch(input: string) {
    if (txs) {
      const result = txs.filter(function (el) {
        return el.txid_key === input;
      });
      if (result.length == 1) {
        setMempoolTx(result[0])
        const [txData] = await Promise.all([getrawtransaction(input, true)]);
        setTxData(txData);
      } else {
        setMempoolTx(null)
        setTxData(null)
      }
    }
  }

  function handleReset(): void {
    setMempoolTx(null)
    setInput("")
  }
  async function handleNewInput(input: string) {
    handleSearch(input).then(r => {
        // setInput(input)
      }
    )
  }
  function listBlock() {
    if (mempoolTx === null) {
      return (<>
        {tx_list()}
        <div className="w-full grid justify-items-center p-4">
          <Button onClick={() => {
            moreTxs()
          }}>show transactions ({page}/{txs.length})</Button>
        </div>
      </>)
    } else {
      return (<></>)
    }

  }

  return (
    <>
      {mempoolinfo &&
        <>
          <div>
            <p className={"text-prominent"}>mempool info</p>
            <div><span className={"param-label"}>Bytes:</span> <span>{mempoolinfo.result.bytes}</span></div>
            <div><span className={"param-label"}>Min fee:</span> <span>{mempoolinfo.result.mempoolminfee}</span></div>
            <div><span className={"param-label"}>Total fee:</span> <span>{mempoolinfo.result.total_fee}</span></div>
            <div><span className={"param-label"}>Usage:</span> <span>{mempoolinfo.result.usage}</span></div>
            <div><span className={"param-label"}>Size:</span> <span>{mempoolinfo.result.size}</span></div>
          </div>
        </>
      }

      <form className="w-full mt-4 mb-4">
        <div className="flex w-full gap-2">
          <div className="flex-1">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-mono flex w-full rounded-0 py-[11px] px-3 flounder:px-4 flounder:pt-[14px] flounder:pb-[15px] !text-callout transition-shadow font-normal
                                leading-none placeholder:!text-callout placeholder:font-medium placeholder:text-neutral70 ring-1 ring-inset ring-itemPrimaryMute
                                bg-backgroundPrimaryDefault text-itemPrimaryDefault disabled:text-neutral70 focus-visible:outline-none focus-visible:ring-itemSecondaryDefault
                                disabled:cursor-not-allowed disabled:bg-backgroundPrimaryHighlight disabled:ring-itemPrimaryMute h-[44px]"
              placeholder="Search by Tx id in mempool"
            />
          </div>
          <div className="grow-0">
            <button
              disabled={!isValid()}
              className="disabled:opacity-40 group/button inline-flex items-center justify-center whitespace-nowrap rounded-0 transition-[color,background,box-shadow]
              focus-visible:outline-brandDefault focus-visible:-outline-offset-1 focus-visible:outline-1 disabled:pointer-events-none outline-none
              uppercase gap-1 flounder:gap-2 font-mono text-backgroundInverseOnDefault bg-backgroundInverseDefault hover:text-backgroundInverseOnActive
              hover:bg-backgroundInverseActive focus-visible:bg-backgroundInverseActive py-3 px-5 flounder:py-4 text-body4 flounder:text-body4
              font-semibold tracking-normal flounder:px-8 size-full !text-desktopCallout h-[44px]"
              type="button"
              onClick={() => handleSearch(input)}
            >
              <div>Search</div>
            </button>
          </div>
          <div className="grow-0">
            <button
              className="disabled:opacity-40 group/button inline-flex items-center justify-center whitespace-nowrap rounded-0 transition-[color,background,box-shadow]
              focus-visible:outline-brandDefault focus-visible:-outline-offset-1 focus-visible:outline-1 disabled:pointer-events-none outline-none
              uppercase gap-1 flounder:gap-2 font-mono text-backgroundInverseOnDefault bg-backgroundInverseDefault hover:text-backgroundInverseOnActive
              hover:bg-backgroundInverseActive focus-visible:bg-backgroundInverseActive py-3 px-5 flounder:py-4 text-body4 flounder:text-body4
              font-semibold tracking-normal flounder:px-8 size-full !text-desktopCallout h-[44px]"
              type="button"
              onClick={() => handleReset()}
            >
              <div>Reset</div>
            </button>
          </div>
        </div>
      </form>
      {mempoolTx && <Mempooltxui data={mempoolTx}/>}
      {txData && mempoolTx && <TxUI response={txData} onBlockAction={handleNewInput} onTxAction={handleNewInput}/>}
      {
        listBlock()
      }

    </>
  );
}