'use server'

import {getWalletInfo, listWallets} from "@/api/api";
import WalletSelect from "@/app/wallet/wallet-select";
import { cookies } from 'next/headers'
import {WalletInfo, WalletInfoResult} from "@/models/wallet";
import WalletHome from "@/app/wallet/wallet-home";

export async function createPost() {}

export async function selectWallet(formData: FormData) {
  const walletName = formData.get('wallet-name')
  const cookieStore = await cookies()
  if (walletName != null) {
     cookieStore.set('wallet-name', walletName.toString())
   }
}

export default async function Page() {

  const list = await listWallets()
  let walletInfo: WalletInfo | null = null
  console.log("Available Wallets: " + list.result.map((name) => name === "" ? "default wallet" : name).join(", "))
  let show = true
  const cookieStore = await cookies()
  const walletName = cookieStore.get('wallet-name')
  if (walletName?.value != undefined) {
    console.log("Current Wallet: " + walletName?.value)
    show = false
    walletInfo = await getWalletInfo()
  } else {
    console.log("No wallet selected")
  }

  return (
    <>
      {walletInfo &&
        <WalletHome walletInfo={walletInfo} />
      }
      <WalletSelect show={show} wallets={list.result} />
    </>
  );
}