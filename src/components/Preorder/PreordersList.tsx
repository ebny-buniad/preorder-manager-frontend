/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import PreorderFilters from "./PreorderFilters";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import PreordersPagination from "./PreorderPagination";

interface Preorder {
    id: string;
    name: string;
    products: number;
    preorderWhen: string;
    startsAt: string;
    endsAt: string | null;
    status: string;
}

interface Props {
    preorderData: Preorder[];
    metaData: any
}

export default function PreordersList({
    preorderData, metaData
}: Props) {


    console.log(metaData)


    // Delete preorder function 
    const deletePreorder = (id: string) => {

    }

    return (
        <div className="overflow-hidden rounded-xl border bg-background mt-5">
            {/* Header */}
            <PreorderFilters />

            {/* Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">
                            <Checkbox />
                        </TableHead>

                        <TableHead>Name</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Preorder When</TableHead>
                        <TableHead>Starts At</TableHead>
                        <TableHead>Ends At</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-30"> Actions </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {preorderData?.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Checkbox />
                            </TableCell>

                            <TableCell className="font-medium">
                                {item.name}
                            </TableCell>

                            <TableCell>
                                {item.products}
                            </TableCell>

                            <TableCell>
                                {item.preorderWhen}
                            </TableCell>

                            <TableCell>
                                {new Date(
                                    item.startsAt
                                ).toLocaleString()}
                            </TableCell>

                            <TableCell>
                                {item.endsAt
                                    ? new Date(
                                        item.endsAt
                                    ).toLocaleString()
                                    : "-"}
                            </TableCell>

                            <TableCell>
                                <Switch
                                    checked={
                                        item.status === "Active"
                                    }
                                />
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button size="icon" variant="outline" >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="outline" >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>

            {
                preorderData.length === 0 && <>
                    <p className="text-center py-10 text-red-400 text-xs">No preorders data!</p>
                </>
            }

            {/* Footer */}
            <div className="flex items-center justify-center gap-4 border-t p-4">
                <PreordersPagination
                    page={metaData.page}
                    limit={metaData?.limit}
                    total={metaData.totalPage}
                />
            </div>
        </div>
    );
}