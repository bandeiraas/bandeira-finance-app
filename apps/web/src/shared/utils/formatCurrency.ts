/**
 * Cache Intl.NumberFormat instances for performance.
 * Instantiating these objects is expensive and causes bottlenecks when called in loops.
 */
const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})

/**
 * Format a number as BRL currency.
 */
export function formatCurrency(value: number): string {
    return currencyFormatter.format(value)
}

/**
 * Cache compact Intl.NumberFormat instance for performance.
 */
const compactCurrencyFormatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})

/**
 * Format a number as BRL without the "R$" prefix.
 */
export function formatCurrencyCompact(value: number): string {
    return compactCurrencyFormatter.format(value)
}
