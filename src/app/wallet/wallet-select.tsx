"use client";
import {Modal, ModalBody} from "flowbite-react";
import {selectWallet} from "@/app/wallet/page";
import {concat} from "recast/lib/lines";

export default function WalletSelect({show, wallets}: {
  show: boolean,
  wallets: string[],
}) {

  function select(): React.JSX.Element {
    const list_items = wallets.map((name, idx) =>
      <option key={idx+1} value={name === "" ? "default wallet" : name}>{name === "" ? "default wallet" : name}</option>
    );
    const list = [<option key={0} value="no-value">-- select wallet --</option>].concat(list_items)
    return (<select name={'wallet-name'}>{list}</select>)
  }
function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const walletName = formData.get('wallet-name');
    if (walletName === "no-value") {
      e.preventDefault();
      alert("Please select a wallet");
    }

}
  return (
    <>
      <Modal show={show}>
        <ModalBody>
          <div className="space-y-6">
            Select a wallet
          </div>
          <form action={selectWallet} onSubmit={onSubmit}>
            {select()}
            <button type="submit">click</button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
