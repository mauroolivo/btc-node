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

      <div key={idx} className="w-full bg-gray-950 mb-4 p-2 border-gray-900 border">
        <div className="w-full text-center font-bold font-mono text-prominent">Input #{idx}</div>

        <div><span className={"param-label"}>Address:</span> <span className={"text-left overflow-auto break-words"}>{input.scriptPubKey.address}</span></div>
        <div><span className={"param-label"}>Value:</span> <span>{input.value}</span></div>
        <div><span className={"param-label"}>Number:</span> <span>{input.n}</span></div>
        <div><span className={"param-label"}>ScriptPubKey ASM:</span> <span className={"text-left overflow-auto break-words"}>{input.scriptPubKey.asm}</span></div>
        <div><span className={"param-label"}>Type:</span> <span>{input.scriptPubKey.type}</span></div>
      </div>
    );
    return (<>{list_items}</>)
  }

  function inputs(): React.JSX.Element {
    console.log(result.vin)
    const list_items = result.vin.map((input, idx) =>
      <div key={idx} className="w-full bg-gray-950 mb-4 p-2 border-gray-900 border">
        <div className="w-full text-center font-bold font-mono text-prominent">Input #{idx}</div>
        <div><span className={"param-label"}>IsCoinbase:</span> <span>{input.coinbase ? "yes" : "no"}</span></div>
        <div><span className={"param-label"}>TxId:</span> <span className={"text-left overflow-auto break-words"}>{input.txid}</span></div>
        <div><span className={"param-label"}>Vout:</span> <span>{input.vout}</span></div>
        <div><span className={"param-label"}>ScriptSig:</span> <span>{scriptsig(input)}</span></div>
        <div><span className={"param-label"}>Witness:</span> <span className={"text-left overflow-auto break-words"}>{input.txinwitness}</span></div>
        <div><span className={"param-label"}>Sequence:</span> <span>{input.sequence}</span></div>
      </div>
    );
    return (<>{list_items}</>)
  }

  return (
    <>
      {
        result &&
        <>
          <div className="w-full grid justify-items-center">
            <div className="underline hover:no-underline hover:cursor-pointer mt-4 mb-4" onClick={() => onTxDetailAction(result.txid)}>{result.txid}</div>
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
