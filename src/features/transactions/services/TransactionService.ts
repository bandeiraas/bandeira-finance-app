import { TransactionRepository, transactionRepository } from '../repositories/TransactionRepository'
import type { Transaction, DashboardSummary, CategorySummary } from '../../../core/types/models'

export class TransactionService {
    private repository: TransactionRepository

    constructor(repository: TransactionRepository = transactionRepository) {
        this.repository = repository
    }

    /**
     * Get all transactions for a user, optionally limited.
     */
    async getTransactions(userId: string, limit?: number): Promise<Transaction[]> {
        return this.repository.findByUser(userId, limit)
    }

    /**
     * Get transactions for a specific month/year.
     */
    async getMonthlyTransactions(
        userId: string,
        month: number,
        year: number
    ): Promise<Transaction[]> {
        const startDate = new Date(year, month, 1).toISOString()
        const endDate = new Date(year, month + 1, 0, 23, 59, 59).toISOString()
        return this.repository.findByDateRange(userId, startDate, endDate)
    }

    /**
     * Get a full dashboard summary for a given month.
     */
    async getMonthlySummary(
        userId: string,
        month: number,
        year: number
    ): Promise<DashboardSummary> {
        const transactions = await this.getMonthlyTransactions(userId, month, year)

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

        return {
            totalIncome,
            totalExpenses,
            balance: totalIncome - totalExpenses,
            transactions,
            expensesByCategory,
        }
    }

    /**
     * Create an income transaction.
     */
    async createIncome(
        userId: string,
        data: {
            amount: number
            description: string
            categoryId: string
            accountId: string
            date: string
        }
    ): Promise<Transaction> {
        return this.repository.create({
            user_id: userId,
            type: 'income',
            amount: data.amount,
            description: data.description,
            category_id: data.categoryId,
            account_id: data.accountId,
            date: data.date,
        })
    }

    /**
     * Create an expense transaction.
     */
    async createExpense(
        userId: string,
        data: {
            amount: number
            description: string
            categoryId: string
            accountId: string
            date: string
        }
    ): Promise<Transaction> {
        return this.repository.create({
            user_id: userId,
            type: 'expense',
            amount: data.amount,
            description: data.description,
            category_id: data.categoryId,
            account_id: data.accountId,
            date: data.date,
        })
    }

    /**
     * Delete a transaction.
     */
    async deleteTransaction(id: string): Promise<void> {
        return this.repository.delete(id)
    }

    /**
     * Group expense transactions by category and calculate percentages.
     */
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

export const transactionService = new TransactionService()
