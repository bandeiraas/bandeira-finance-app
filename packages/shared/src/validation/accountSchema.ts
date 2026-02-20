import { z } from 'zod'

export const createAccountSchema = z.object({
    bankName: z.string()
        .min(2, 'Nome do banco é obrigatório')
        .max(100, 'Nome do banco muito longo'),
    accountType: z.enum(['corrente', 'poupanca', 'investimento', 'carteira'], {
        message: 'Tipo de conta inválido',
    }),
    balance: z.number().default(0),
    color: z.string().optional(),
    isPrimary: z.boolean().default(false),
})

export type CreateAccountDTO = z.infer<typeof createAccountSchema>
