// 공통 ApiResponse
export interface ApiResponse<T> {
    status : number;
    message : string;
    data : T;
}