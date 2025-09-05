'use client'
import {useState, useEffect} from 'react'
import {RawmempoolTx} from "@/models/mempool";
import {getblock, getblockhash, getmempoolinfo, getRawmempool, getrawtransaction} from "@/api/api";
import {Button} from "flowbite-react";
import TxDetailUI from "@/app/explorer/txdetailui";
import Mempooltxui from "@/app/mempool/mempooltxui";
import {TxResponse} from "@/models/tx";
import {Mempoolinfo} from "@/models/blockchain";
import {toDateString} from "@/util/util";
import TxUI from "@/app/explorer/txui";

export default function Client() {

  const [txs, setTxs] = useState<RawmempoolTx[]>([])
  const [input, setInput] = useState<string>("")
  const [page, setPage] = useState<number>(5)
  const offset = 0
  const [mempoolinfo, setMempoolinfo] = useState<Mempoolinfo | null>(null)
  const [mempoolTx, setMempoolTx] = useState<RawmempoolTx | null>(null)
  const [txData, setTxData] = useState<TxResponse | null>(null)

  useEffect(() => {
    getmempoolinfo().then((data) => {
      setMempoolinfo(data)
    })
    getRawmempool(true).then((rawMempool) => {
      if (rawMempool?.result !== undefined) {
        const data: [string: RawmempoolTx] = rawMempool.result as [string: RawmempoolTx];

        const temp_txs: RawmempoolTx[] = []
        Object.entries(data).forEach(([k, v]) => {
          v.txid_key = k
          temp_txs.push(v)
        })
        temp_txs.sort((a, b) => b.time - a.time);
        setTxs(temp_txs)
      }
    });
  }, []);

  // async function callTxs() {
  //   const promise_list: Promise<TxResponse>[] = []
  //   too heavy, slice to 1000
  //   txs.slice(0,1000).forEach(function (item, index) {
  //     promise_list.push(getrawtransaction(item.txid_key, true))
  //   });
  //   const tx_list_full = await Promise.all(promise_list);
  //   console.log("The full tx list: ", tx_list_full.length)
  // }

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
          <div className="param-title text-center">bticoin-cli getmempoolinfo</div>
          <div className="w-full justify-center md:flex-none lg:flex lg:gap-20 ">

            <div className="md:w-full lg:w-14 grow">
              <div className="param-box">
                <div className="param-key">
                  Bytes
                </div>
                <div className="param-value">
                  {mempoolinfo.result.bytes}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Incremental relay fee
                </div>
                <div className="param-value">
                  {mempoolinfo.result.incrementalrelayfee}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Mempool min fee
                </div>
                <div className="param-value">
                  {mempoolinfo.result.mempoolminfee}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Total fee
                </div>
                <div className="param-value">
                  {mempoolinfo.result.total_fee}
                </div>
              </div>


            </div>
            <div className="md:w-full lg:w-14 grow">

              <div className="param-box">
                <div className="param-key">
                  Unbroadcast count
                </div>
                <div className="param-value">
                  {mempoolinfo.result.unbroadcastcount}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Usage
                </div>
                <div className="param-value">
                  {mempoolinfo.result.usage}
                </div>
              </div>

              <div className="param-box">
                <div className="param-key">
                  Size
                </div>
                <div className="param-value">
                  {mempoolinfo.result.size}
                </div>
              </div>
            </div>
          </div>
        </>
      }

        <form className="">
          <div className="flex w-full gap-1">
            <div className="grow ">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className=" font-mono flex w-full rounded-0 py-[11px] px-3 flounder:px-4 flounder:pt-[14px] flounder:pb-[15px] !text-callout transition-shadow font-normal
                                leading-none placeholder:!text-callout placeholder:font-medium placeholder:text-neutral70 ring-1 ring-inset ring-itemPrimaryMute
                                bg-backgroundPrimaryDefault text-itemPrimaryDefault disabled:text-neutral70 focus-visible:outline-none focus-visible:ring-itemSecondaryDefault
                                disabled:cursor-not-allowed disabled:bg-backgroundPrimaryHighlight disabled:ring-itemPrimaryMute h-[54px]"
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
              font-semibold tracking-normal flounder:px-8 size-full !text-desktopCallout"
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
              font-semibold tracking-normal flounder:px-8 size-full !text-desktopCallout"
                type="button"
                onClick={() => handleReset()}
              >
                <div>Reset</div>
              </button>
            </div>
          </div>
        </form>
        {mempoolTx && <Mempooltxui data={mempoolTx}/>}
        {mempoolTx && <TxUI response={txData} onBlockAction={handleNewInput} onTxAction={handleNewInput}/>}
        {
          listBlock()
        }

    </>
  );
}