import type React from 'react';
import type { PaymentListRes } from '../../types/payment';
import { formatCurrencyKRW, formatDateTime } from '../../utils/format';
import styles from './PaymentsTable.module.css';

interface PaymentsTableProps {
  rows: PaymentListRes[];
}

const getStatusClass = (status: string) => {
  const upper = status.toUpperCase();
  if (upper === 'SUCCESS') return styles.statusSuccess;
  if (upper === 'FAILED') return styles.statusFailed;
  if (upper === 'CANCELLED') return styles.statusCancelled;
  if (upper === 'PENDING') return styles.statusPending;
  return styles.statusDefault;
};

const getStatusLabel = (status: string) => {
  const upper = status.toUpperCase();
  if (upper === 'SUCCESS') return '성공';
  if (upper === 'FAILED') return '실패';
  if (upper === 'CANCELLED') return '취소';
  if (upper === 'PENDING') return '대기';
  return status;
};

const PaymentsTable: React.FC<PaymentsTableProps> = ({ rows }) => {
  const sorted = [...rows].sort(
    (a, b) =>
      new Date(b.paymentAt).getTime() - new Date(a.paymentAt).getTime(),
  );

  return (
    <section >
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
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
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.empty}>
                  조건에 해당하는 결제 내역이 없습니다.
                </td>
              </tr>
            ) : (
              sorted.map((p) => {
                const amountNum = Number(p.amount);
                return (
                  <tr key={p.paymentCode}>
                    <td className={styles.code}>{p.paymentCode}</td>
                    <td>{p.mchtCode}</td>
                    <td>{p.payType}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${getStatusClass(
                          p.status,
                        )}`}
                      >
                        {getStatusLabel(p.status)}
                      </span>
                    </td>
                    <td>
                      {Number.isNaN(amountNum)
                        ? '-'
                        : formatCurrencyKRW(amountNum)}
                    </td>
                    <td>{p.currency}</td>
                    <td>{formatDateTime(p.paymentAt)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PaymentsTable;
