import { supabase } from '../../../core/config/supabase'
import type { Database } from '../../../core/types/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']
type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export class ProfileRepository {
    async findById(userId: string): Promise<Profile> {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

        if (error) throw error
        return data
    }

    async update(userId: string, updates: ProfileUpdate): Promise<Profile> {
        const { data, error } = await supabase
            .from('profiles')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', userId)
            .select()
            .single()

        if (error) throw error
        return data
    }

    async uploadAvatar(userId: string, file: File): Promise<string> {
        const ext = file.name.split('.').pop()
        const path = `avatars/${userId}/${Date.now()}.${ext}`

        const { error: uploadError } = await supabase.storage
            .from('user-files')
            .upload(path, file, { upsert: true })

        if (uploadError) throw uploadError

        const { data } = supabase.storage.from('user-files').getPublicUrl(path)

        // Update profile with new avatar URL
        await this.update(userId, { avatar_url: data.publicUrl })

        return data.publicUrl
    }
}

export const profileRepository = new ProfileRepository()
