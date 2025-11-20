import type React from 'react';
import { formatCurrencyKRW } from '../../utils/format';
import styles from './PaymentsSummary.module.css';

interface PaymentsSummaryProps {
  totalCount: number;
  totalAmount: number;
  refundAmount: number;
}

const PaymentsSummary: React.FC<PaymentsSummaryProps> = ({
  totalCount,
  totalAmount,
  refundAmount,
}) => {
  const refundRate =
    totalAmount === 0 ? 0 : (refundAmount / (totalAmount + refundAmount)) * 100;

  return (
    <section className={styles.container}>
      <div className={styles.item}>
        <span className={styles.label}>거래 건수</span>
        <span className={styles.value}>
          {totalCount.toLocaleString('ko-KR')}건
        </span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>총 매출액 (SUCCESS)</span>
        <span className={styles.value}>
          {formatCurrencyKRW(totalAmount)}
        </span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>총 환불액 (CANCELLED)</span>
        <span className={styles.value}>
          {formatCurrencyKRW(refundAmount)}
        </span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>환불 비율</span>
        <span className={styles.value}>
          {Number.isNaN(refundRate) ? '-' : `${refundRate.toFixed(1)}%`}
        </span>
      </div>
    </section>
  );
};

export default PaymentsSummary;
