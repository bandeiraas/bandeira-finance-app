import type { ITransactionRepository, Transaction, DashboardSummary, CategorySummary, Result } from '@bandeira/shared'
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
        const totalIncome = transactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + Number(t.amount), 0)

        const totalExpenses = transactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + Number(t.amount), 0)

        const expensesByCategory = this.groupByCategory(
            transactions.filter((t) => t.type === 'expense'),
            totalExpenses
        )

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

    async deleteTransaction(id: string): Promise<Result<void>> {
        try {
            await this.repository.delete(id)
            return R.ok(undefined)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    private groupByCategory(
        expenses: Transaction[],
        totalExpenses: number
    ): CategorySummary[] {
        const grouped = expenses.reduce<Record<string, { total: number; color: string | null }>>(
            (acc, t) => {
                const name = t.categories?.name ?? 'Sem categoria'
                const color = t.categories?.color ?? null
                if (!acc[name]) {
                    acc[name] = { total: 0, color }
                }
                acc[name].total += Number(t.amount)
                return acc
            },
            {}
        )

        return Object.entries(grouped)
            .map(([categoryName, { total, color }]) => ({
                categoryName,
                categoryColor: color,
                total,
                percentage: totalExpenses > 0 ? (total / totalExpenses) * 100 : 0,
            }))
            .sort((a, b) => b.total - a.total)
    }
}
