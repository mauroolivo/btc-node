'use client'

import {getWalletInfo, listWallets, listTxs, listUnspent, getUnconfirmedbalance, fetcher} from "@/api/api";
import WalletSelect from "@/app/wallet/wallet-select";
import {cookies} from 'next/headers'
import {AddressInfoResponse, ListWalletDirResponse, WalletInfoResponse} from "@/models/wallet";
import WalletHome from "@/app/wallet/wallet-home";
import useSWR from "swr";
import {useState} from "react";
import {Button} from "flowbite-react";

export default function Page() {

  // const wallets = await listWallets()
  // const tsx = await listTxs()
  // const utxo = await listUnspent()
  // const unconfirmedBalance = await getUnconfirmedbalance()
  const [name, setName] = useState<string | null>(null)
  const {data, error, isLoading} = useSWR<ListWalletDirResponse>(
    [
      "listwalletdir",
      [],
    ]
    ,
    ([m, p]: [string, (string | boolean | number)[]]) => fetcher(m, p)
  );

  function handleWalletSelect(name: string) {
    setName(name)
  }

  console.log(data?.result.wallets)
  // let walletInfo: WalletInfoResponse | null = null
  // console.log("Available Wallets: " + wallets.result.map((name) => name === "" ? "default wallet" : name).join(", "))
  // let show = true
  // const cookieStore = await cookies()
  // const walletName = cookieStore.get('wallet-name')
  // if (walletName?.value != undefined) {
  //   console.log("Current Wallet: " + walletName?.value)
  //   show = false
  //   walletInfo = await getWalletInfo()
  // } else {
  //   console.log("No wallet selected")
  // }

  return (
    <>
      {name !== null &&
        <>
          <p>Loaded wallet: {name}</p>
          <Button onClick={() => {
            setName(null)
          }}>Change Wallet</Button>

          <WalletHome/>
          {/*// <WalletHome walletInfo={walletInfo} txs={tsx.result} utxos={utxo.result} unconfBal={unconfirmedBalance.result} />*/}
        </>
      }
      <WalletSelect show={name === null} walletResponse={data} onWalletSelect={handleWalletSelect}/>
    </>
  );
}