"use client";

import {ListAddressResponse} from "@/models/wallet";
import {fetcher} from "@/api/api";
import React from "react";
import {Button} from "flowbite-react";

;
import useSWR, {mutate} from "swr";
import WalletAddressNew from "@/app/wallet/wallet-address-new";
import WalletAddressC from "@/app/wallet/wallet-address-c";
import WalletUTXOC from "@/app/wallet/wallet-utxo-c";

export default function WalletAddresses() {
  const [show, setShow] = React.useState(false);
  // const [shouldFetch, setShouldFetch] = React.useState(false);
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const {data, error, isLoading} = useSWR<ListAddressResponse>(
    shouldFetch
      ? [
        "listaddressgroupings",
        [],
      ]
      : null,
    ([m, p]: [string, (string | boolean | number)[]]) => fetcher(m, p)
  );

  function hadleDismiss() {
    // mutate(["listaddressgroupings", []]);
    setShow(false);
  }

  function addresses(): React.JSX.Element {
    const list_items: unknown[] = [];
    if (error) return <div>Failed to load addresses</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;
    if (data.result.length == 0) {
      return <div>No addresses in this wallet</div>
    } else {
      if (data.result.length > 0) {
        for (const [idx, groups] of data.result.entries()) {
          if (groups.length > 0) {
            for (const [, address] of groups.entries()) {
              list_items.push(<div key={idx}>
                <WalletAddressC address={address}/>
              </div>)
            }
          }
        }
      }
    }
    return <>{list_items}</>;
  }

  return (
    <>
      {/*<Button onClick={() => setShouldFetch(true)}>Fetch</Button>*/}
      {/*<Button onClick={() => mutate(["listaddressgroupings", []])}>Refresh</Button>*/}
      <Button onClick={() => setShow(true)}>New Address</Button>
      <div className="param-title text-center">Addresses</div>
      {addresses()}
      <WalletAddressNew show={show} onDismiss={hadleDismiss}/>
    </>
  );
}
