import { supabase } from '../../../core/config/supabase'
import type { Database } from '../../../core/types/database.types'

type Invoice = Database['public']['Tables']['invoices']['Row']

export class InvoiceRepository {
    async findByUser(userId: string): Promise<Invoice[]> {
        const { data, error } = await supabase
            .from('invoices')
            .select('*, cards(*)')
            .eq('user_id', userId)
            .order('due_date', { ascending: false })

        if (error) throw error
        return data
    }

    async findByCard(cardId: string): Promise<Invoice[]> {
        const { data, error } = await supabase
            .from('invoices')
            .select('*')
            .eq('card_id', cardId)
            .order('due_date', { ascending: false })

        if (error) throw error
        return data
    }

    async updateStatus(id: string, status: string): Promise<Invoice> {
        const { data, error } = await supabase
            .from('invoices')
            .update({ status })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    }
}

export const invoiceRepository = new InvoiceRepository()
