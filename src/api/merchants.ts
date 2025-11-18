import { apiClient } from "./client";
import type { ApiResponse } from "../types/api";
import type { MerchantListRes, MerchantDetailRes } from "../types/merchant";

// merchants/list
export async function getMerchantList(){
    const res = await apiClient.get<ApiResponse<MerchantListRes[]>>(
        '/merchants/list'
    );
    return res.data;
}

// merchants/details
export async function getMerchantDetailList(){
    const res = await apiClient.get<ApiResponse<MerchantDetailRes[]>>(
        '/merchants/details'
    );
    return res.data;
}

// merchants/details/{mchtCode}
export async function getMerchantDetailByCode(mchtCode:string){
    const res = await apiClient.get<ApiResponse<MerchantDetailRes>>(
        `/merchants/details/${mchtCode}`
    );
    return res.data;
}