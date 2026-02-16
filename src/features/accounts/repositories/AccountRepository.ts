import { supabase } from '../../../core/config/supabase'
import type { Database } from '../../../core/types/database.types'

type Account = Database['public']['Tables']['accounts']['Row']
type AccountInsert = Database['public']['Tables']['accounts']['Insert']
type AccountUpdate = Database['public']['Tables']['accounts']['Update']

export class AccountRepository {
    async findByUser(userId: string): Promise<Account[]> {
        const { data, error } = await supabase
            .from('accounts')
            .select('*')
            .eq('user_id', userId)
            .order('is_primary', { ascending: false })

        if (error) throw error
        return data
    }

    async findById(id: string): Promise<Account> {
        const { data, error } = await supabase
            .from('accounts')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    }

    async create(account: AccountInsert): Promise<Account> {
        const { data, error } = await supabase
            .from('accounts')
            .insert(account)
            .select()
            .single()

        if (error) throw error
        return data
    }

    async update(id: string, updates: AccountUpdate): Promise<Account> {
        const { data, error } = await supabase
            .from('accounts')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    }

    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('accounts')
            .delete()
            .eq('id', id)

        if (error) throw error
    }

    async getTotalBalance(userId: string): Promise<number> {
        const accounts = await this.findByUser(userId)
        return accounts.reduce((sum, a) => sum + Number(a.balance), 0)
    }
}

export const accountRepository = new AccountRepository()
