import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@bandeira/shared'

export interface CreateClientOptions {
    url: string
    anonKey: string
    auth?: {
        autoRefreshToken?: boolean
        persistSession?: boolean
        detectSessionInUrl?: boolean
    }
    accessToken?: string
}

export function createClient(options: CreateClientOptions): SupabaseClient<Database> {
    return createSupabaseClient<Database>(options.url, options.anonKey, {
        auth: {
            autoRefreshToken: options.auth?.autoRefreshToken ?? true,
            persistSession: options.auth?.persistSession ?? true,
            detectSessionInUrl: options.auth?.detectSessionInUrl ?? true,
        },
        global: options.accessToken
            ? { headers: { Authorization: `Bearer ${options.accessToken}` } }
            : undefined,
    })
}
