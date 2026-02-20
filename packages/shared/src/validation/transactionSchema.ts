import { z } from 'zod'

export const createTransactionSchema = z.object({
    amount: z.number()
        .positive('O valor deve ser positivo')
        .max(999_999_999.99, 'Valor excede o limite permitido'),
    description: z.string()
        .min(1, 'Descrição é obrigatória')
        .max(255, 'Descrição deve ter no máximo 255 caracteres')
        .trim(),
    categoryId: z.string().uuid('Categoria inválida'),
    accountId: z.string().uuid('Conta inválida'),
    date: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        'Data inválida'
    ),
})

export type CreateTransactionDTO = z.infer<typeof createTransactionSchema>
