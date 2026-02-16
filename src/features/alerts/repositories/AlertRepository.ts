import { supabase } from '../../../core/config/supabase'
import type { Database } from '../../../core/types/database.types'

type Alert = Database['public']['Tables']['alerts']['Row']

export class AlertRepository {
    async findByUser(userId: string): Promise<Alert[]> {
        const { data, error } = await supabase
            .from('alerts')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    }

    async getUnreadCount(userId: string): Promise<number> {
        const { count, error } = await supabase
            .from('alerts')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('is_read', false)

        if (error) throw error
        return count ?? 0
    }

    async markAsRead(id: string): Promise<void> {
        const { error } = await supabase
            .from('alerts')
            .update({ is_read: true })
            .eq('id', id)

        if (error) throw error
    }

    async markAllAsRead(userId: string): Promise<void> {
        const { error } = await supabase
            .from('alerts')
            .update({ is_read: true })
            .eq('user_id', userId)
            .eq('is_read', false)

        if (error) throw error
    }
}

export const alertRepository = new AlertRepository()
