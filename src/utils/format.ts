export function formatCurrencyKRW( amount : number) : string{
    if (Number.isNaN(amount)) return '-';
    return amount.toLocaleString('ko-KR', {
        style: 'currency',
        currency: 'KRW',
        maximumFractionDigits: 0,
    });
}

export function formatPercent(value: number): string {
    if (Number.isNaN(value)) return '-';
    return `${value.toFixed(1)}%`;
}