"use client";


import React from "react";

import WalletDescriptorsGetInfo from "@/app/wallet/wallet-descriptors-get-info";
import WalletDescriptorsDeriveAddress from "@/app/wallet/wallet-descriptors-derive-address";


export default function WalletDescriptors() {


  return (
    <>
      <WalletDescriptorsGetInfo />
      <WalletDescriptorsDeriveAddress />
    </>
  );
}
