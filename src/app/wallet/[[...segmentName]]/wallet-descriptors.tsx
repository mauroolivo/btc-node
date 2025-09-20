"use client";


import React from "react";

import WalletDescriptorsGetInfo from "@/app/wallet/[[...segmentName]]/wallet-descriptors-get-info";
import WalletDescriptorsDeriveAddress from "@/app/wallet/[[...segmentName]]/wallet-descriptors-derive-address";


export default function WalletDescriptors() {


  return (
    <>
      <WalletDescriptorsGetInfo />
      <WalletDescriptorsDeriveAddress />
    </>
  );
}
