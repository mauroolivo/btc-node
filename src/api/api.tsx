import {BlockchainInfo, Blockcount, Mempoolinfo, Mininginfo, Networkinfo} from "@/models/blockchain";
import {TxResponse} from "@/models/tx";
import {BlockResponse, BlockHashResponse} from "@/models/block";

const url = process.env.NEXT_PUBLIC_NODE_URL || ""
const API_USER = process.env.NEXT_PUBLIC_RPC_USER
const API_PASS = process.env.NEXT_PUBLIC_RPC_PASS
const auth = Buffer.from(API_USER + ":" + API_PASS).toString('base64')
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + auth
}
async function fetchData(method: string, params:(string | boolean | number)[]) {
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
export async function getblockchaininfo(): Promise<BlockchainInfo> {
    return fetchData("getblockchaininfo", []).then((response) => response.json())
        .then((data) => {
            return data;
        });
}
export async function getblockcount(): Promise<Blockcount> {
    return fetchData("getblockcount", []).then((response) => response.json())
        .then((data) => {
            return data;
        });
}
export async function getmempoolinfo(): Promise<Mempoolinfo> {
  return fetchData("getmempoolinfo", []).then((response) => response.json())
    .then((data) => {
      return data;
    });
}
export async function getmininginfo(): Promise<Mininginfo> {
  return fetchData("getmininginfo", []).then((response) => response.json())
    .then((data) => {
      return data;
    });
}
export async function getnetworkinfo(): Promise<Networkinfo> {
  return fetchData("getnetworkinfo", []).then((response) => response.json())
    .then((data) => {
      return data;
    });
}
export async function getrawtransaction(txid: string, verbose: boolean): Promise<TxResponse> {
    const params = [txid, verbose]
    return fetchData("getrawtransaction", params).then((response) => response.json())
        .then((data) => {
            return data;
        });
}
export async function getblock(blockid: string, verbosity: number): Promise<BlockResponse> {
    const params = [blockid, verbosity]
    return fetchData("getblock", params).then((response) => response.json())
        .then((data) => {
            return data;
        });
}
export async function getblockhash(height: string): Promise<BlockHashResponse> {
  const params = [Number(height)]
  return fetchData("getblockhash", params).then((response) => response.json())
    .then((data) => {
      return data;
    });
}