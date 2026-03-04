import { z } from 'zod'
import { CARD_BRAND_SLUGS } from '../constants/cardBrands'

const HEX_REGEX = /^#[0-9A-Fa-f]{6}$/

function expiryFuture(val: string): boolean {
    const [mm, yy] = val.split('/').map(Number)
    const year = 2000 + yy
    const month = mm - 1
    const expiryDate = new Date(year, month + 1, 0)
    return expiryDate >= new Date()
}

export const createCardSchema = z.object({
    last_four: z.string()
        .length(4, 'Informe os 4 últimos dígitos')
        .regex(/^\d{4}$/, 'Apenas números são permitidos'),
    brand: z.enum(CARD_BRAND_SLUGS),
    expiry: z.string()
        .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Formato inválido (MM/AA)')
        .refine(expiryFuture, 'Cartão vencido'),
    card_name: z.string()
        .min(1, 'Nome do cartão é obrigatório')
        .max(50, 'Nome do cartão muito longo'),
    credit_limit: z.number().positive('Limite deve ser positivo'),
    card_color: z.string().regex(HEX_REGEX, 'Cor inválida (use #RRGGBB)').optional(),
    account_id: z.string().uuid('Conta inválida'),
    due_day: z.number().int().min(1).max(31).default(10),
    closing_day: z.number().int().min(1).max(31).default(5),
})

export type CreateCardDTO = z.infer<typeof createCardSchema>
