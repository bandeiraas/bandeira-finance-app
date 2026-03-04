import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, ICardRepository, Card, InsertTables } from '@bandeira/shared'
import { SupabaseErrorMapper } from '@bandeira/shared'

export class SupabaseCardRepository implements ICardRepository {
    private client: SupabaseClient<Database>
    constructor(client: SupabaseClient<Database>) {
        this.client = client
    }

    async findByUser(userId: string): Promise<Card[]> {
        const { data, error } = await this.client
            .from('cards')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Card')
        return data
    }

    async create(card: InsertTables<'cards'>): Promise<Card> {
        const { data, error } = await this.client
            .from('cards')
            .insert(card)
            .select()
            .single()

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Card')
        return data
    }

    async delete(id: string, userId: string): Promise<void> {
        const { error } = await this.client
            .from('cards')
            .delete()
            .eq('id', id)
            .eq('user_id', userId)

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Card')
    }
}
