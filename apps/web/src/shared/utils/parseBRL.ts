/**
 * Parses a BRL-formatted currency string to a number.
 * "1.234,56" → 1234.56
 * "0,00" → 0
 * "342,50" → 342.50
 */
export function parseBRL(value: string): number {
    const cleaned = value
        .replace(/\s/g, '')      // Remove spaces
        .replace(/\./g, '')      // Remove thousand separators
        .replace(',', '.')       // Convert decimal comma to dot
    const num = parseFloat(cleaned)
    return isNaN(num) ? 0 : num
}
