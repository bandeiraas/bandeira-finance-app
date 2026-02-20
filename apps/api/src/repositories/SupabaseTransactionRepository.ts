import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, ITransactionRepository, Transaction, InsertTables, UpdateTables } from '@bandeira/shared'
import { SupabaseErrorMapper } from '@bandeira/shared'

export class SupabaseTransactionRepository implements ITransactionRepository {
    private client: SupabaseClient<Database>
    constructor(client: SupabaseClient<Database>) {
        this.client = client
    }

    async findByUser(userId: string, limit = 50): Promise<Transaction[]> {
        const { data, error } = await this.client
            .from('transactions')
            .select('*, categories(*)')
            .eq('user_id', userId)
            .order('date', { ascending: false })
            .limit(limit)

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Transaction')
        return data as Transaction[]
    }

    async findByDateRange(
        userId: string,
        startDate: string,
        endDate: string
    ): Promise<Transaction[]> {
        const { data, error } = await this.client
            .from('transactions')
            .select('*, categories(*)')
            .eq('user_id', userId)
            .gte('date', startDate)
            .lte('date', endDate)
            .order('date', { ascending: false })

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Transaction')
        return data as Transaction[]
    }

    async findByCategory(
        userId: string,
        categoryId: string
    ): Promise<Transaction[]> {
        const { data, error } = await this.client
            .from('transactions')
            .select('*, categories(*)')
            .eq('user_id', userId)
            .eq('category_id', categoryId)
            .order('date', { ascending: false })

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Transaction')
        return data as Transaction[]
    }

    async create(transaction: InsertTables<'transactions'>): Promise<Transaction> {
        const { data, error } = await this.client
            .from('transactions')
            .insert(transaction)
            .select('*, categories(*)')
            .single()

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Transaction')
        return data as Transaction
    }

    async update(id: string, updates: UpdateTables<'transactions'>): Promise<Transaction> {
        const { data, error } = await this.client
            .from('transactions')
            .update(updates)
            .eq('id', id)
            .select('*, categories(*)')
            .single()

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Transaction')
        return data as Transaction
    }

    async delete(id: string): Promise<void> {
        const { error } = await this.client
            .from('transactions')
            .delete()
            .eq('id', id)

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Transaction')
    }
}
