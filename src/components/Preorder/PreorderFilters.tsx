"use client";

import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import {
    useRouter,
    useSearchParams,
} from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

export default function PreorderFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const status =
        searchParams.get("status") || "all";

    const sortBy =
        searchParams.get("sortBy") ||
        "createdAt";

    const sortOrder =
        searchParams.get("sortOrder") ||
        "desc";

    const updateQuery = (
        key: string,
        value: string
    ) => {
        const params = new URLSearchParams(
            searchParams.toString()
        );

        params.set(key, value);

        router.push(
            `/preorders?${params.toString()}`
        );
    };

    return (
        <div className="flex items-center justify-between border-b p-4">
            <Tabs
                value={status}
                onValueChange={(value) =>
                    updateQuery("status", value)
                }
            >
                <TabsList>
                    <TabsTrigger value="all">
                        All
                    </TabsTrigger>

                    <TabsTrigger value="Active">
                        Active
                    </TabsTrigger>

                    <TabsTrigger value="Inactive">
                        Inactive
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                    >
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-60"
                >
                    <div className="px-2 py-2 text-sm font-semibold">
                        Sort by
                    </div>

                    <RadioGroup
                        value={sortBy}
                        onValueChange={(value) =>
                            updateQuery("sortBy", value)
                        }
                        className="space-y-2"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="name"
                                id="name"
                            />
                            <Label htmlFor="name">
                                Name
                            </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="createdAt"
                                id="createdAt"
                            />
                            <Label htmlFor="createdAt">
                                Created At
                            </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="startsAt"
                                id="startsAt"
                            />
                            <Label htmlFor="startsAt">
                                Starts At
                            </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="endsAt"
                                id="endsAt"
                            />
                            <Label htmlFor="endsAt">
                                Ends At
                            </Label>
                        </div>
                    </RadioGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={() =>
                            updateQuery(
                                "sortOrder",
                                "asc"
                            )
                        }
                    >
                        <ArrowUp className="mr-2 h-4 w-4" />
                        Ascending
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() =>
                            updateQuery(
                                "sortOrder",
                                "desc"
                            )
                        }
                    >
                        <ArrowDown className="mr-2 h-4 w-4" />
                        Descending
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}