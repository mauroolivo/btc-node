"use client";

import { useRouter } from 'next/navigation'
import React from "react";
import WalletSelect from "@/app/wallet/[[...segmentName]]/wallet-select";
import {Button} from "flowbite-react";

export default function WalletCurrent({wallet, wallets}: {
  wallet: string,
  wallets: string[]
}) {
  const [show, setShow] = React.useState(false);
  const router = useRouter();
  function handleWalletSelect(name: string) {
   console.log(name);
    router.push(`/wallet/${name}`)
  }

  return (
    <>
      <p>Loaded wallet: {wallet}</p>
      <Button onClick={() => {
        setShow(true);
      }}>Change Wallet</Button>
      <WalletSelect show={show} names={wallets} onWalletSelectAction={handleWalletSelect}/>
    </>
  );
}
