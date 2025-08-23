'use client'
import { useState, useEffect } from 'react'
import {Transaction} from "@/models/transaction";
import {getrawtransaction} from "@/api/api";

export default function Client() {

    const [data, setData] = useState<Transaction | null>(null)

    function handleTx() {
        getrawtransaction("fbd1bf898013a580bd8dce18a2636da8cca460a0457f5a88ce2084e4609c5002", true)
            .then((data) => {
            console.log(data.result)
                setData(data)
        })
    }
    return (
        <>
        <div className="   text-amber-400">
            {data != null && <p className=" max-w-300 break-words">{JSON.stringify(data.result)}</p>}
        </div>
    <button onClick={handleTx}>get tx</button>
        </>
    )
}
