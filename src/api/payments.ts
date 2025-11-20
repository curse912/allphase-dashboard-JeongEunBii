import { apiClient } from "./client"
import type { ApiResponse } from "../types/api"
import type { PaymentListRes } from "../types/payment"

// export type GetPaymentsParams = void;
export async function getPayments() {
    const res = await apiClient.get<ApiResponse<PaymentListRes[]>>(
        '/payments/list'
    );
    return res.data;
}