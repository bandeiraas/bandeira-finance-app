import type { ITransactionRepository, Transaction, DashboardSummary, Result } from '@bandeira/shared'
import { ResultUtil as R, AppError, TransactionFactory } from '@bandeira/shared'

export class TransactionService {
    private repository: ITransactionRepository
    constructor(repository: ITransactionRepository) {
        this.repository = repository
    }

    async getTransactions(userId: string, limit?: number): Promise<Result<Transaction[]>> {
        try {
            const transactions = await this.repository.findByUser(userId, limit)
            return R.ok(transactions)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async getMonthlyTransactions(
        userId: string,
        month: number,
        year: number
    ): Promise<Result<Transaction[]>> {
        try {
            const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`
            const lastDay = new Date(year, month + 1, 0).getDate()
            const endDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`
            const transactions = await this.repository.findByDateRange(userId, startDate, endDate)
            return R.ok(transactions)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async getMonthlySummary(
        userId: string,
        month: number,
        year: number
    ): Promise<Result<DashboardSummary>> {
        const result = await this.getMonthlyTransactions(userId, month, year)
        if (!result.success) return result

        const transactions = result.data
        let totalIncome = 0
        let totalExpenses = 0
        const grouped: Record<string, { total: number; color: string | null }> = {}

        // Single-pass iteration to minimize complexity from O(k*N) to O(N)
        for (const t of transactions) {
            if (t.type === 'income') {
                totalIncome += t.amount
            } else if (t.type === 'expense') {
                totalExpenses += t.amount

                const name = t.categories?.name ?? 'Sem categoria'
                const color = t.categories?.color ?? null

                if (!grouped[name]) {
                    grouped[name] = { total: 0, color }
                }
                grouped[name].total += t.amount
            }
        }

        const expensesByCategory = Object.entries(grouped)
            .map(([categoryName, { total, color }]) => ({
                categoryName,
                categoryColor: color,
                total,
                percentage: totalExpenses > 0 ? (total / totalExpenses) * 100 : 0,
            }))
            .sort((a, b) => b.total - a.total)

        return R.ok({
            totalIncome,
            totalExpenses,
            balance: totalIncome - totalExpenses,
            transactions,
            expensesByCategory,
        })
    }

    async createIncome(
        userId: string,
        data: {
            amount: number
            description: string
            categoryId: string
            accountId: string
            date: string
        }
    ): Promise<Result<Transaction>> {
        try {
            const insert = TransactionFactory.createForIncome(userId, data)
            const transaction = await this.repository.create(insert)
            return R.ok(transaction)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async createExpense(
        userId: string,
        data: {
            amount: number
            description: string
            categoryId: string
            accountId: string
            date: string
        }
    ): Promise<Result<Transaction>> {
        try {
            const insert = TransactionFactory.createForExpense(userId, data)
            const transaction = await this.repository.create(insert)
            return R.ok(transaction)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async deleteTransaction(id: string, userId: string): Promise<Result<void>> {
        try {
            await this.repository.delete(id, userId)
            return R.ok(undefined)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }
}
