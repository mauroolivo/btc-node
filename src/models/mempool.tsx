
export interface Rawmempool {
  jsonrpc: string
  result: [string: RawmempoolTx]
  id: string
}
export interface RawmempoolTx {
  vsize: number
  weight: number
  time: number
  height: number
  descendantcount: number
  descendantsize: number
  ancestorcount: number
  ancestorsize: number
  wtxid: string
  fees: {
    base: number
    modified: number
    ancestor: number
    descendant: number
  }
  depends: string[]
  spentby?: string[]
  "bip125-replaceable": boolean
  unbroadcast: boolean
  txid_key: string
}