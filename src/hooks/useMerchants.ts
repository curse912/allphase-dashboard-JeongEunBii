import { useQuery } from "@tanstack/react-query";
import { getMerchantList,getMerchantDetailByCode, getMerchantDetailList } from "../api/merchants";

// 가맹점 목록
export function useMerchantList(){
    return useQuery({
        queryKey : ['merchants', 'list'],
        queryFn : getMerchantList,
        staleTime : 1000*60,
    });
}

// 가맹점 상세 전체
export function useMerchantDetails(){
    return useQuery({
        queryKey : ['merchants', 'details'],
        queryFn : getMerchantDetailList,
        staleTime : 1000*60,
    });
}

// 특정 가맹점 상세
export function useMerchantDetail(mchtCode : string | null){
    return useQuery({
        // queryKey : ['merchants', 'detail', mchtCode],
        // queryFn : () => {
        //     if(!mchtCode) {
        //      throw new Error('mchCode가 필요합니다.');
        //     }  
        //     return getMerchantDetailByCode(mchtCode);
        // },
        // enabled : !mchtCode,
        // staleTime : 1000*60
        queryKey: ['merchant', 'detail', mchtCode],
        queryFn: () => getMerchantDetailByCode(mchtCode as string),
        enabled: !!mchtCode,
    });
}


