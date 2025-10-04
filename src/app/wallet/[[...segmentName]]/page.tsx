'use server'

import {
  listWallets,
  listWalletDir, loadWallet, unloadWallet
} from "@/api/api";
import WalletHome from "@/app/wallet/[[...segmentName]]/wallet-home";

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

  for (const item of listLoaded.result) {
    await unloadWallet(item);
  }
  listLoaded = await listWallets()
  if (names.includes(slug)) {
    name = slug
    if (listLoaded.result.includes(slug)) {
    } else {
      await loadWallet(slug);
    }
  }

  return (
    <>
      {name !== null &&
        <>
          <WalletHome/>
        </>
      }
      {name === null &&
        <p>Wallet does not exist</p>
      }
    </>
  );
}