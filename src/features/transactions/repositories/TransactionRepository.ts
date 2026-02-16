import { supabase } from '../../../core/config/supabase'
import type { Database } from '../../../core/types/database.types'
import type { Transaction } from '../../../core/types/models'

type TransactionInsert = Database['public']['Tables']['transactions']['Insert']
type TransactionUpdate = Database['public']['Tables']['transactions']['Update']

export class TransactionRepository {
    async findByUser(userId: string, limit = 50): Promise<Transaction[]> {
        const { data, error } = await supabase
            .from('transactions')
            .select('*, categories(*)')
            .eq('user_id', userId)
            .order('date', { ascending: false })
            .limit(limit)

        if (error) throw error
        return data as Transaction[]
    }

    async findByDateRange(
        userId: string,
        startDate: string,
        endDate: string
    ): Promise<Transaction[]> {
        const { data, error } = await supabase
            .from('transactions')
            .select('*, categories(*)')
            .eq('user_id', userId)
            .gte('date', startDate)
            .lte('date', endDate)
            .order('date', { ascending: false })

        if (error) throw error
        return data as Transaction[]
    }

    async findByCategory(
        userId: string,
        categoryId: string
    ): Promise<Transaction[]> {
        const { data, error } = await supabase
            .from('transactions')
            .select('*, categories(*)')
            .eq('user_id', userId)
            .eq('category_id', categoryId)
            .order('date', { ascending: false })

        if (error) throw error
        return data as Transaction[]
    }

    async create(transaction: TransactionInsert): Promise<Transaction> {
        const { data, error } = await supabase
            .from('transactions')
            .insert(transaction)
            .select('*, categories(*)')
            .single()

        if (error) throw error
        return data as Transaction
    }

    async update(
        id: string,
        updates: TransactionUpdate
    ): Promise<Transaction> {
        const { data, error } = await supabase
            .from('transactions')
            .update(updates)
            .eq('id', id)
            .select('*, categories(*)')
            .single()

        if (error) throw error
        return data as Transaction
    }

    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('transactions')
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}

export const transactionRepository = new TransactionRepository()
