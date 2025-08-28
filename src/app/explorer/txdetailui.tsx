'use client'
import {ScriptSig, TxResponse, Vin} from "@/models/tx";

export default function TxDetailUI({response}: {
  response: TxResponse,
}) {

  function scriptsig(input: Vin): string {
    if (input.scriptSig !== undefined) {
      return input.scriptSig.asm
    }
    return ""
  }

  function outputs(): React.JSX.Element {
    console.log(response.result.vout)
    const list_items = response.result.vout.map((input, idx) =>
      <div key={idx} className="w-full  mb-2">
        <div className="w-full text-center font-bold font-mono">Output #{idx}</div>
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
    console.log(response.result.vin)
    const list_items = response.result.vin.map((input, idx) =>
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
            script sig
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
        response &&
        <>
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
