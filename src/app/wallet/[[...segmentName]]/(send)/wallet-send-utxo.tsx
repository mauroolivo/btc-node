"use client";

import React from "react";
import WalletUtxoSelect from "@/app/wallet/[[...segmentName]]/(send)/wallet-utxo-select";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import WalletUtxoData from "@/app/wallet/[[...segmentName]]/(send)/wallet-utxo-data";
import {getRawChangeAddress, sendRawTransaction, signRawTransactionWithWallet} from "@/api/api";
import {ParamsDictionary} from "@/models/api";
enum Step {
  SELECT_UTXO,
  DATA,
}

export default function WalletSendUtxo() {
  const [step, setStep] = useState<Step>(Step.SELECT_UTXO);
  const [selected, setSelected] = useState<{ txid: string; vout: number, amount: number}[]>([]);
  const [changeAddress, setChangeAddress] = useState<string | undefined>(undefined);
  const handleSelect = (txid: string, vout: number, amount: number) => {
    setSelected(prev => {
      const exists = prev.some(item => item.txid === txid && item.vout === vout);
      return exists
        ? prev.filter(item => !(item.txid === txid && item.vout === vout))
        : [...prev, { txid, vout, amount }];
    });
  };

  const isSelected = (txid: string, vout: number, amount: number) =>
    selected.some(item => item.txid === txid && item.vout === vout);

  async function getAddress(): Promise<string | null> {
    try {
      const changeAddressResponse = await getRawChangeAddress();
      const address = changeAddressResponse.result;
      console.log("change address:", address);
      if(address !== null && address !== undefined) {
        return address;
      } else {
        console.log("no change address");
        return null;
      }
    } catch (err) {
      console.error("Change address error:", err);
      return null;
    }
  }

  function nav(): React.JSX.Element {
    if (step === Step.SELECT_UTXO) {
      return (<Button type="submit" onClick={() => {
        getAddress().then(address => {

          if(address !== null && address !== undefined) {
            console.log("address:", address);
            setChangeAddress(address);
            setStep(Step.DATA);
          }
        })
        }
      } disabled={selected.length === 0}>Next</Button>)
    } else if (step === Step.DATA) {
      return (<Button type="submit" onClick={() => { setStep(Step.SELECT_UTXO) }} disabled={false}>Back</Button>)
    } else {
      return (<></>);
    }
  }
  function content(): React.JSX.Element {
    if (step === Step.SELECT_UTXO) {
      return <WalletUtxoSelect
        selected={selected}
        handleSelect={handleSelect}
        isSelected={isSelected}
      />;
    } else if (step === Step.DATA) {
      if(changeAddress) {
        return <WalletUtxoData selected={selected} changeAddress={changeAddress} />;
      } else {
        return <>ppp</>
      }
    } else {
      return <div>Unknown Step</div>;
      }
  }

  return (
    <>
      <div className="flex justify-end">
        { nav() }
      </div>
      { content() }
    </>
  );
}
