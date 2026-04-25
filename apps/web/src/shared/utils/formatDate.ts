/**
 * Cache Intl.DateTimeFormat instances for performance.
 * Instantiating these objects is expensive and causes bottlenecks when called in loops.
 */
const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
})

/**
 * Format a date string to a localized PT-BR format.
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return dateFormatter.format(date)
}

/**
 * Cache time Intl.DateTimeFormat instance for performance.
 */
export const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
})

export const dateFormatterDayMonthLong = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
})

export const dateFormatterWeekdayDayMonthLong = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
})

/**
 * Format a date string as relative time (e.g., "Hoje, 14:20", "Ontem").
 */
export function formatRelativeDate(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    const time = timeFormatter.format(date)

    if (diffDays === 0) return `Hoje, ${time}`
    if (diffDays === 1) return `Ontem, ${time}`
    if (diffDays < 7) return `${diffDays} dias atrás`

    return formatDate(dateString)
}
