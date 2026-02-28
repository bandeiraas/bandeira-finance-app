import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, IAccountRepository, Account, InsertTables, UpdateTables } from '@bandeira/shared'
import { SupabaseErrorMapper } from '@bandeira/shared'

export class SupabaseAccountRepository implements IAccountRepository {
    private client: SupabaseClient<Database>
    constructor(client: SupabaseClient<Database>) {
        this.client = client
    }

    async findByUser(userId: string): Promise<Account[]> {
        const { data, error } = await this.client
            .from('accounts')
            .select('*')
            .eq('user_id', userId)
            .order('is_primary', { ascending: false })

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Account')
        return data
    }

    async findById(id: string): Promise<Account | null> {
        const { data, error } = await this.client
            .from('accounts')
            .select('*')
            .eq('id', id)
            .maybeSingle()

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Account')
        return data
    }

    async create(account: InsertTables<'accounts'>): Promise<Account> {
        const { data, error } = await this.client
            .from('accounts')
            .insert(account)
            .select()
            .single()

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Account')
        return data
    }

    async update(id: string, updates: UpdateTables<'accounts'>): Promise<Account> {
        const { data, error } = await this.client
            .from('accounts')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Account')
        return data
    }

    async delete(id: string): Promise<void> {
        const { error } = await this.client
            .from('accounts')
            .delete()
            .eq('id', id)

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Account')
    }

    async getTotalBalance(userId: string): Promise<number> {
        const { data, error } = await this.client
            .from('accounts')
            .select('balance')
            .eq('user_id', userId)

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Account')

        return (data || []).reduce((sum, a) => sum + Number(a.balance), 0)
    }
}
