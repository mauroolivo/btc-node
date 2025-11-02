'use server'

import {BlockchainInfo, Blockcount, Mempoolinfo, Mininginfo, Networkinfo} from "@/models/blockchain";
import {TxResponse} from "@/models/tx";
import {BlockResponse, BlockHashResponse} from "@/models/block";
import {Rawmempool} from "@/models/mempool";
import {
  BroadcastResponse,
  ChangeAddressResponse, CreateRawTransactionResponse,
  ListWalletDirResponse,
  ListWallets, SendResponse, SignRawTransactionResponse,
  UnconfirmedBalance,
  UTXOResponse,
  WalletInfoResponse, WalletLoad,
  WalletTxs, WalletUnload
} from "@/models/wallet";
import {ParamsDictionary} from "@/models/api";

const url = process.env.NEXT_PUBLIC_NODE_URL || ""
const API_USER = process.env.NEXT_PUBLIC_RPC_USER
const API_PASS = process.env.NEXT_PUBLIC_RPC_PASS
const auth = Buffer.from(API_USER + ":" + API_PASS).toString('base64')
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'Basic ' + auth
}

async function fetchData(method: string, params: ParamsDictionary) {
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

export const fetcher = async (
  method: string,
  params: ParamsDictionary,
) => {
  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      "jsonrpc": "2.0",
      "id": "curl",
      "method": method,
      "params": params
    })
  };
  console.log("fetcher run");
  return fetch(url, options).then(r => r.json());
};

export async function getblockchaininfo(): Promise<BlockchainInfo> {
  return await fetcher("getblockchaininfo", {}) as Promise<BlockchainInfo>;
}

export async function getblockcount(): Promise<Blockcount> {
  const response = await fetchData("getblockcount", {})
  return await response.json();
}

export async function getmempoolinfo(): Promise<Mempoolinfo> {
  const response = await fetchData("getmempoolinfo", {})
  return await response.json();
}

export async function getmininginfo(): Promise<Mininginfo> {
  const response = await fetchData("getmininginfo", {})
  return await response.json();
}

export async function getnetworkinfo(): Promise<Networkinfo> {
  const response = await fetchData("getnetworkinfo", {})
  return await response.json();
}

export async function getrawtransaction(txid: string, verbose: boolean): Promise<TxResponse> {
  const params = [txid, verbose]
  const response = await fetchData("getrawtransaction", {"txid": txid, "verbose": verbose})
  return await response.json();
}

export async function getblock(blockid: string, verbosity: number): Promise<BlockResponse> {
  const params = [blockid, verbosity]
  const response = await fetchData("getblock", {"blockhash": blockid, "verbosity": verbosity});
  return await response.json();
}

export async function getblockhash(height: string): Promise<BlockHashResponse> {
  const params = [Number(height)];
  const response = await fetchData("getblockhash", {"height": Number(height)});
  return await response.json();
}

export async function getRawmempool(verbose: boolean): Promise<Rawmempool> {
  const params = [verbose];
  const response = await fetchData("getrawmempool", {"verbose": verbose});
  return await response.json();
}

export async function listWallets(): Promise<ListWallets> {
  const response = await fetchData("listwallets", {});
  return await response.json();
}

export async function getUnconfirmedbalance(): Promise<UnconfirmedBalance> {
  const response = await fetchData("getunconfirmedbalance", {});
  return await response.json();
}

export async function getWalletInfo(): Promise<WalletInfoResponse> {
  const response = await fetchData("getwalletinfo", {});
  return await response.json();
}

export async function listTxs(): Promise<WalletTxs> {
  const response = await fetchData("listtransactions", {});
  return await response.json();
}

export async function listUnspent(): Promise<UTXOResponse> {
  const response = await fetchData("listunspent", {});
  return await response.json();
}

export async function listWalletDir(): Promise<ListWalletDirResponse> {
  const response = await fetchData("listwalletdir", {});
  return await response.json();
}

export async function unloadWallet(name: string): Promise<WalletUnload> {
  const response = await fetchData("unloadwallet", {"wallet_name": name});
  return await response.json();
}

export async function loadWallet(name: string): Promise<WalletLoad> {
  const response = await fetchData("loadwallet", {"filename": name});
  return await response.json();
}

export async function getRawChangeAddress(): Promise<ChangeAddressResponse> {
  const response = await fetchData("getrawchangeaddress", {});
  return await response.json();
}

export async function sendToAddress(payload: ParamsDictionary): Promise<SendResponse> {
  const response = await fetchData("sendtoaddress", payload);
  return await response.json();
}

export async function createRawTransaction(payload: ParamsDictionary): Promise<CreateRawTransactionResponse> {
  const response = await fetchData("createrawtransaction", payload);
  return await response.json();
}

export async function signRawTransactionWithWallet(payload: ParamsDictionary): Promise<SignRawTransactionResponse> {
  const response = await fetchData("signrawtransactionwithwallet", payload);
  return await response.json();
}

export async function sendRawTransaction(payload: ParamsDictionary): Promise<BroadcastResponse> {
  const response = await fetchData("sendrawtransaction", payload);
  return await response.json();
}

