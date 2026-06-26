"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
    page: number;
    limit: number;
    total: number;
}

export default function PreordersPagination({
    page,
    limit,
    total,
}: PaginationProps) {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const totalPages = Math.ceil(total / limit);

    console.log(total)

    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    const updatePage = (newPage: number) => {
        const params = new URLSearchParams(
            searchParams.toString()
        );

        params.set("page", String(newPage));

        router.push(
            `${pathname}?${params.toString()}`
        );
    };

    return (
        <div className="flex items-center justify-between gap-5 border-t px-4 py-4">
            <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => updatePage(page - 1)}
            >
                Previous
            </Button>

            <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium">
                    {start}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                    {end}
                </span>{" "}
                from{" "}
                <span className="font-medium">
                    {total}
                </span>{" "}
                
            </p>

            <Button
                variant="outline"
                disabled={false}
                onClick={() => updatePage(page + 1)}
            >
                Next
            </Button>
        </div>
    );
}