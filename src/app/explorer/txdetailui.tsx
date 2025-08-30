'use client'
import {ScriptSig, TxResult, Vin} from "@/models/tx";

export default function TxDetailUI({result, onTxAction}: {
  result: TxResult,
  onTxAction: (arg: string) => void
}) {

  function scriptsig(input: Vin): string {
    if (input.scriptSig !== undefined) {
      return input.scriptSig.asm
    }
    return ""
  }
  function onTxDetailAction(arg: string) {
    onTxAction(arg)
  }
  function outputs(): React.JSX.Element {
    const list_items = result.vout.map((input, idx) =>
      <div key={idx} className="w-full  mb-2">
        <div className="w-full text-center font-bold">Output #{idx}</div>
        <div className="param-box">
          <div className="param-key">
            value
          </div>
          <div className="param-value">
            {input.value}
          </div>
        </div>
        <div className="param-box">
          <div className="param-key">
            number
          </div>
          <div className="param-value">
            {input.n}
          </div>
        </div>
        <div className="param-box">
          <div className="param-key">
            ScriptPubKey ASM
          </div>
          <div className="param-value">
            {input.scriptPubKey.asm}
          </div>
        </div>
        <div className="param-box">
          <div className="param-key">
            Type
          </div>
          <div className="param-value">
            {input.scriptPubKey.type}
          </div>
        </div>
      </div>
    );
    return (<>{list_items}</>)
  }

  function inputs(): React.JSX.Element {
    console.log(result.vin)
    const list_items = result.vin.map((input, idx) =>
      <div key={idx} className="w-full  mb-2">
        <div className="w-full text-center font-bold font-mono">Input #{idx}</div>
        <div className="param-box">
          <div className="param-key">
            Coinbase
          </div>
          <div className="param-value">
            {input.coinbase}
          </div>
        </div>
        <div className="param-box">
          <div className="param-key">
            TxId
          </div>
          <div className="param-value">
            {input.txid}
          </div>
        </div>
        <div className="param-box">
          <div className="param-key">
            vout
          </div>
          <div className="param-value">
            {input.vout}
          </div>
        </div>
        <div className="param-box">
          <div className="param-key">
            ScriptSig
          </div>
          <div className="param-value">
            {scriptsig(input)}
          </div>
        </div>
        <div className="param-box">
          <div className="param-key">
            witness
          </div>
          <div className="param-value">
            {input.txinwitness}
          </div>
        </div>
        <div className="param-box">
          <div className="param-key">
            sequence
          </div>
          <div className="param-value">
            {input.sequence}
          </div>
        </div>
      </div>
    );
    return (<>{list_items}</>)
  }

  return (
    <>
      {
        result &&
        <>
          <div className="w-full grid justify-items-center font-mono">
            <div className="underline hover:no-underline hover:cursor-pointer" onClick={() => onTxDetailAction(result.txid)}>{result.txid}</div>
            </div>
          <div className="w-full justify-center md:flex-none lg:flex lg:gap-20 ">
            <div className="md:w-full lg:w-14 grow">
              {inputs()}
            </div>
            {/*<div className="w-14 flex-none">02</div>*/}
            <div className="md:w-full lg:w-14 grow">
              {outputs()}
            </div>
          </div>
        </>
      }
    </>
  )
}
