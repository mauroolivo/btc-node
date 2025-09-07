'use server'

import {listWallets} from "@/api/api";
import WalletSelect from "@/app/wallet/wallet-select";
import { cookies } from 'next/headers'

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

  console.log("Available Wallets: " + list.toString())
  let show = true
  const cookieStore = await cookies()
  const walletName = cookieStore.get('wallet-name')
  if (walletName?.value != undefined) {
    console.log("Current Wallet: " + walletName?.value)
    show = false
  } else {
    console.log("No wallet selected")
  }

  return (
    <>
      <WalletSelect show={show} wallets={list.result} />
    </>
  );
}