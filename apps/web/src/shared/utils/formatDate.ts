/**
 * Cached Intl.DateTimeFormat instances to prevent performance bottlenecks
 * when formatting multiple date values in lists/tables.
 */
const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
});

const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
});

/**
 * Format a date string to a localized PT-BR format.
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return dateFormatter.format(date);
}

/**
 * Format a date string as relative time (e.g., "Hoje, 14:20", "Ontem").
 */
export function formatRelativeDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    // Reset time components for accurate day comparison
    const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffMs = nowDay.getTime() - dateDay.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const time = timeFormatter.format(date);

    if (diffDays === 0) return `Hoje, ${time}`;
    if (diffDays === 1) return `Ontem, ${time}`;
    if (diffDays > 1 && diffDays < 7) return `${diffDays} dias atrás`;

    return formatDate(dateString);
}
