import type React from "react";
import { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { PaymentListRes } from "../../types/payment";
import chart from './RecentChart.module.css';

interface RecentChartProps {
    payments : PaymentListRes[];
};

type RangeKey = '7d' | '30d' | '90d';

const RANGE_LABEL : Record<RangeKey, string> = {
    '7d' : '일주일',
    '30d' : '1개월',
    '90d' : '3개월'
};

const RecentChart : React.FC<RecentChartProps> = ({payments}) => {
    const [range, setRange] = useState<RangeKey>('30d');

    const now = useMemo(() => new Date(), []);
    const msOfDay = 1000 * 60 * 60 * 24;

    const days = range === '7d' ? 7 : range === '30d' ? 30: 90;

    const chartData = useMemo(() => {
        // SUCCESS 
        const filtered = payments.filter((p) => {
            if (p.status !== 'SUCCESS') return false;

            const d = new Date(p.paymentAt);

            if(Number.isNaN(d.getTime())) return false;

            const diffDays = (now.getTime() - d.getTime()) / msOfDay;
            return diffDays >= 0 && diffDays < days;
        });

        // 날짜별 합계
        const map = new Map<string, number>();

        filtered.forEach((p) => {
            const d = new Date(p.paymentAt);
            const key = d. toISOString().slice(0,10);
            const prev = map.get(key) ?? 0;
            const amount = Number(p.amount);
            const value = Number.isNaN(amount) ? 0 : amount;
            map.set(key, prev + value);
        })

        //날짜 오름차순 정렬
        const entries = Array.from(map.entries())
                             .sort(([a], [b]) => a<b ? -1 : a>b ? 1 : 0);
        
        return entries.map(([date, amount]) => ({
            date, amount
        }));
    }, [payments, days, now, msOfDay]);

    const total = chartData.reduce((sum,d) => sum + d.amount, 0);

    return (
        <section className={chart.container}>
            <div className={chart.header}>
                <div>
                    <h2 className={chart.title}>최근 거래 추이</h2>
                </div>
                <div className={chart.tabs}>
                    {(Object.keys(RANGE_LABEL) as RangeKey[]).map((key) => (
                        <button 
                            key={key} type="button"
                            className={chart.tab + ' ' + (key === range ? chart.tabActive : '')}
                            onClick={() => setRange(key)}
                        >
                            {RANGE_LABEL[key]}
                        </button>
                    ))}
                </div>
            </div>

            {chartData.length === 0 ? (
                <div className={chart.empty}>선택한 기간에 거래 데이터가 없습니다.</div>
            ) : (
                <>
                    <div className={chart.total}>
                        총{' '}
                        <span>
                            {total.toLocaleString('ko-KR', {
                                maximumFractionDigits: 0,
                            })}
                        </span>{' '}
                        원
                    </div>
                    <div className={chart.chartWrapper}>
                        <ResponsiveContainer width="100%" height={260}>
                            <LineChart data={chartData} margin={{ top: 8, right: 16, bottom: 8, left: -16 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                                <YAxis
                                    tick={{ fontSize: 11 }}
                                    tickFormatter={(v) =>
                                        v >= 1_000_000 ? `${Math.round(v / 1_000_000)}M` : v.toString()
                                    }
                                />
                                <Tooltip
                                    formatter={(value: any) => {
                                        const num = Number(value);
                                        return [
                                            `${num.toLocaleString('ko-KR')}원`,
                                            '성공 금액 합계'
                                        ];
                                    }}
                                    labelFormatter={(label) => `날짜: ${label}`}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#4d6360"
                                    strokeWidth={2}
                                    dot={{ r: 2 }}
                                    activeDot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </section>
    )
}
export default RecentChart;