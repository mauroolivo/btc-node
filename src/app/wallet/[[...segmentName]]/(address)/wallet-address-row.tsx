"use client";
import React from "react";

import {ChevronRight} from "lucide-react";

export default function WalletAddressRow({address}: {
  address: unknown[]
}) {

  return (
    <>
      <div className="m-1 p-2">
        <div className="flex justify-between items-center">
          <div>
            <div>{address[1] as string}</div>
            <div>{address[0] as string}</div>
          </div>
          <ChevronRight />
        </div>
      </div>
    </>
  );
}
