// MerchantListRes
export interface MerchantListRes {
    mchtCode : string;
    mchtName : string;
    status : string;
    bizType : string;
}


// MerchantDetailRes
export interface MerchantDetailRes {
    mchtCode : string;
    mchtName : string;
    status : string;
    bizType : string;
    bizNo: string;
    address: string;
    phone: string;
    email: string;
    registeredAt: string;
    updatedAt: string;
}