"use client";
import {Button, Modal, ModalBody} from "flowbite-react";
import React from "react";
import useSWR, { mutate } from "swr";
import {ListAddressResponse} from "@/models/wallet";
import {fetcher} from "@/api/api";

export default function WalletAddressNew({show, onDismiss}: {
  show: boolean,
  onDismiss: () => void,
}) {

  const avail_items = ["legacy", "p2sh-segwit", "bech32", "bech32m"]
  const [addressType, setAddressType] = React.useState("no-value");

  function onGenerate() {
    console.log("WalletAddressNew")
    onDismiss()
  }
  const [shouldFetch, setShouldFetch] = React.useState(false);
  const { data, error, isLoading } = useSWR<ListAddressResponse>(
    shouldFetch
      ? [
        "listaddressgroupings",
        [],
      ]
      : null,
    ([m, p]: [string, (string | boolean | number)[]]) => fetcher(m, p)
  );
  function select(): React.JSX.Element {
    const list_items = avail_items.map((name, idx) =>
      <option key={idx+1} value={name}>{name}</option>
    );
    const list = [<option key={0} value="no-value">-- select address type --</option>].concat(list_items)
    return (<select onChange={e => {setAddressType(e.currentTarget.value)}} name={'address-type'}>{list}</select>)
  }
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const walletType = formData.get('address-type');
    setShouldFetch(true);
    if (walletType === "no-value") {
      alert("Please select an address type");
      return;
    }
    onGenerate();

    console.log(walletType);
  }
  return (
    <>
      <Modal show={show}>
        <ModalBody>
          <form onSubmit={onSubmit}>
          <div className="space-y-6">
            Select address type
          </div>

            {select()}
            {/*<button type="submit">click</button>*/}
          <Button type="submit" disabled={addressType === "no-value"}>Generate</Button>

          <Button onClick={onDismiss}>Dismiss</Button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
