"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button"

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
      <div key={idx+1}>{name(idx, item)} <Button onClick={() => onWalletSelectAction(item)}>Select</Button></div>
    );
    return (<div>{list_items}</div>)
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>Change Wallet</AlertDialogTrigger>
        <AlertDialogContent className={"bg-black"}>
          <AlertDialogHeader>
            <AlertDialogTitle>Select your wallet</AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
            {wallets()}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/*<AlertDialogAction>Continue</AlertDialogAction>*/}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
