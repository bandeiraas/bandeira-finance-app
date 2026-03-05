import type { ITransactionRepository, Transaction, InsertTables, UpdateTables } from '@bandeira/shared'

export class InMemoryTransactionRepository implements ITransactionRepository {
    private transactions: Transaction[] = []

    async findByUser(userId: string, limit = 50): Promise<Transaction[]> {
        return this.transactions
            .filter(t => t.user_id === userId)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, limit)
    }

    async findByDateRange(userId: string, startDate: string, endDate: string): Promise<Transaction[]> {
        const start = startDate.slice(0, 10)
        const end = endDate.slice(0, 10)
        return this.transactions.filter(t => {
            const d = t.date.slice(0, 10)
            return t.user_id === userId && d >= start && d <= end
        })
    }

    async findByCategory(userId: string, categoryId: string): Promise<Transaction[]> {
        return this.transactions.filter(t =>
            t.user_id === userId && t.category_id === categoryId
        )
    }

    async create(transaction: InsertTables<'transactions'>): Promise<Transaction> {
        const newTransaction: Transaction = {
            id: transaction.id ?? crypto.randomUUID(),
            user_id: transaction.user_id,
            account_id: transaction.account_id,
            category_id: transaction.category_id ?? null,
            amount: transaction.amount,
            type: transaction.type,
            description: transaction.description ?? null,
            date: transaction.date ?? new Date().toISOString().split('T')[0],
            created_at: transaction.created_at ?? new Date().toISOString(),
            categories: null,
        }
        this.transactions.push(newTransaction)
        return newTransaction
    }

    async update(id: string, updates: UpdateTables<'transactions'>): Promise<Transaction> {
        const index = this.transactions.findIndex(t => t.id === id)
        if (index === -1) throw new Error('Transaction not found')
        this.transactions[index] = { ...this.transactions[index], ...updates }
        return this.transactions[index]
    }

    async delete(id: string, userId: string): Promise<void> {
        this.transactions = this.transactions.filter(t => !(t.id === id && t.user_id === userId))
    }

    seed(transactions: Transaction[]): void {
        this.transactions = [...transactions]
    }

    clear(): void {
        this.transactions = []
    }
}
