'use client'
import { useState, useEffect } from 'react'
import {Transaction} from "@/models/transaction";
import {getrawtransaction} from "@/api/api";
import {Dropdown, DropdownDivider, DropdownItem} from "flowbite-react";

export default function Client() {

    const [data, setData] = useState<Transaction | null>(null)
    const [input, setInput] = useState<string>("")
    const [err, setErr] = useState<boolean>(false)
    function handleTestSample(n: number) {
        let input = ""
        if (n === 1) {
            input = "fbd1bf898013a580bd8dce18a2636da8cca460a0457f5a88ce2084e4609c5002"
        } else if (n === 2) {
            input = "000000008000b621b1ff1426e6b2d1af900e25214fa1d2bf3e7523d1f0525935"
        }
        handleSearch(input)
        setInput(input)
    }
    function handleSearch(input: string) {
        getrawtransaction(input, true)
            .then((data) => {
            console.log(data.result)
                if(data.result === undefined) {
                    setData(null)
                    setErr(true)
                } else {
                    setErr(false)
                    setData(data)
                }

        })
    }
    return (
        <>
            <form className="w-[100%]">

                <div className=" flex flex-col items-start gap-1 flounder:flex-row flounder:gap-4">
                    <div className="relative w-full grow flounder:w-auto">
                        <div className="relative flex-1 space-y-1 text-left flounder:space-y-2">
                            <div className="relative"><input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className=" font-mono flex w-full rounded-0 py-[11px] px-3 flounder:px-4 flounder:pt-[14px] flounder:pb-[15px] !text-callout transition-shadow font-normal
                                leading-none placeholder:!text-callout placeholder:font-medium placeholder:text-neutral70 ring-1 ring-inset ring-itemPrimaryMute bg-backgroundPrimaryDefault text-itemPrimaryDefault disabled:text-neutral70 focus-visible:outline-none focus-visible:ring-itemSecondaryDefault disabled:cursor-not-allowed disabled:bg-backgroundPrimaryHighlight disabled:ring-itemPrimaryMute h-[54px]"
                                placeholder="Tx or Block ID"
                                /></div>
                        </div>
                        <div className="h-[54px] w-full flounder:w-auto mt-1 flounder:mt-0 flounder:min-w-[232px]">
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

                </div>
            </form>
            {
                err && <p className="text-red-600">Invalid hash</p>
            }
            <Dropdown className="rounded-none !bg-black" label="Testnet Samples" dismissOnClick={true}>
                <DropdownItem onClick={() => handleTestSample(1)}>tx 1</DropdownItem>
                <DropdownDivider />
                <DropdownItem onClick={() => handleTestSample(2)}>block 1</DropdownItem>
            </Dropdown>
            <div className="text-amber-400">
                {data != null && <p className=" max-w-300 break-words">{JSON.stringify(data.result)}</p>}

            </div>
        </>
    )
}
