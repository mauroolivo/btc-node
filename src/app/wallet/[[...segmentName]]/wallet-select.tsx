"use client";
import {Button, Modal, ModalBody} from "flowbite-react";

import {ListWalletDirResponse} from "@/models/wallet";
import React from "react";

export default function WalletSelect({show, names, onWalletSelectAction}: {
  show: boolean,
  names: string[],
  onWalletSelectAction: (name: string) => void
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
    const list_items = names.map((item, idx) =>
      <div key={idx+1}>{name(idx, item)}<Button onClick={() => onWalletSelectAction(item)}>Select</Button></div>
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
