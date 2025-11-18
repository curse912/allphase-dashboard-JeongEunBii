// PaymentListRes
// import type { PayTypeRes, StatusRes } from "./code";

export interface PaymentListRes{
    paymentCode : string;
    mchtCode : string;
    amount : string;
    currency : string;
    payType : string;
    status : string;
    paymentAt : string;
}