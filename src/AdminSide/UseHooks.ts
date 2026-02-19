import { useEffect, useState } from "react";
import { ORDER_LISTING_APIS, type Order } from "../libs/api/admin.orders.api";

export const adminside = (offset = 0, limit = 10, status?: string) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await ORDER_LISTING_APIS.orderlisting({
                offset,
                limit,
                status,
            });

            setOrders(data.data);
            setTotal(data.total);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [offset, limit, status]);

    return { orders, total, loading, error };
};
