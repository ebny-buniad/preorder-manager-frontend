"use client";

import { Button } from "@/components/ui/button";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

interface PaginationProps {
  page?: number;
  limit?: number;
  total?: number;
}

export default function PreordersPagination({
  page = 1,
  limit = 10,
  total = 0,
}: PaginationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(page) || 1;
  const currentLimit = Number(limit) || 10;
  const currentTotal = Number(total) || 0;

  const totalPages = Math.max(
    1,
    Math.ceil(currentTotal / currentLimit)
  );

  const start =
    currentTotal === 0
      ? 0
      : (currentPage - 1) * currentLimit + 1;

  const end = Math.min(
    currentPage * currentLimit,
    currentTotal
  );

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
        disabled={currentPage <= 1}
        onClick={() =>
          updatePage(currentPage - 1)
        }
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
          {currentTotal}
        </span>
      </p>

      <Button
        variant="outline"
        onClick={() =>
          updatePage(currentPage + 1)
        }
      >
        Next
      </Button>
    </div>
  );
}