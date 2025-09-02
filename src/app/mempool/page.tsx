'use client'
import {useState, useEffect} from 'react'
import {Rawmempool, RawmempoolTx} from "@/models/mempool";
import {getblock, getblockhash, getRawmempool, getrawtransaction} from "@/api/api";

export default function Client() {

  const [rawMempool, setRawmempool] = useState<Rawmempool | null>(null)
  const [input, setInput] = useState<string>("")
  const [tx, setTx] = useState<RawmempoolTx | null>(null)

  useEffect(() => {
    getRawmempool(true).then((data) => {
      console.log(data)
      setRawmempool(data)
    })
  }, []);

  function isValid(): boolean {
    if (input.length === 64) {
      return true
    }
    return false
  }
  async function handleSearch(input: string) {
    if (rawMempool?.result !== undefined) {
      const data: [string: RawmempoolTx] = rawMempool.result as [string: RawmempoolTx];
      if (input in data) {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        //console.log(data[input])
        setRawmempool(data[input])
        console.log(rawMempool)
      }
    }
  }

  return (
    <>
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
        </div>
      </form>
    </>
  );
}