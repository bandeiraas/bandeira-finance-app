import type { Transaction } from '../../types/models'
import type { InsertTables, UpdateTables } from '../../types/database.types'

export interface ITransactionRepository {
    findByUser(userId: string, limit?: number): Promise<Transaction[]>
    findByDateRange(userId: string, startDate: string, endDate: string): Promise<Transaction[]>
    findByCategory(userId: string, categoryId: string): Promise<Transaction[]>
    create(transaction: InsertTables<'transactions'>): Promise<Transaction>
    update(id: string, updates: UpdateTables<'transactions'>): Promise<Transaction>
    delete(userId: string, id: string): Promise<void>
}
