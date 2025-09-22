'use server'

import {
  listWallets,
  listWalletDir, loadWallet, unloadWallet
} from "@/api/api";
import WalletHome from "@/app/wallet/[[...segmentName]]/wallet-home";

import WalletCurrent from "@/app/wallet/[[...segmentName]]/wallet-current";

export default async function Page({params}: {
  params: Promise<{ segmentName: string }>
}) {

  const {segmentName} = await params
  let slug = ""
  if (segmentName !== undefined && segmentName.length === 1) {
    slug = segmentName[0]
  }
  const listDir = await listWalletDir()
  let listLoaded = await listWallets()

  let name: string | null = null

  const names = listDir.result.wallets.map((item) => {
    return item.name
  })

  console.log("loaded" + listLoaded.result.length + "loaded")


  console.log(listLoaded.result)
  for (const item of listLoaded.result) {
    console.log("ITEM TO UNLOAD " + item)
    let rs = await unloadWallet(item)
    console.log(rs)
  }
  listLoaded = await listWallets()
  console.log("loaded after unload: " + listLoaded.result.length)
  if (names.includes(slug)) {
    name = slug
    console.log("NAME" + name)
    if (listLoaded.result.includes(slug)) {
      console.log("NEVER HERE")
    } else {
      let rs = await loadWallet(slug)
      console.log("LOADING ", listLoaded.result, slug, rs)
    }
  }

  console.log(listDir.result)
  console.log("loaded" + listLoaded.result.length + "loaded")

  async function handleWalletSelect(name: string) {
    'use server'
    console.log(name)
    // ...
  }

  return (
    <>
      {name !== null &&
        <>
          <WalletCurrent wallet={name} wallets={names}/>
          <WalletHome/>
        </>
      }
      {name === null &&
        <p>Wallet does not exist</p>
      }

    </>
  );
}