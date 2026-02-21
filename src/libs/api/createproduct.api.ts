import { getMethod, deleteMethod } from "../../utils/http-methods";
import axiosInstance from "../../utils/axios.config";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    weight: string;
    stock_quantity: number;
    image_url?: string;
    image?: string;
    is_active: boolean;
    category?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductListResponse {
    data: Product[];
    total: number;
    current: number;
    offset: number;
    limit: number;
}

export const PRODUCT_ENDPOINTS = {
    LISTING: "/gold/products",
    ADMIN_BASE: "/gold/admin/products",
    PUBLIC_BY_ID: (id: number) => `/gold/products/${id}`,
    ADMIN_BY_ID: (id: number) => `/gold/admin/products/${id}`,
};

export const PRODUCT_APIS = {
    // Get all products (paginated)
    getProducts: (params: any) =>
        getMethod<ProductListResponse>(PRODUCT_ENDPOINTS.LISTING, params),

    // Get single product
    getProductById: (id: number) =>
        getMethod<Product>(PRODUCT_ENDPOINTS.PUBLIC_BY_ID(id)),

    // Create a new product (multipart/form-data)
    createProduct: async (formData: FormData) => {
        const response = await axiosInstance.post(PRODUCT_ENDPOINTS.ADMIN_BASE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    },

    // Update an existing product (multipart/form-data)
    updateProduct: async (id: number, formData: FormData) => {
        const response = await axiosInstance.put(PRODUCT_ENDPOINTS.ADMIN_BY_ID(id), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    },

    // Delete a product
    deleteProduct: (id: number) => {
        return deleteMethod<any>(PRODUCT_ENDPOINTS.ADMIN_BY_ID(id));
    }
};
