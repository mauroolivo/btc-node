"use client";

import React from "react";
import WalletUtxoSelect from "@/app/wallet/[[...segmentName]]/(send)/wallet-utxo-select";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import WalletUtxoData from "@/app/wallet/[[...segmentName]]/(send)/wallet-utxo-data";
enum Step {
  SELECT_UTXO,
  DATA,
}

export default function WalletSendUtxo() {
  const [step, setStep] = useState<Step>(Step.SELECT_UTXO);
  const [selected, setSelected] = useState<{ txid: string; vout: number }[]>([]);

  const handleSelect = (txid: string, vout: number) => {
    setSelected(prev => {
      const exists = prev.some(item => item.txid === txid && item.vout === vout);
      return exists
        ? prev.filter(item => !(item.txid === txid && item.vout === vout))
        : [...prev, { txid, vout }];
    });
  };

  const isSelected = (txid: string, vout: number) =>
    selected.some(item => item.txid === txid && item.vout === vout);

  function nav(): React.JSX.Element {
    if (step === Step.SELECT_UTXO) {
      return (<Button type="submit" onClick={() => { setStep(Step.DATA) }} disabled={selected.length === 0}>Next</Button>)
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
      return <WalletUtxoData />;
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
