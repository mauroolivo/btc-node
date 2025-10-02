'use client'

import {BlockchainInfo, Mininginfo, Networkinfo} from "@/models/blockchain";

export default function Client({blockchaininfo, blockcount, mininginfo, networkinfo}:{
  blockchaininfo: BlockchainInfo | null,
  blockcount: number | null,
  mininginfo: Mininginfo | null,
  networkinfo: Networkinfo | null,
}) {

  function list(list: string[]): React.JSX.Element {
    const list_items = list.map((input, idx) =>
      <span key={idx}>
        {input + " "}
      </span>
    )
    return (<>{list_items}</>)
  }

  return (
    <>
      <div>
        <p>getblockcount</p>
        {blockcount && <div><span className={"param-label"}>Blocks:</span> <span>{blockcount}</span></div>}
      </div>
      {
        networkinfo &&
        <div>
          <p>getnetworkinfo</p>
          <div><span className={"param-label"}>Protocol version:</span> <span>{networkinfo.result.protocolversion}</span></div>
          <div><span className={"param-label"}>Subversion:</span> <span>{networkinfo.result.subversion}</span></div>
          <div><span className={"param-label"}>Version:</span> <span>{networkinfo.result.version}</span></div>
          <div><span className={"param-label"}>Connections:</span> <span>{networkinfo.result.connections} ({networkinfo.result.connections_in} in / {networkinfo.result.connections_out}) out</span></div>
          <div><span className={"param-label"}>Local services:</span> <span>{networkinfo.result.localservices}</span></div>
          <div><span className={"param-label"}>Local services names:</span> <span>{list(networkinfo.result.localservicesnames)}</span></div>
        </div>
      }
      {
        blockchaininfo &&
        <div>
          <p>getblockchaininfo</p>
          <div><span className={"param-label"}>Chain:</span> <span>{blockchaininfo.result.chain}</span></div>

          <div><span className={"param-label"}>Initial block download:</span> <span>{blockchaininfo.result.initialblockdownload && ("true")}
            {!blockchaininfo.result.initialblockdownload && ("false")}</span></div>
          <div><span className={"param-label"}>Median time:</span> <span>{blockchaininfo.result.mediantime}</span></div>
          <div><span className={"param-label"}>Pruned:</span> <span>{blockchaininfo.result.pruned && ("true")}
            {!blockchaininfo.result.pruned && ("false")}</span></div>
          <div><span className={"param-label"}>Size on disk:</span> <span>{blockchaininfo.result.size_on_disk}</span></div>
          <div><span className={"param-label"}>Time:</span> <span>{blockchaininfo.result.time}</span></div>
          <div><span className={"param-label"}>Verification progress:</span> <span>{blockchaininfo.result.verificationprogress}</span></div>
          <div><span className={"param-label"}>Warnings:</span> <span>{list(blockchaininfo.result.warnings)}</span></div>
        </div>
      }
      {
        mininginfo &&
        <div>
          <p>getmininginfo</p>
          <div><span className={"param-label"}>Difficulty:</span> <span>{mininginfo.result.difficulty}</span></div>
          <div><span className={"param-label"}>Network hash ps:</span> <span>{mininginfo.result.networkhashps}</span></div>
        </div>
      }
    </>
  );
}