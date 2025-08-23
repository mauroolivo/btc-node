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