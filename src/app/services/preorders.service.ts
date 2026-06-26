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


}