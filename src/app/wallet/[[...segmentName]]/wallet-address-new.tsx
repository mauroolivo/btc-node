"use client";

import {Button} from "@/components/ui/button"
import React from "react";
import useSWR, {mutate} from "swr";
import {ListAddressResponse, NewAddressResponse} from "@/models/wallet";
import {fetcher} from "@/api/api";
import {ParamsDictionary} from "@/models/api";

export default function WalletAddressNew() {

  const avail_items = ["legacy", "p2sh-segwit", "bech32", "bech32m"]
  const [addressType, setAddressType] = React.useState("no-value");

  const [shouldFetch, setShouldFetch] = React.useState(false);
  const [newAddress, setNewAddress] = React.useState("");
  const {data, error, isLoading} = useSWR<NewAddressResponse>(
    shouldFetch
      ? [
        "getnewaddress",
        ["", addressType],
      ]
      : null,
    ([m, p]: [string, ParamsDictionary]) => fetcher(m, p)
  );
  if (data?.result !== undefined) {
    setNewAddress(data.result)
    setShouldFetch(false);
  }

  function select(): React.JSX.Element {
    const list_items = avail_items.map((name, idx) =>
      <option key={idx + 1} value={name}>{name}</option>
    );
    const list = [<option key={0} value="no-value">-- select address type --</option>].concat(list_items)
    return (<select onChange={e => {
      setAddressType(e.currentTarget.value)
    }} name={'address-type'}>{list}</select>)
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
    // onGenerate();

    console.log(walletType);
  }

  console.log(newAddress)
  return (
    <>
      {
        newAddress &&
        <>
          <h3>{newAddress}</h3>
          <button
            onClick={() => navigator.clipboard.writeText(newAddress)}>
            Copy
          </button>
        </>
      }
      <form onSubmit={onSubmit}>
        {select()}
        <Button type="submit" disabled={addressType === "no-value"}>Generate</Button>
      </form>
    </>
  );
}
