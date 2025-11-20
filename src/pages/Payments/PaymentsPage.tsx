import { useMemo, useState } from "react";
import { usePayments } from "../../hooks/usePayments";
import type { PaymentListRes } from "../../types/payment";

import pay from './PaymentsPage.module.css';
import { downloadPaymentsCsv } from "../../utils/excel";

import PaymentsFilter from "../../components/payments/PaymentsFilter";
import PaymentsSummary from "../../components/payments/PaymentsSummary";
import PaymentsTable from "../../components/payments/PaymentsTable";

type DateFilterMode = 'PRESET' | 'MONTH' | 'CUSTOM';
type PresetRange = '1m' | '2m';

export interface PaymentFilters {
  status: 'ALL' | string;
  payType: 'ALL' | string;
  mchtCode: string;
  paymentCode: string;

  dateMode: DateFilterMode;
  presetRange: PresetRange;
  month: string;
  startDate: string;
  endDate: string;
}

const PaymentsPage = () => {
  const {data, isLoading, isError} = usePayments();
  const payments : PaymentListRes[] = data?.data ?? [];

  const [filters, setFilters] = useState<PaymentFilters>({
    status: 'ALL',
    payType: 'ALL',
    mchtCode: '',
    paymentCode: '',
    dateMode: 'PRESET',
    presetRange: '1m',
    month: '',
    startDate: '',
    endDate: '',
  });

  const [appliedFilters, setAppliedFilters] = useState<PaymentFilters>(filters);

  const handleChangeFilters = (next: Partial<PaymentFilters>) => {
    setFilters((prev) => ({ ...prev, ...next }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
  }

  const {filtered, totalCount, totalAmount, refundAmount} = useMemo(() => {
    const now = new Date();
    const f = appliedFilters;

    const filtered = payments.filter((p) => {
      // 상태
      if (f.status !== 'ALL' && p.status !== f.status) return false;

      // 결제수단
      if (f.payType !== 'ALL' && p.payType !== f.payType) return false;

      // 가맹점 코드 검색
      if (
        f.mchtCode &&
        !p.mchtCode.toLowerCase().includes(f.mchtCode.toLowerCase())
      )
      return false;

      // 결제코드 검색
      if (
        f.paymentCode &&
        !p.paymentCode.toLowerCase().includes(f.paymentCode.toLowerCase())
      )
      return false;

      // 날짜
      const d = new Date(p.paymentAt);
      if (Number.isNaN(d.getTime())) return false;

      if (f.dateMode === 'PRESET') {
        const from = new Date(now);
        const months = f.presetRange === '1m' ? 1 : 2;
        from.setMonth(from.getMonth() - months);
        if (d < from || d > now) return false;
      } else if (f.dateMode === 'MONTH') {
        if (!f.month) return true; 
        const ym = d.toISOString().slice(0, 7);
        if (ym !== f.month) return false;
      } else if (f.dateMode === 'CUSTOM') {
        if (f.startDate) {
          const start = new Date(f.startDate + 'T00:00:00');
          if (d < start) return false;
        }
        if (f.endDate) {
          const end = new Date(f.endDate + 'T23:59:59');
          if (d > end) return false;
        }
      }
      return true;
    });

    const totalCount = filtered.length;
    let totalAmount = 0;
    let refundAmount = 0;

    filtered.forEach((p) => {
      const n = Number(p.amount);
      if (Number.isNaN(n)) return;
      if (p.status === 'SUCCESS') {
        totalAmount += n;
      } else if (p.status === 'CANCELLED') {
        refundAmount += n;
      }
    });

    return { filtered, totalCount, totalAmount, refundAmount };
  }, [payments, appliedFilters]);

  const handleExport = () => {
    if (filtered.length === 0) return;
    downloadPaymentsCsv(filtered, 'payments.csv');
  };

  if (isLoading) {
    return <div className={pay.state}>결제 내역을 불러오는 중입니다...</div>;
  }

  if (isError) {
    return <div className={pay.state}>결제 내역을 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className={pay.wrapper}>
      <section className={pay.header}>
        <div>
          <h1 className={pay.title}>결제 내역</h1>
          <p className={pay.subtitle}>거래 상태/수단/기간별로 결제 내역을 조회할 수 있습니다.</p>
        </div>
        <button
          type="button"
          className={pay.exportBtn}
          onClick={handleExport}
          disabled={filtered.length === 0}
        >
          엑셀 다운로드
        </button>
      </section>
      <div className={pay.container}>
        <PaymentsFilter
          payments={payments}
          filters={filters}
          onChangeFilters={handleChangeFilters}
          onApplyFilters={handleApplyFilters}
        />
      </div>
      <div className={pay.container}>
        <PaymentsSummary
          totalCount={totalCount}
          totalAmount={totalAmount}
          refundAmount={refundAmount}
        />
      </div>
      <div className={pay.container}>
        <PaymentsTable rows={filtered} />
      </div>
    </div>
  );
};
export default PaymentsPage;