// src/utils/excel.ts
import type { PaymentListRes } from '../types/payment';

export function downloadPaymentsCsv(rows: PaymentListRes[], filename: string) {
  const header = [
    'paymentCode',
    'mchtCode',
    'payType',
    'status',
    'amount',
    'currency',
    'paymentAt',
  ];

  const lines = [
    header.join(','),
    ...rows.map((p) =>
      [
        p.paymentCode,
        p.mchtCode,
        p.payType,
        p.status,
        p.amount,
        p.currency,
        p.paymentAt,
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(','),
    ),
  ];

  const blob = new Blob([lines.join('\n')], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
