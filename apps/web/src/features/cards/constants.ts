/** Mapeia o style do cartão (do cadastro) para as classes de gradiente Tailwind. */
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
