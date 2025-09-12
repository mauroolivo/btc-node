export interface ListWallets {
  jsonrpc: string
  result: string[]
  id: string
}

export interface WalletInfoResponse {
  jsonrpc: string
  result: WalletInfoResult
  id: string
}
export interface WalletInfoResult {
  walletname: string
  walletversion: number
  format: string
  balance: number
  unconfirmed_balance: number
  immature_balance: number
  txcount: number
  keypoolsize: number
  keypoolsize_hd_internal: number
  paytxfee: number
  private_keys_enabled: boolean
  avoid_reuse: boolean
  scanning: boolean
  descriptors: boolean
  external_signer: boolean
  blank: boolean
  birthtime: number
  lastprocessedblock: Lastprocessedblock
}
export interface Lastprocessedblock {
  hash: string
  height: number
}

export interface WalletTxs {
  jsonrpc: string
  result: WalletTx[]
  id: string
}

export interface WalletTx {
  address: string
  parent_descs: string[]
  category: string
  amount: number
  label: string
  vout: number
  abandoned: boolean
  confirmations: number
  blockhash: string
  blockheight: number
  blockindex: number
  blocktime: number
  txid: string
  wtxid: string
  walletconflicts: string[]
  mempoolconflicts: string[]
  time: number
  timereceived: number
  "bip125-replaceable": string
}

export interface UTXOResponse {
  jsonrpc: string
  result: UTXO[]
  id: string
}

export interface UTXO {
  txid: string
  vout: number
  address: string
  label: string
  scriptPubKey: string
  amount: number
  confirmations: number
  spendable: boolean
  solvable: boolean
  desc: string
  parent_descs: string[]
  safe: boolean
}

export interface ListAddressResponse {
  jsonrpc: string
  result: unknown[][][]
  id: string
}

export interface UnconfirmedBalance {
  jsonrpc: string
  result: number
  id: string
}

export interface NewAddressResponse {
  jsonrpc: string
  result: string
  id: string
}