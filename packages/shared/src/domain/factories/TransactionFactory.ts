import type { InsertTables } from '../../types/database.types'
import type { CreateTransactionDTO } from '../../validation/transactionSchema'

/**
 * Normaliza a data para formato YYYY-MM-DD (invariante de domínio).
 */
function normalizeDate(dateStr: string): string {
    const d = new Date(dateStr)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
}

/**
 * Factory para criação de transações com invariantes de domínio.
 * Recebe DTO já validado e retorna objeto pronto para insert.
 */
export const TransactionFactory = {
    createForIncome(
        userId: string,
        dto: CreateTransactionDTO
    ): InsertTables<'transactions'> {
        return {
            user_id: userId,
            type: 'income',
            amount: dto.amount,
            description: dto.description,
            category_id: dto.categoryId,
            account_id: dto.accountId,
            date: normalizeDate(dto.date),
        }
    },

    createForExpense(
        userId: string,
        dto: CreateTransactionDTO
    ): InsertTables<'transactions'> {
        return {
            user_id: userId,
            type: 'expense',
            amount: dto.amount,
            description: dto.description,
            category_id: dto.categoryId,
            account_id: dto.accountId,
            date: normalizeDate(dto.date),
        }
    },
}
