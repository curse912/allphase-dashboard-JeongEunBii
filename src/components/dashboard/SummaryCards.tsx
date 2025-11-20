import type React from "react";
import { formatCurrencyKRW, formatPercent } from "../../utils/format";
import style from './SummaryCards.module.css';

export interface SummaryData{
    totalAmount : number;
    totalCount : number;
    successRate : number;
    refundRate : number;
}

interface SummaryCardsProps{
    data: SummaryData;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
    
    const { totalAmount, totalCount, successRate, refundRate } = data;

    const items = [
        {
            label: '총 매출액',
            value: formatCurrencyKRW(totalAmount),
            sub: '이달 기준'
        },
        {
            label: '거래 건수',
            value: `${totalCount.toLocaleString('ko-KR')}건`,
            sub: '전체 결제 건수'
        },
        {
            label: '거래 성공률',
            value: formatPercent(successRate),
            sub: 'SUCCESS 비율'
        },
        {
            label: '환불률',
            value: formatPercent(refundRate),
            sub: 'CANCELLED 비율'
        },
    ];

    return (
        <section>
            <h2 className={style.title}>이달의 매출</h2>
            <div className={style.grid}>
                {items.map((item) => (
                    <div key={item.label} className={style.card}>
                        <div className={style.dot} />
                        <span className={style.value}>{item.value}</span>
                        <span className={style.label}>{item.label}</span>
                        <span className={style.sub}>{item.sub}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SummaryCards;