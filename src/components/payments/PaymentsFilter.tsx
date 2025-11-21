import type React from 'react';
import type { PaymentListRes } from '../../types/payment';
import type { PaymentFilters } from '../../pages/Payments/PaymentsPage';
import filter from './PaymentsFilter.module.css';
import { useMemo } from 'react';

interface PaymentsFilterProps {
  payments: PaymentListRes[];
  filters: PaymentFilters;
  onChangeFilters: (next: Partial<PaymentFilters>) => void;
  onApplyFilters : () => void;
}

const PaymentsFilter: React.FC<PaymentsFilterProps> = ({
  payments,
  filters,
  onChangeFilters,
  onApplyFilters
}) => {
  const statusOptions = Array.from( new Set(payments.map((p) => p.status))).sort();
  const payTypeOptions = Array.from( new Set(payments.map((p) => p.payType)) ).sort();

  const monthsWithData = useMemo(() => {
    const set = new Set<string>();
    payments.forEach((p) => {
      const d = new Date(p.paymentAt);
      if (Number.isNaN(d.getTime())) return;
      const ym = d.toISOString().slice(0, 7); 
      set.add(ym);
    });
    return Array.from(set).sort().reverse(); 
  }, [payments]);

  return (
    <section className={filter.container}>
      <div className={filter.filterRow}>
        <div className={filter.rowLabel}>조회기준</div>
        <div className={filter.rowContent}>
          <div className={filter.fieldGroupInline}>
            <span className={filter.fieldLabel}>결제 상태</span>
            <select
              value={filters.status}
              onChange={(e) => onChangeFilters({ status: e.target.value })}
              className={filter.select}
            >
              <option value="ALL">전체</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className={filter.fieldGroupInline}>
            <span className={filter.fieldLabel}>결제 수단</span>
            <select
              value={filters.payType}
              onChange={(e) => onChangeFilters({ payType: e.target.value })}
              className={filter.select}
            >
              <option value="ALL">전체</option>
              {payTypeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={filter.filterRow}>
        <div className={filter.rowLabel}>조회기준</div>
        <div className={filter.rowContent}>
          <div className={filter.fieldGroupInline}>
            <span className={filter.fieldLabel}>가맹점 코드</span>
            <input
              type="text"
              value={filters.mchtCode}
              onChange={(e) => onChangeFilters({ mchtCode: e.target.value })}
              placeholder="직접 입력"
              className={filter.select}
            />
          </div>

          <div className={filter.fieldGroupInline}>
            <span className={filter.fieldLabel}>결제 코드</span>
            <input
              type="text"
              value={filters.paymentCode}
              onChange={(e) => onChangeFilters({ paymentCode: e.target.value })}
              placeholder="직접 입력"
              className={filter.select}
            />
          </div>
        </div>
      </div>

      <div className={filter.filterRow}>
        <div className={filter.rowLabel}>조회기간</div>
        <div className={filter.rowContent}>
          <div className={filter.fieldGroupInline}>
            <select
              value={filters.dateMode}
              onChange={(e) =>
                onChangeFilters({
                  dateMode: e.target.value as PaymentFilters['dateMode'],
                })
              }
              className={filter.select}
            >
              <option value="PRESET">1개월 / 2개월</option>
              <option value="MONTH">월별 조회</option>
              <option value="CUSTOM">직접 입력</option>
            </select>
          </div>

          {/* PRESET */}
          {filters.dateMode === 'PRESET' && (
            <div className={filter.fieldGroupInline}>
              <select
                value={filters.presetRange}
                onChange={(e) =>
                  onChangeFilters({
                    presetRange: e.target.value as '1m' | '2m',
                  })
                }
                className={filter.select}
              >
                <option value="1m">1개월</option>
                <option value="2m">2개월</option>
              </select>
            </div>
          )}

          {/* MONTH */}
          {filters.dateMode === 'MONTH' && (
            <div className={filter.fieldGroupInline}>
              <select
                value={filters.month}
                onChange={(e) => onChangeFilters({ month: e.target.value })}
                className={filter.select}
              >
                <option value="">전체 월</option>
                {monthsWithData.map((ym) => {
                  const [y, m] = ym.split('-');
                  return (
                    <option key={ym} value={ym}>
                      {y}년 {m}월
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {/* CUSTOM */}
          {filters.dateMode === 'CUSTOM' && (
            <div className={filter.customRange}>
              <div className={filter.dateInputWrapper}>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) =>
                    onChangeFilters({ startDate: e.target.value })
                  }
                  className={filter.dateInput}
                />
              </div>
              <span className={filter.tilde}>~</span>
              <div className={filter.dateInputWrapper}>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) =>
                    onChangeFilters({ endDate: e.target.value })
                  }
                  className={filter.dateInput}
                />
              </div>
            </div>
          )}
          <div className={filter.actionsInline}>
            <button
              type="button"
              className={filter.applyBtn}
              onClick={onApplyFilters}
            >
              조회
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentsFilter;
