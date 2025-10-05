"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import WalletAddressInfo from "@/app/wallet/[[...segmentName]]/wallet-address-info";
import {ChevronRight} from "lucide-react";

export default function WalletAddressC({address}: {
  address: unknown[]
}) {

  return (
    <>
      <div className="m-1 p-2">
        <div className="flex justify-between items-center">
          <div>
            {address[0] as string}

            <AlertDialog>
              <AlertDialogTrigger>info</AlertDialogTrigger>
              <AlertDialogContent className={" bg-black  min-w-[80%] "}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Address info</AlertDialogTitle>
                  <AlertDialogDescription></AlertDialogDescription>
                  <WalletAddressInfo address={address[0] as string}/>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  {/*<AlertDialogAction>Continue</AlertDialogAction>*/}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>
          <ChevronRight />
        </div>
      </div>

      <div className="w-full justify-center md:flex-none lg:flex lg:gap-20 ">
        <div className="md:w-full lg:w-14 grow">

          <div className="param-box">
            <div className="param-key">

            </div>
            <div className="param-value">
              {address[1] as string}
            </div>
          </div>
          {/*<div className="param-box">*/}
          {/*  <div className="param-key">*/}
          {/*    amount*/}
          {/*  </div>*/}
          {/*  <div className="param-value">*/}
          {/*    {address[1] as string}*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        {/*<div className="md:w-full lg:w-14 grow">*/}
        {/*  */}


        {/*</div>*/}
      </div>
    </>
  );
}
