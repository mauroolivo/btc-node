'use client'
import {useState, useEffect} from 'react'
import {BlockchainInfo} from "@/models/blockchain";
import {getblockchaininfo, getblockcount} from "@/api/api";

export default function Client() {

  const [data, setData] = useState<BlockchainInfo | null>(null)

  function handleBlockchainInfo() {
    getblockchaininfo().then((data) => {
      console.log(data)
      setData(data)
    })
  }

  function handleBlockcount() {
    getblockcount().then((data) => {
      console.log(data.result)
    })
  }

  return (

    <>
      {data != null && <span className="limit-full">{JSON.stringify(data.result)}</span>}
      <button onClick={handleBlockchainInfo}>get blockchain info</button>
      <button onClick={handleBlockcount}>get block count</button>
    </>

  )
}
