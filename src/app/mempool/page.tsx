'use server'
import Client from "@/app/mempool/client";
import {getmempoolinfo, getRawmempool} from "@/api/api";
import {RawmempoolTx} from "@/models/mempool";

export default async function Page() {

  const mempoolinfo = await getmempoolinfo()
  const rawMempool = await getRawmempool(true)
  const data: [string: RawmempoolTx] = rawMempool.result as [string: RawmempoolTx];
  const temp_txs: RawmempoolTx[] = []
  Object.entries(data).forEach(([k, v]) => {
    v.txid_key = k
    temp_txs.push(v)
  })
  temp_txs.sort((a, b) => b.time - a.time);

  // await new Promise(resolve => setTimeout(resolve, 5000));
  return (
    <>
      <Client mempoolinfo={mempoolinfo} txs={temp_txs} />
    </>
  );
}