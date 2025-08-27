'use client'
import {useState, useEffect} from 'react'
import {TxResponse} from "@/models/tx";
import {BlockResponse} from "@/models/block";
import {getblock, getrawtransaction} from "@/api/api";
import {Dropdown, DropdownDivider, DropdownItem} from "flowbite-react";
import TxUI from './txui'
import BlockUI from './blockui'

export default function Client() {

  const [txData, setTxData] = useState<TxResponse | null>(null)
  const [blockData, setBlockData] = useState<BlockResponse | null>(null)
  const [input, setInput] = useState<string>("")
  const [err, setErr] = useState<boolean>(false)

  function handleTestSample(n: number) {
    let input = ""
    if (n === 1) {
      input = "fbd1bf898013a580bd8dce18a2636da8cca460a0457f5a88ce2084e4609c5002"
    } else if (n === 2) {
      input = "ef8df6921c3533490cfe676a950ca038c063d91826124cb0ee07a1e878bcee75"
    } else if (n === 100) {
      input = "000000008000b621b1ff1426e6b2d1af900e25214fa1d2bf3e7523d1f0525935"
    }
    handleSearch(input)
    setInput(input)
  }

  async function handleSearch(input: string) {

    const [txData, blockData] = await Promise.all([getrawtransaction(input, true), getblock(input, 2)]);
    setErr(false)
    setTxData(null)
    setBlockData(null)
    if (txData.result === undefined && blockData.result === undefined) {
      setErr(true)
    }
    if (txData.result === undefined) {
      if (blockData.result === undefined) {
        setErr(true)
      } else {
        setBlockData(blockData)
      }
    } else {
      setTxData(txData)
    }
  }

  async function handleNewInput(input: string) {
    handleSearch(input).then(r => {
        setInput(input)
      }
    )
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
                                leading-none placeholder:!text-callout placeholder:font-medium placeholder:text-neutral70 ring-1 ring-inset ring-itemPrimaryMute bg-backgroundPrimaryDefault text-itemPrimaryDefault disabled:text-neutral70 focus-visible:outline-none focus-visible:ring-itemSecondaryDefault disabled:cursor-not-allowed disabled:bg-backgroundPrimaryHighlight disabled:ring-itemPrimaryMute h-[54px]"
              placeholder="Tx or Block ID"
            />
          </div>
          <div className="grow-0">
            <button
              disabled={input.length !== 64}
              className="disabled:opacity-40 group/button inline-flex items-center justify-center whitespace-nowrap rounded-0 transition-[color,background,box-shadow] focus-visible:outline-brandDefault focus-visible:-outline-offset-1 focus-visible:outline-1 disabled:pointer-events-none outline-none uppercase gap-1 flounder:gap-2 font-mono text-backgroundInverseOnDefault bg-backgroundInverseDefault hover:text-backgroundInverseOnActive hover:bg-backgroundInverseActive focus-visible:bg-backgroundInverseActive py-3 px-5 flounder:py-4 text-body4 flounder:text-body4 font-semibold tracking-normal flounder:px-8 size-full !text-desktopCallout"
              type="button"
              onClick={() => handleSearch(input)}
            >
              <div>Search</div>
            </button>
          </div>
        </div>
      </form>
      {
        err && <p className="text-red-600">Invalid hash</p>
      }
      <Dropdown className=" mt-2 rounded-none !bg-black" label="Testnet Samples" dismissOnClick={true}>
        <DropdownItem onClick={() => handleTestSample(1)}>tx 1</DropdownItem>
        <DropdownItem onClick={() => handleTestSample(2)}>tx 2</DropdownItem>
        <DropdownDivider/>
        <DropdownItem onClick={() => handleTestSample(100)}>block 1</DropdownItem>
      </Dropdown>
      <div className="p-10">
        {txData != null && <TxUI response={txData} onBlockAction={handleNewInput}/>}
        {blockData != null && <BlockUI response={blockData} onBlockAction={handleNewInput}/>}
      </div>
    </>
  )
}
