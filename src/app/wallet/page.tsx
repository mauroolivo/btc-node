'use server'

import {getWalletInfo, listWallets, listTxs, listUnspent} from "@/api/api";
import WalletSelect from "@/app/wallet/wallet-select";
import { cookies } from 'next/headers'
import {WalletInfoResponse} from "@/models/wallet";
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

  const wallets = await listWallets()
  const tsx = await listTxs()
  const utxo = await listUnspent()
  let walletInfo: WalletInfoResponse | null = null
  console.log("Available Wallets: " + wallets.result.map((name) => name === "" ? "default wallet" : name).join(", "))
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
        <WalletHome walletInfo={walletInfo} txs={tsx.result} utxos={utxo.result} />
      }
      <WalletSelect show={show} wallets={wallets.result} />
    </>
  );
}