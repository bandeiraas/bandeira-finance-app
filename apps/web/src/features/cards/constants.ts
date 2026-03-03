/** Bandeiras de cartão no Brasil – slug (persistido) e label (UI). */
export const CARD_BRANDS = [
    { slug: 'mastercard', label: 'Mastercard' },
    { slug: 'visa', label: 'Visa' },
    { slug: 'elo', label: 'Elo' },
    { slug: 'hipercard', label: 'Hipercard' },
    { slug: 'amex', label: 'American Express' },
    { slug: 'banescard', label: 'Banescard' },
    { slug: 'banricompras', label: 'Banricompras' },
    { slug: 'cabal', label: 'Cabal' },
    { slug: 'credz', label: 'Credz' },
    { slug: 'sorocred', label: 'Sorocred (Afinz)' },
    { slug: 'senff', label: 'Senff' },
    { slug: 'aura', label: 'Aura' },
    { slug: 'alelo', label: 'Alelo' },
    { slug: 'ticket', label: 'Ticket' },
    { slug: 'vr', label: 'VR Benefícios' },
    { slug: 'sodexo', label: 'Sodexo (Pluxee)' },
    { slug: 'ben', label: 'Ben Visa Vale' },
    { slug: 'caju', label: 'Caju / Flash' },
] as const

/** Mapeia o style do cartão (legado) para as classes de gradiente Tailwind. */
export const CARD_STYLE_CLASSES: Record<string, string> = {
    black: 'from-[#1a1a1a] via-[#333] to-[#000]',
    purple: 'from-indigo-600 to-purple-700',
    green: 'from-emerald-500 to-teal-700',
    pink: 'from-pink-500 to-rose-600',
} as const

export const CARD_STYLE_DEFAULT = 'from-[#1a1a1a] via-[#333] to-[#000]'

export function getCardGradientClass(style: string | null | undefined): string {
    if (!style) return CARD_STYLE_DEFAULT
    return CARD_STYLE_CLASSES[style] ?? CARD_STYLE_DEFAULT
}
