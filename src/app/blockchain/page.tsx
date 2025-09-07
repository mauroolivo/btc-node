'use server'

import {BlockchainInfo, Mininginfo, Networkinfo} from "@/models/blockchain";
import {getblockchaininfo, getblockcount, getmempoolinfo, getmininginfo, getnetworkinfo} from "@/api/api";
import Client from "@/app/blockchain/client";

export default async function Page() {

  const blockchaininfo = await getblockchaininfo()
  const blockcount = await getblockcount()
  const mininginfo = await getmininginfo()
  const networkinfo = await getnetworkinfo()

  return (
    <>
      <Client blockchaininfo={blockchaininfo} blockcount={blockcount.result} mininginfo={mininginfo} networkinfo={networkinfo} />
    </>
  );
}