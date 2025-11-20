// 통화 
export function formatCurrencyKRW( amount : number) : string{
    if (Number.isNaN(amount)) return '-';
    return amount.toLocaleString('ko-KR', {
        style: 'currency',
        currency: 'KRW',
        maximumFractionDigits: 0,
    });
}

// 퍼센트
export function formatPercent(value: number): string {
    if (Number.isNaN(value)) return '-';
    return `${value.toFixed(1)}%`;
}

// 날짜
export function formatDateTime(dateStr: string): string{
    const d = new Date(dateStr);

    if(Number.isNaN(d.getTime())) return '-';

    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2,'0');
    const day = `${d.getDay() + 1}`.padStart(2,'0');
    const hh = `${d.getHours() + 1}`.padStart(2,'0');
    const mm = `${d.getMinutes() + 1}`.padStart(2,'0');

    return `${year}-${month}-${day} ${hh}:${mm}`;
}