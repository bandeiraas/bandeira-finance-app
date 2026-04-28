import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, IInvoiceRepository, Invoice } from '@bandeira/shared'
import { SupabaseErrorMapper } from '@bandeira/shared'

export class SupabaseInvoiceRepository implements IInvoiceRepository {
    private client: SupabaseClient<Database>
    constructor(client: SupabaseClient<Database>) {
        this.client = client
    }

    async findByUser(userId: string): Promise<Invoice[]> {
        const { data, error } = await this.client
            .from('invoices')
            .select('*, cards(*)')
            .eq('user_id', userId)
            .order('due_date', { ascending: false })

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Invoice')
        return data
    }

    async findByCard(cardId: string): Promise<Invoice[]> {
        const { data, error } = await this.client
            .from('invoices')
            .select('*')
            .eq('card_id', cardId)
            .order('due_date', { ascending: false })

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Invoice')
        return data
    }

    async updateStatus(id: string, userId: string, status: string): Promise<Invoice> {
        const { data, error } = await this.client
            .from('invoices')
            .update({ status })
            .eq('id', id)
            .eq('user_id', userId)
            .select()
            .single()

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Invoice')
        return data
    }
}
