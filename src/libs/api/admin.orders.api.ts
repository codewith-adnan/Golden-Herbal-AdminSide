import { getMethod } from "../../utils/http-methods";

export interface Order {
    id: number;
    customer_name: string;
    phone_number: string;
    email: string;
    address: string;
    city: string;
    total_amount: number;
    order_status: string;
    createdAt: string;
}

export interface OrderListResponse {
    data: Order[];
    current: number;
    offset: number;
    limit: number;
    total: number;
}

export const API_ENDPOINTS = {
    ORDER_LISTING: "/gold/admin/orders",
    ORDER_DETAIL: (id: number) => `/gold/admin/orders/${id}`,
};

export const ORDER_LISTING_APIS = {
    orderlisting: (params: any) =>
        getMethod<OrderListResponse>(API_ENDPOINTS.ORDER_LISTING, params),

    orderDetail: (id: number) =>
        getMethod<Order>(API_ENDPOINTS.ORDER_DETAIL(id)),
};
