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
import { preordersService } from "@/app/services/preorders.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Preorder {
    id: string;
    name: string;
    products: number;
    preorderWhen: string;
    startsAt: string;
    endsAt: string | null;
    status: string;
    slug: string
}

interface Props {
    preorderData: Preorder[];
    metaData: any
}

export default function PreordersList({
    preorderData,
    metaData,
}: Props) {

    const router = useRouter();

    const [preorders, setPreorders] = useState(preorderData);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    useEffect(() => {
        setPreorders(preorderData);
    }, [preorderData]);


    // ** Delete provider
    const deletePreorder = async (id: string) => {
        try {
            const res = await preordersService.deletePreorder(id);

            if (res.success) {
                setPreorders((prev) =>
                    prev.filter((item) => item.id !== id)
                );

                toast.success("Preorder deleted successfully");
            } else {
                toast.error(
                    res.error?.message || "Failed to delete preorder"
                );
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    // ** Update status
    const handleStatusChange = async (
        id: string,
        checked: boolean
    ) => {
        try {
            setLoadingId(id);

            const status = checked
                ? "Active"
                : "Inactive";

            await preordersService.updateStatus(
                id,
                status
            );

            toast.success(
                `Status updated to ${status}`
            );

            router.refresh();
        } catch {
            toast.error(
                "Failed to update status"
            );
        } finally {
            setLoadingId(null);
        }
    };

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
                    {preorders?.length > 0 ? (
                        preorders.map((item) => (
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
                                    {new Date(item.startsAt).toLocaleString()}
                                </TableCell>

                                <TableCell>
                                    {item.endsAt
                                        ? new Date(item.endsAt).toLocaleString()
                                        : "-"}
                                </TableCell>

                                <TableCell>
                                    <Switch
                                        checked={item.status === "Active"}
                                        disabled={loadingId === item.id}
                                        onCheckedChange={(checked) =>
                                            handleStatusChange(
                                                item.id,
                                                checked
                                            )
                                        }
                                    />
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Link href={`/update-preorder/${item.slug}`}>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>

                                        <Button
                                            onClick={() =>
                                                deletePreorder(item.id)
                                            }
                                            size="icon"
                                            variant="outline"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                className="h-24 text-center text-muted-foreground text-red-400"
                            >
                                No preorders data!
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>

            {/* Footer */}
            <div className="flex items-center justify-center gap-4 border-t p-4">
                <PreordersPagination
                    page={metaData?.page}
                    limit={metaData?.limit}
                    total={metaData?.totalPage}
                />
            </div>
        </div>
    );
}