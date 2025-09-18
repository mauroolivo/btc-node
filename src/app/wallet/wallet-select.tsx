"use client";
import {Button, Modal, ModalBody} from "flowbite-react";

import {ListWalletDirResponse} from "@/models/wallet";
import React from "react";

export default function WalletSelect({show, walletResponse, onWalletSelect}: {
  show: boolean,
  walletResponse: ListWalletDirResponse | undefined,
  onWalletSelect: (name: string) => void
}) {

  function name(idx: number, str: string) {
    const pref = `${idx+1}. `
    if (str === "") {
      return pref + "default no name";
    } else {
      return pref + str;
    }
  }
  function wallets(): React.JSX.Element {
    const list_items = walletResponse?.result.wallets.map((item, idx) =>
      <div key={idx+1}>{name(idx, item.name)}<Button onClick={() => onWalletSelect(name(idx, item.name))}>Select</Button></div>
    );
    return (<div>{list_items}</div>)
  }
  return (
    <>
      <Modal show={show}>
        <ModalBody>
          <div className="space-y-6">
            Load a wallet
          </div>
          {wallets()}
        </ModalBody>
      </Modal>
    </>
  );
}
