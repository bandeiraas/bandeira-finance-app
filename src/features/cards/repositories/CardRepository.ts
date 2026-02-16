import { supabase } from '../../../core/config/supabase'
import type { Database } from '../../../core/types/database.types'

type Card = Database['public']['Tables']['cards']['Row']
type CardInsert = Database['public']['Tables']['cards']['Insert']

export class CardRepository {
    async findByUser(userId: string): Promise<Card[]> {
        const { data, error } = await supabase
            .from('cards')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    }

    async create(card: CardInsert): Promise<Card> {
        const { data, error } = await supabase
            .from('cards')
            .insert(card)
            .select()
            .single()

        if (error) throw error
        return data
    }

    async delete(id: string): Promise<void> {
        const { error } = await supabase
            .from('cards')
            .delete()
            .eq('id', id)

        if (error) throw error
    }
}

export const cardRepository = new CardRepository()
