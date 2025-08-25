import {Vin, Vout} from "@/models/tx";

export interface BlockResponse {
    jsonrpc: string
    result: BlockResult
    id: string
}

export interface BlockResult {
    hash: string
    confirmations: number
    height: number
    version: number
    versionHex: string
    merkleroot: string
    time: number
    mediantime: number
    nonce: number
    bits: string
    difficulty: number
    chainwork: string
    nTx: number
    previousblockhash: string
    nextblockhash: string
    strippedsize: number
    size: number
    weight: number
    tx: BlockTx[]
}

export interface BlockTx {
    txid: string
    hash: string
    version: number
    size: number
    vsize: number
    weight: number
    locktime: number
    vin: Vin[]
    vout: Vout[]
    hex: string
    fee?: number
}
