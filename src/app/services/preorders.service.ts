/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICreatePreorder } from "@/interface/preorders.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const preordersService = {

    // ** create preorders
    createPreorders: async (payload: ICreatePreorder) => {
        try {
            const url = new URL(`${API_URL}/preorder`);
            const res = await fetch(url.toString(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
            })
            const data = await res.json();
            return {
                success: res.ok,
                data: res.ok ? data : null,
                error: res.ok ? null : { message: data.message || "Failed to create preorder" },
            };
        }
        catch (err) {
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },

    // ** get all preorders
    getAllPreorders: async (params?: {
        status?: string;
        search?: string;
        page?: number;
        sortBy?: string;
        sortOrder?: string;
    }) => {
        try {
            const url = new URL(`${API_URL}/preorder`);

            if (params?.status)
                url.searchParams.append(
                    "status",
                    params.status
                );

            if (params?.search)
                url.searchParams.append(
                    "search",
                    params.search
                );

            if (params?.page)
                url.searchParams.append(
                    "page",
                    String(params.page)
                );

            if (params?.sortBy)
                url.searchParams.append(
                    "sortBy",
                    params.sortBy
                );

            if (params?.sortOrder)
                url.searchParams.append(
                    "sortOrder",
                    params.sortOrder
                );

            const res = await fetch(
                url.toString(),
                {
                    method: "GET",
                    cache: "no-store",
                }
            );

            const data = await res.json();

            return {
                success: res.ok,
                data: res.ok ? data : null,
                error: res.ok
                    ? null
                    : { message: data.message },
            };
        } catch (err: any) {
            return {
                data: null,
                error: {
                    message: err.message,
                },
            };
        }
    }

}