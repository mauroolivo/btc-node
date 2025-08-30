'use client'
import {useState, useEffect} from 'react'
import {BlockchainInfo} from "@/models/blockchain";
import {getblockchaininfo, getblockcount} from "@/api/api";

export default function Client() {


  const [blockchaininfo, setBlockchainInfo] = useState<BlockchainInfo | null>(null)
  const [blockcount, setBlockcount] = useState<number | null>(null)

  useEffect(() => {
    getblockchaininfo().then((data) => {
      console.log(data)
      setBlockchainInfo(data)
    })
    getblockcount().then((data) => {
      setBlockcount(data.result)
    })
  }, []);

  function warnings(): React.JSX.Element {
    const list_items = blockchaininfo?.result.warnings.map((input, idx) =>
      <div key={idx}>
        {input}
      </div>
    )
    return (<>{list_items}</>)
  }
  return (
    <>
      {blockcount &&
        <div className="w-full text-center">
          <div className="param-title">bticoin-cli getblockcount</div>
          <div className="param-box">
            <div className="param-key">
              Block count
            </div>
            <div className="param-value">
              {blockcount}
            </div>
          </div>
        </div>
      }
      {blockchaininfo &&
        <div className="w-full text-center">
          <div className="param-title">bticoin-cli getblockchaininfo</div>
          <div className="param-box">
            <div className="param-key">
              Chain
            </div>
            <div className="param-value">
              {blockchaininfo.result.chain}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Bestblockhash
            </div>
            <div className="param-value">
              {blockchaininfo.result.bestblockhash}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Blocks
            </div>
            <div className="param-value">
              {blockchaininfo.result.blocks}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Initial block download
            </div>
            <div className="param-value">
              {blockchaininfo.result.initialblockdownload}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Median time
            </div>
            <div className="param-value">
              {blockchaininfo.result.mediantime}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Pruned
            </div>
            <div className="param-value">
              {blockchaininfo.result.pruned}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Size on disk
            </div>
            <div className="param-value">
              {blockchaininfo.result.size_on_disk}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Time
            </div>
            <div className="param-value">
              {blockchaininfo.result.time}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Verification progress
            </div>
            <div className="param-value">
              {blockchaininfo.result.verificationprogress}
            </div>
          </div>
          <div className="param-box">
            <div className="param-key">
              Warnings
            </div>
            <div className="param-value">
              {warnings()}
            </div>
          </div>
        </div>
      }
      </>
  );
}
