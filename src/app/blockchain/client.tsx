'use client'

import {BlockchainInfo, Mininginfo, Networkinfo} from "@/models/blockchain";
import useStorage from "@/hooks/use-storage";

export default function Client({blockchaininfo, blockcount, mininginfo, networkinfo}:{
  blockchaininfo: BlockchainInfo | null,
  blockcount: number | null,
  mininginfo: Mininginfo | null,
  networkinfo: Networkinfo | null,
}) {

  function list(list: string[]): React.JSX.Element {
    const list_items = list.map((input, idx) =>
      <div key={idx}>
        {input}
      </div>
    )
    return (<>{list_items}</>)
  }

  const { getItem } = useStorage();
  const token = getItem('token');
  console.log("message: " + token);

  return (
    <>
      <div className="w-full justify-center md:flex-none lg:flex lg:gap-20 ">
        <div className="md:w-full lg:w-14 grow">
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
          {networkinfo &&
            <div className="w-full text-center">
              <div className="param-title">bticoin-cli getnetworkinfo</div>
              <div className="param-box">
                <div className="param-key">
                  Protocol version
                </div>
                <div className="param-value">
                  {networkinfo.result.protocolversion}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Subversion
                </div>
                <div className="param-value">
                  {networkinfo.result.subversion}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Version
                </div>
                <div className="param-value">
                  {networkinfo.result.version}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Connections
                </div>
                <div className="param-value">
                  {networkinfo.result.connections} ({networkinfo.result.connections_in} in / {networkinfo.result.connections_out}) out
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Incremental fee
                </div>
                <div className="param-value">
                  {networkinfo.result.incrementalfee}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Local addresses
                </div>
                <div className="param-value">
                  {networkinfo.result.localaddresses}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Local services
                </div>
                <div className="param-value">
                  {networkinfo.result.localservices}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Local services names
                </div>
                <div className="param-value">
                  {list(networkinfo.result.localservicesnames)}
                </div>
              </div>
            </div>
          }
        </div>
        <div className="md:w-full lg:w-14 grow">
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
                  {blockchaininfo.result.initialblockdownload && ("true")}
                  {!blockchaininfo.result.initialblockdownload && ("false")}
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
                  {blockchaininfo.result.pruned && ("true")}
                  {!blockchaininfo.result.pruned && ("false")}
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
                  {list(blockchaininfo.result.warnings)}
                </div>
              </div>
            </div>
          }
          {mininginfo &&
            <div className="w-full text-center">
              <div className="param-title">bticoin-cli getmininginfo</div>
              <div className="param-box">
                <div className="param-key">
                  Bytes
                </div>
                <div className="param-value">
                  {mininginfo.result.blocks}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Difficulty
                </div>
                <div className="param-value">
                  {mininginfo.result.difficulty}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Network hash ps
                </div>
                <div className="param-value">
                  {mininginfo.result.networkhashps}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Pooled tx
                </div>
                <div className="param-value">
                  {mininginfo.result.pooledtx}
                </div>
              </div>
              <div className="param-box">
                <div className="param-key">
                  Warnings
                </div>
                <div className="param-value">
                  {list(mininginfo.result.warnings)}
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}