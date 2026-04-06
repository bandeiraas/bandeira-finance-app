/**
 * Cached Intl.NumberFormat instances to prevent performance bottlenecks
 * when formatting multiple currency values in lists/tables.
 */
const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const compactCurrencyFormatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

/**
 * Format a number as BRL currency.
 */
export function formatCurrency(value: number): string {
    return currencyFormatter.format(value);
}

/**
 * Format a number as BRL without the "R$" prefix.
 */
export function formatCurrencyCompact(value: number): string {
    return compactCurrencyFormatter.format(value);
}
