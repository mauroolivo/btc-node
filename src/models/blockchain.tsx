/* https://transform.tools/json-to-typescript */

export interface BlockchainInfo {
    jsonrpc: string
    result: BlockchainInfoResult
    id: string
}
export interface BlockchainInfoResult {
    chain: string
    blocks: number
    headers: number
    bestblockhash: string
    difficulty: number
    time: number
    mediantime: number
    verificationprogress: number
    initialblockdownload: boolean
    chainwork: string
    size_on_disk: number
    pruned: boolean
    warnings: string[]
}
export interface Blockcount {
    jsonrpc: string
    result: number
    id: string
}
export interface Mempoolinfo {
  jsonrpc: string
  result: MempoolinfoResult
  id: string
}

export interface MempoolinfoResult {
  loaded: boolean
  size: number
  bytes: number
  usage: number
  total_fee: number
  maxmempool: number
  mempoolminfee: number
  minrelaytxfee: number
  incrementalrelayfee: number
  unbroadcastcount: number
  fullrbf: boolean
}
export interface Mininginfo {
  jsonrpc: string
  result: MininginfoResult
  id: string
}

export interface MininginfoResult {
  blocks: number
  difficulty: number
  networkhashps: number
  pooledtx: number
  chain: string
  warnings: string[]
}
export interface Networkinfo {
  jsonrpc: string
  result: NetworkinfoResult
  id: string
}

export interface NetworkinfoResult {
  version: number
  subversion: string
  protocolversion: number
  localservices: string
  localservicesnames: string[]
  localrelay: boolean
  timeoffset: number
  networkactive: boolean
  connections: number
  connections_in: number
  connections_out: number
  networks: NetworkinfoNetwork[]
  relayfee: number
  incrementalfee: number
  localaddresses: any[]
  warnings: string[]
}

export interface NetworkinfoNetwork {
  name: string
  limited: boolean
  reachable: boolean
  proxy: string
  proxy_randomize_credentials: boolean
}