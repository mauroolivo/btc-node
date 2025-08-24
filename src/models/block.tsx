/*
export interface Block {
    jsonrpc: string
    result: Result
    id: string
}

export interface Result {
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
    tx: Tx[]
}

export interface Tx {
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

export interface Vin {
    coinbase?: string
    txinwitness: string[]
    sequence: number
    txid?: string
    vout?: number
    scriptSig?: ScriptSig
}

export interface ScriptSig {
    asm: string
    hex: string
}

export interface Vout {
    value: number
    n: number
    scriptPubKey: ScriptPubKey
}

export interface ScriptPubKey {
    asm: string
    desc: string
    hex: string
    address?: string
    type: string
}

 */
