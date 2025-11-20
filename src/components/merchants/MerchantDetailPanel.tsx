import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useMerchantDetail } from '../../hooks/useMerchants';
import panel from './MerchantDetailPanel.module.css';
import { formatDateTime, formatCurrencyKRW } from '../../utils/format';
import type { PaymentListRes } from '../../types/payment';

import PaymentChart from '../dashboard/PaymentChart'; 
import PaymentsTable from '../payments/PaymentsTable';


interface MerchantDetailPanelProps {
    mchtCode: string | null;
    payments: PaymentListRes[];
}

const MerchantDetailPanel: React.FC<MerchantDetailPanelProps> = ({mchtCode,payments}) => {

    const { data, isLoading, isError } = useMerchantDetail(mchtCode ?? null);
    const detail = data?.data;

    const [visibleCount, setVisibleCount] = useState(15);

    useEffect(() =>{
        setVisibleCount(5);
    }, [mchtCode]);

    const merchantPayments = useMemo(() => 
        payments.filter((p) => p.mchtCode === mchtCode), 
        [payments, mchtCode]
    );

    
    const summary = useMemo(() => {
        let totalCount = merchantPayments.length;
        let successAmount = 0;
        let refundAmount = 0;
        
        merchantPayments.forEach((p) => {
            const n = Number(p.amount);
            if (Number.isNaN(n)) return;
            if (p.status === 'SUCCESS') successAmount += n;
            if (p.status === 'CANCELLED') refundAmount += n;
        });
        
        return {
            totalCount,
            successAmount,
            refundAmount
        };
    },[merchantPayments]);
    
    const recent = useMemo(
        () => [...merchantPayments].sort(
        (a,b) => new Date(b.paymentAt).getTime() - new Date(a.paymentAt).getTime()
    ).slice(0,visibleCount),[merchantPayments, visibleCount]
    );
    
    if (!mchtCode) {
        return (
            <div className={panel.state}>
            왼쪽 목록에서 가맹점을 선택해주세요.
        </div>
        );
    }

    if (isLoading) {
        return <div className={panel.state}>상세 정보를 불러오는 중입니다...</div>;
    }

    if (isError || !detail) {
        return <div className={panel.state}>상세 정보를 불러오지 못했습니다.</div>;
    }

    const getMerchantStatusClass = (status: string) => {
        const upper = status.toUpperCase();
        if (upper === 'READY') return panel.statusReady;
        if (upper === 'ACTIVE') return panel.statusActive;
        if (upper === 'INACTIVE') return panel.statusInactive;
        if (upper === 'CLOSED') return panel.statusClosed;
        return panel.statusDefault;
    };

    const getMerchantStatusLabel = (status: string) => {
        const upper = status.toUpperCase();
        if (upper === 'READY') return '대기';
        if (upper === 'ACTIVE') return '영업중';
        if (upper === 'INACTIVE') return '중지';
        if (upper === 'CLOSED') return '폐업';
        return status;
    };

    return (
        <div className={panel.container}>
            {/* 상단 요약 영역 */}
            <div className={panel.header}>
                <div>
                    <h2 className={panel.name}>{detail.mchtName}</h2>
                    <p className={panel.code}>{detail.mchtCode}</p>
                </div>
                <div className={panel.headerRight}>
                    <span className={panel.badge}>{detail.bizType}</span>
                    <span className={`${panel.status} ${getMerchantStatusClass(detail.status)}`}>
                        {getMerchantStatusLabel(detail.status)}
                    </span>
                </div>
            </div>

            {/* 가맹점별 매출 요약 */}
            <section className={panel.section}>
                <div className={panel.summaryRow}>
                    <div className={panel.field}>
                        <span className={panel.label}>총 거래 건수</span>
                        <span className={panel.value}>
                            {summary.totalCount.toLocaleString('ko-KR')}건
                        </span>
                    </div>
                    <div className={panel.field}>
                        <span className={panel.label}>총 매출액 (SUCCESS)</span>
                        <span className={panel.value}>
                            {formatCurrencyKRW(summary.successAmount)}
                        </span>
                    </div>
                    <div className={panel.field}>
                        <span className={panel.label}>총 환불액 (CANCELLED)</span>
                        <span className={panel.value}>
                            {formatCurrencyKRW(summary.refundAmount)}
                        </span>
                    </div>
                </div>
            </section>

            {/* 기본 정보 */}
            <section className={panel.section}>
                <div className={panel.flex}>
                    <div className={panel.chrt} >
                        <PaymentChart payments={merchantPayments} />
                    </div>
                    <div className={panel.grid}>
                        <div className={panel.field}>
                            <span className={panel.label}>사업자번호</span>
                            <span className={panel.value}>{detail.bizNo || '-'}</span>
                        </div>
                        <div className={panel.field}>
                            <span className={panel.label}>이메일</span>
                            <span className={panel.value}>{detail.email || '-'}</span>
                        </div>
                        <div className={panel.field}>
                            <span className={panel.label}>전화번호</span>
                            <span className={panel.value}>{detail.phone || '-'}</span>
                        </div>
                        <div className={panel.field}>
                            <span className={panel.label}>주소</span>
                            <span className={panel.value}>{detail.address || '-'}</span>
                        </div>
                        <div className={panel.field}>
                            <span className={panel.label}>등록일</span>
                            <span className={panel.value}>
                            {detail.registeredAt
                                ? formatDateTime(detail.registeredAt)
                                : '-'}
                            </span>
                        </div>
                        <div className={panel.field}>
                            <span className={panel.label}>최근 수정일</span>
                            <span className={panel.value}>
                            {detail.updatedAt ? formatDateTime(detail.updatedAt) : '-'}
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* 최근 결제 내역 */}
            <section className={panel.section}>
                <h3 className={panel.sectionTitle}>최근 결제 내역</h3>
                {recent.length === 0 ? (
                    <div className={panel.stateSmall}>최근 결제내역이 없습니다.</div>
                ) : (
                    <>
                        <PaymentsTable rows={recent} />
                        {visibleCount < merchantPayments.length && (
                            <div className={panel.moreWrapper}>
                                <button type="button" className={panel.moreBtn} onClick={() => setVisibleCount((prev) => prev + 15)} >
                                    + 더보기
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>

        </div>
    );
};

export default MerchantDetailPanel;
