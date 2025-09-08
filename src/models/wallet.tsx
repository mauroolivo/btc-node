export interface ListWallets {
  jsonrpc: string
  result: string[]
  id: string
}

export interface WalletInfo {
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