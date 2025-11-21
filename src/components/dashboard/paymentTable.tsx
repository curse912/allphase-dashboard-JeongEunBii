import type React from "react";
import type { PaymentListRes } from "../../types/payment";
import { formatCurrencyKRW, formatDateTime } from "../../utils/format";
import table from './PaymentTable.module.css';

interface PaymentTableProps {
    payments : PaymentListRes[];
}

const getStatusClass = (status: string) => {
    const upper = status.toUpperCase();

    if (upper === 'PENDING') return table.statusPending;
    if (upper === 'SUCCESS') return table.statusSuccess;
    if (upper === 'FAILED') return table.statusFailed;
    if (upper === 'CANCELLED') return table.statusCancelled;
    
    return table.statusDefault;
}
const getStatusLabel = (status: string) => {
    const upper = status.toUpperCase();

    if (upper === 'PENDING') return '대기';
    if (upper === 'SUCCESS') return '성공';
    if (upper === 'FAILED') return '실패';
    if (upper === 'CANCELLED') return '취소';
    
    return status;
}

const PaymentTable : React.FC<PaymentTableProps> = ({payments}) => {
    const recent = [...payments].sort(
                        (a,b) =>  new Date(b.paymentAt).getTime() - new Date(a.paymentAt).getTime()
                    ).slice(0,10);
    return (
        <section className={table.container}>
            <div className={table.headerRow}>
                <h2 className={table.title}>최근 거래 10건</h2>
                <span className={table.caption}>최신 결제일 기준</span>
            </div>

            {recent.length === 0 ? (
                <div className={table.empty}>표시할 거래 내역이 없습니다.</div>
            ):(
                <div className={table.tableWrapper}>
                    <table className={table.table}>
                        <thead>
                            <tr>
                                <th>결제코드</th>
                                <th>가맹점코드</th>
                                <th>결제수단</th>
                                <th>결제상태</th>
                                <th>금액</th>
                                <th>통화</th>
                                <th>결제일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recent.map((p) => {
                                const amountNum = Number(p.amount);
                                return (
                                    <tr key={p.paymentCode}>
                                        <td className={table.code}>{p.paymentCode}</td>
                                        <td>{p.mchtCode}</td>
                                        <td>{p.payType}</td>
                                        <td>
                                            <span className={`${table.statusBadge} ${getStatusClass(p.status,)}`}>
                                                {getStatusLabel(p.status)}
                                            </span>
                                        </td>
                                        <td>
                                            {Number.isNaN(amountNum) ? '-' : formatCurrencyKRW(amountNum)}
                                        </td>
                                        <td>{p.currency}</td>
                                        <td>{formatDateTime(p.paymentAt)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default PaymentTable;