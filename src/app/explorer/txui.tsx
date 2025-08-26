'use client'
import {TxResponse} from "@/models/tx";
import {toDateString} from "@/util/util";

import {
  Button,
  Table,
  TableBody, TableCell,
  TableRow
} from "flowbite-react";

export default function TxUI({response, onBlockAction}: {
  response: TxResponse,
  onBlockAction: (arg: string) => void
}) {


  return (
    <>
      {response &&
        <>
          <div className="overflow-x-auto">
            <Table className="">
              <TableBody className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="txui-cell-lbl">
                    TxId
                  </TableCell>
                  <TableCell className="txui-cell-value">{response.result.txid}</TableCell>
                </TableRow>
                <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="txui-cell-lbl">
                    Confirmations
                  </TableCell>
                  <TableCell className="txui-cell-value">
                    {response.result.confirmations}
                  </TableCell>
                </TableRow>
                <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="txui-cell-lbl">
                    Block hash
                  </TableCell>
                  <TableCell className="txui-cell-value">
                    <Button
                      onClick={() => onBlockAction(response.result.blockhash)}>{response.result.blockhash}</Button>
                  </TableCell>
                </TableRow>
                <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="txui-cell-lbl">
                    Block time
                  </TableCell>
                  <TableCell className="txui-cell-value">
                    {toDateString(response.result.time)}
                  </TableCell>
                </TableRow>
                <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="txui-cell-lbl">
                    Size
                  </TableCell>
                  <TableCell className="txui-cell-value">
                    {response.result.size} B
                  </TableCell>
                </TableRow>
                <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="txui-cell-lbl">
                    Tx hash (wTxid)
                  </TableCell>
                  <TableCell className="txui-cell-value">
                    {response.result.hash}
                  </TableCell>
                </TableRow>
                <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="txui-cell-lbl">
                    version
                  </TableCell>
                  <TableCell className="txui-cell-value">
                    {response.result.version}
                  </TableCell>
                </TableRow>
                <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="txui-cell-lbl">
                    vsize
                  </TableCell>
                  <TableCell className="txui-cell-value">
                    {response.result.vsize}
                  </TableCell>
                </TableRow>
                <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="txui-cell-lbl">
                    Weight
                  </TableCell>
                  <TableCell className="txui-cell-value">
                    {response.result.weight}
                  </TableCell>
                </TableRow>
                <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="txui-cell-lbl">
                    Locktime
                  </TableCell>
                  <TableCell className="txui-cell-value">
                    {response.result.locktime}
                  </TableCell>
                </TableRow>
                <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="txui-cell-lbl">
                    Hex
                  </TableCell>
                  <TableCell className="txui-cell-value break-words">
                    {response.result.hex.substring(0, 40) + "... "
                    }
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </>
      }
    </>
  )
}
