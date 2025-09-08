import {BlockchainInfo, Blockcount, Mempoolinfo, Mininginfo, Networkinfo} from "@/models/blockchain";
import {TxResponse} from "@/models/tx";
import {BlockResponse, BlockHashResponse} from "@/models/block";
import {Rawmempool} from "@/models/mempool";
import {ListWallets, WalletInfo} from "@/models/wallet";

const url = process.env.NEXT_PUBLIC_NODE_URL || ""
const API_USER = process.env.NEXT_PUBLIC_RPC_USER
const API_PASS = process.env.NEXT_PUBLIC_RPC_PASS
const auth = Buffer.from(API_USER + ":" + API_PASS).toString('base64')
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'Basic ' + auth
}

async function fetchData(method: string, params: (string | boolean | number)[]) {
  return await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      "jsonrpc": "2.0",
      "id": "curl",
      "method": method,
      "params": params
    })
  })
}

// export async function getObj<T>(): Promise<T> {
//   const response = await fetchData("getblockchaininfo", []);
//   return await response.json();
// }

export async function getblockchaininfo(): Promise<BlockchainInfo> {
  const response = await fetchData("getblockchaininfo", [])
  return await response.json();
}

export async function getblockcount(): Promise<Blockcount> {
  const response = await fetchData("getblockcount", [])
  return await response.json();
}

export async function getmempoolinfo(): Promise<Mempoolinfo> {
  const response = await fetchData("getmempoolinfo", [])
  return await response.json();
}

export async function getmininginfo(): Promise<Mininginfo> {
  const response = await fetchData("getmininginfo", [])
  return await response.json();
}

export async function getnetworkinfo(): Promise<Networkinfo> {
  const response = await fetchData("getnetworkinfo", [])
  return await response.json();
}

export async function getrawtransaction(txid: string, verbose: boolean): Promise<TxResponse> {
  const params = [txid, verbose]
  const response = await fetchData("getrawtransaction", params)
  return await response.json();
}

export async function getblock(blockid: string, verbosity: number): Promise<BlockResponse> {
  const params = [blockid, verbosity]
  const response = await fetchData("getblock", params)
  return await response.json();
}

export async function getblockhash(height: string): Promise<BlockHashResponse> {
  const params = [Number(height)];
  const response = await fetchData("getblockhash", params);
  return await response.json();
}

export async function getRawmempool(verbose: boolean): Promise<Rawmempool> {
  const params = [verbose];
  const response = await fetchData("getrawmempool", params);
  return await response.json();
}

export async function listWallets(): Promise<ListWallets> {
  const response = await fetchData("listwallets", []);
  return await response.json();
}

export async function getWalletInfo(): Promise<WalletInfo> {
  const response = await fetchData("getwalletinfo", []);
  return await response.json();
}