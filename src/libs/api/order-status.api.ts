import { patchMethod } from "../../utils/http-methods";

export interface UpdateOrderStatusResponse {
    id: number;
    order_status: string;
    updatedAt: string;
}

export const ORDER_STATUS_APIS = {
    updateOrderStatus: (id: number, status: string) =>
        patchMethod<UpdateOrderStatusResponse>(`/gold/admin/orders/${id}/status`, { status }),
};
