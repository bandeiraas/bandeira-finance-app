import { z } from 'zod'

export const transactionsListQuerySchema = z.object({
    limit: z.coerce.number().int().min(1).max(100).optional(),
})

export const transactionsSummaryQuerySchema = z.object({
    month: z.coerce.number().int().min(1).max(12),
    year: z.coerce.number().int().min(2020).max(2030),
})

export const categoriesListQuerySchema = z.object({
    type: z.enum(['income', 'expense']).optional(),
})

export type TransactionsListQuery = z.infer<typeof transactionsListQuerySchema>
export type TransactionsSummaryQuery = z.infer<typeof transactionsSummaryQuerySchema>
export type CategoriesListQuery = z.infer<typeof categoriesListQuerySchema>
