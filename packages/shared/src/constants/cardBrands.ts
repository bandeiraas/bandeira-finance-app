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

export const CARD_BRAND_SLUGS = [
    'mastercard', 'visa', 'elo', 'hipercard', 'amex',
    'banescard', 'banricompras', 'cabal', 'credz', 'sorocred', 'senff', 'aura',
    'alelo', 'ticket', 'vr', 'sodexo', 'ben', 'caju',
] as const

export type CardBrandSlug = (typeof CARD_BRAND_SLUGS)[number]
