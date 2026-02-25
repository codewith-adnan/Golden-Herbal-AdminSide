import { useEffect, useState } from "react";
import { ORDER_LISTING_APIS, type Order } from "../libs/api/admin.orders.api";
import { PRODUCT_APIS, type Product } from "../libs/api/createproduct.api";
import { ORDER_STATUS_APIS } from "../libs/api/order-status.api";
import toast from "react-hot-toast";

// Order Hooks
export const useOrders = (offset = 0, limit = 10, status?: string) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = async () => {
        console.log("🔄 useOrders: fetchOrders called with:", { offset, limit, status });
        try {
            setLoading(true);
            setError(null);

            // Clean params: only include status if it has a value
            const params: any = { offset, limit };
            if (status) params.status = status;

            console.log("📡 useOrders: Triggering API call with params:", params);
            const data = await ORDER_LISTING_APIS.orderlisting(params);

            console.log("✅ useOrders: fetchOrders success. Data received:", data);

            if (data && Array.isArray(data.data)) {
                setOrders(data.data);
                setTotal(data.total || 0);
            } else {
                console.warn("⚠️ useOrders: Received unexpected data format:", data);
                setOrders([]);
            }
        } catch (err: any) {
            console.error("❌ useOrders: fetchOrders error:", err);
            setError(err?.response?.data?.message || err.message || "Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("📡 useOrders: useEffect triggered by dependency change:", { offset, limit, status });
        fetchOrders();
    }, [offset, limit, status]);

    return { orders, total, loading, error, refresh: fetchOrders };
};

// Product Hooks
export const useProducts = (offset = 0, limit = 10) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await PRODUCT_APIS.getProducts({ offset, limit });
            // Sort products by ID descending (newest first)
            const sortedProducts = [...data.data].sort((a, b) => b.id - a.id);
            setProducts(sortedProducts);
            setTotal(data.total);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [offset, limit]);

    return { products, total, loading, error, refresh: fetchProducts };
};

export const useProductActions = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createProduct = async (formData: FormData) => {
        try {
            setLoading(true);
            setError(null);
            return await PRODUCT_APIS.createProduct(formData);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to create product");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id: number, formData: FormData) => {
        try {
            setLoading(true);
            setError(null);
            return await PRODUCT_APIS.updateProduct(id, formData);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to update product");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            return await PRODUCT_APIS.deleteProduct(id);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to delete product");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { createProduct, updateProduct, deleteProduct, loading, error };
};
export const useOrderActions = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteOrder = async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            return await ORDER_LISTING_APIS.deleteOrder(id);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to delete order");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteOrder, loading, error };
};

export const useOrderStatus = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateOrderStatus = async (id: number, status: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await ORDER_STATUS_APIS.updateOrderStatus(id, status);
            toast.success(`Order status updated to ${status}`);
            return response;
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || "Failed to update order status";
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateOrderStatus, loading, error };
};
