import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, IAlertRepository, Alert } from '@bandeira/shared'
import { SupabaseErrorMapper } from '@bandeira/shared'

export class SupabaseAlertRepository implements IAlertRepository {
    private client: SupabaseClient<Database>
    constructor(client: SupabaseClient<Database>) {
        this.client = client
    }

    async findByUser(userId: string): Promise<Alert[]> {
        const { data, error } = await this.client
            .from('alerts')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Alert')
        return data
    }

    async getUnreadCount(userId: string): Promise<number> {
        const { count, error } = await this.client
            .from('alerts')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('is_read', false)

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Alert')
        return count ?? 0
    }

    async markAsRead(id: string): Promise<void> {
        const { error } = await this.client
            .from('alerts')
            .update({ is_read: true })
            .eq('id', id)

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Alert')
    }

    async markAllAsRead(userId: string): Promise<void> {
        const { error } = await this.client
            .from('alerts')
            .update({ is_read: true })
            .eq('user_id', userId)
            .eq('is_read', false)

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Alert')
    }
}
