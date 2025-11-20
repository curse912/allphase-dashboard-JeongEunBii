import type React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { PaymentListRes } from "../../types/payment";
import paychart from './paymentChart.module.css';

interface PaymentChartProps {
    payments : PaymentListRes[];
}

type PayTypeKey = 'ONLINE' | 'DEVICE' | 'MOBILE' | 'VACT' | 'BILLING' | 'OTHER' ;

const PAY_TYPE_LABEL : Record<PayTypeKey, string> = {
    ONLINE : "온라인",
    DEVICE : "단말기",
    MOBILE : "모바일",
    VACT : "가상계좌",
    BILLING : "정기결제",
    OTHER : "기타"
};

const PAY_TYPE_ORDER : PayTypeKey[] = [
    'ONLINE', 'DEVICE', 'MOBILE', 'VACT', 'BILLING', 'OTHER'
];

const COLORS = ['#2C56A6', '#3A6DCC', '#5387E6', '#A8C6FF', '#C5D9FF', '#6D6D6D'];

const PaymentChart : React.FC<PaymentChartProps> = ({payments}) => {
    const counts : Record<PayTypeKey,number> = {
        ONLINE : 0,
        DEVICE : 0,
        MOBILE : 0,
        VACT : 0,
        BILLING : 0,
        OTHER : 0
    };

    payments.forEach((p) => {
        const raw = (p.payType || '').toUpperCase();
        const key : PayTypeKey = 
            raw === 'ONLINE' ||
            raw === 'DEVICE' ||
            raw === 'MOBILE' ||
            raw === 'VACT' ||
            raw === 'BILLING' ? (raw as PayTypeKey) : 'OTHER';
        counts[key] += 1;
    });

    const total = Object.values(counts).reduce((sum,v) => sum + v, 0);

    const data = PAY_TYPE_ORDER.map((key) => ({
        key,
        name : PAY_TYPE_LABEL[key],
        value : counts[key],
        percent : total === 0? 0: (counts[key] / total) * 100,
    })).filter((item) => item.value > 0);

    return (
      <section>
        <div className={paychart.header}>
          <h2 className={paychart.title}>결제수단 비율</h2>
          {total > 0 && (
            <span className={paychart.caption}>
              총 {total.toLocaleString('ko-KR')}건 기준
            </span>
          )}
        </div>

      {total === 0 ? (
        <div className={paychart.empty}>표시할 결제 데이터가 없습니다.</div>
      ) : (
        <div className={paychart.chartWrapper}>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                stroke="none" 
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.key}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any, _name: any, props: any) => {
                  const v = Number(value);
                  const pct = (props.payload?.percent as number) ?? 0;
                  return [
                    `${v.toLocaleString('ko-KR')}건 (${pct.toFixed(1)}%)`,
                    props.payload.name,
                  ];
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
};

export default PaymentChart;