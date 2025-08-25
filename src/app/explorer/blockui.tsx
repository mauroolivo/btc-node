'use client'

import {toDateString} from "@/util/util";

import {
    Button,
    Table,
    TableBody, TableCell,
    TableRow
} from "flowbite-react";
import {BlockResponse} from "@/models/block";
import {useState} from "react";

export default function BlockUI({response, onBlockAction}: {response: BlockResponse, onBlockAction: (arg: string) => void}) {

    const [more, setMore] = useState<boolean>(false)
    return (
        <>
            {response &&
                <>
                    <div className="overflow-x-auto pb-10">
                        <Table className="transition-all">
                            <TableBody className="divide-y">
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="txui-cell-lbl">
                                        Block hash
                                    </TableCell>
                                    <TableCell className="txui-cell-value">{response.result.hash}</TableCell>
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
                                        Block height
                                    </TableCell>
                                    <TableCell className="txui-cell-value">
                                        {response.result.height}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="txui-cell-lbl">
                                        time
                                    </TableCell>
                                    <TableCell className="txui-cell-value">
                                        {toDateString(response.result.time)}
                                    </TableCell>
                                </TableRow>
                                <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="txui-cell-lbl">
                                        Previous block
                                    </TableCell>
                                    <TableCell className="txui-cell-value">
                                        <Button onClick={ () => onBlockAction(response.result.previousblockhash) }>{response.result.previousblockhash}</Button>

                                    </TableCell>
                                </TableRow>
                                <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="txui-cell-lbl">
                                        Next block
                                    </TableCell>
                                    <TableCell className="txui-cell-value">
                                        <Button onClick={ () => onBlockAction(response.result.nextblockhash) }>{response.result.nextblockhash}</Button>
                                    </TableCell>
                                </TableRow>
                                { more &&
                                    <>
                                    <TableRow className="dark:border-gray-700 dark:bg-gray-800 transition-all">
                                        <TableCell className="txui-cell-lbl">
                                            version
                                        </TableCell>
                                        <TableCell className="txui-cell-value">
                                            {response.result.versionHex + " (" +response.result.version + ")"}
                                        </TableCell>
                                    </TableRow>

                                <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="txui-cell-lbl">
                                        merkleroot
                                    </TableCell>
                                    <TableCell className="txui-cell-value">
                                        {response.result.merkleroot}
                                    </TableCell>
                                </TableRow>
                                        <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                                            <TableCell className="txui-cell-lbl">
                                                nonce
                                            </TableCell>
                                            <TableCell className="txui-cell-value">
                                                {response.result.nonce}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                                            <TableCell className="txui-cell-lbl">
                                                bits
                                            </TableCell>
                                            <TableCell className="txui-cell-value">
                                                {response.result.bits}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                                            <TableCell className="txui-cell-lbl">
                                                difficulty
                                            </TableCell>
                                            <TableCell className="txui-cell-value">
                                                {response.result.difficulty}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                                            <TableCell className="txui-cell-lbl">
                                                strippedsize
                                            </TableCell>
                                            <TableCell className="txui-cell-value">
                                                {response.result.strippedsize}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                                            <TableCell className="txui-cell-lbl">
                                                size
                                            </TableCell>
                                            <TableCell className="txui-cell-value">
                                                {response.result.size}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                                            <TableCell className="txui-cell-lbl">
                                                weight
                                            </TableCell>
                                            <TableCell className="txui-cell-value">
                                                {response.result.weight}
                                            </TableCell>
                                        </TableRow>
                                    </>
                        }
                                <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="txui-cell-lbl">
                                        Transactions number
                                    </TableCell>
                                    <TableCell className="txui-cell-value">
                                        {response.result.nTx}
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                        <div className="float-right inline-flex gap-2">
                            { !more && <Button onClick={ () => {setMore(true)} }>More</Button> }
                            { more && <Button onClick={ () => {setMore(false)} }>Less</Button> }
                            <Button onClick={ () => {setMore(false)} }>show transactions</Button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
