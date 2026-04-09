import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, IProfileRepository, Profile, UpdateTables } from '@bandeira/shared'
import { SupabaseErrorMapper } from '@bandeira/shared'

export class SupabaseProfileRepository implements IProfileRepository {
    private client: SupabaseClient<Database>
    constructor(client: SupabaseClient<Database>) {
        this.client = client
    }

    async findById(userId: string): Promise<Profile | null> {
        const { data, error } = await this.client
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle()

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Profile')
        return data
    }

    async update(userId: string, updates: UpdateTables<'profiles'>): Promise<Profile> {
        const { data, error } = await this.client
            .from('profiles')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', userId)
            .select()
            .single()

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Profile')
        return data
    }

    async uploadAvatar(userId: string, file: File): Promise<string> {
        // Derive extension from verified MIME type rather than user-supplied file name to prevent path traversal
        const mimeTypeToExt: Record<string, string> = {
            'image/jpeg': 'jpeg',
            'image/png': 'png',
            'image/webp': 'webp'
        }
        const ext = mimeTypeToExt[file.type] || 'bin'
        const path = `avatars/${userId}/${Date.now()}.${ext}`

        const { error: uploadError } = await this.client.storage
            .from('user-files')
            .upload(path, file, { upsert: true })

        if (uploadError) throw SupabaseErrorMapper.toAppError(uploadError, 'Avatar')

        const { data } = this.client.storage.from('user-files').getPublicUrl(path)

        await this.update(userId, { avatar_url: data.publicUrl })

        return data.publicUrl
    }
}
