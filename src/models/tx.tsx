export interface TxResponse {
    jsonrpc: string
    result: TxResult
    id: string
}
export interface TxResult {
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
    blockhash: string
    confirmations: number
    time: number
    blocktime: number
}
export interface Vin {
    txid: string
    vout: number
    scriptSig: ScriptSig
    txinwitness: string[]
    sequence: number
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
    address: string
    type: string
}
