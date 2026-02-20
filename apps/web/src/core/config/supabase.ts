import { createClient as createSupabaseClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@bandeira/shared'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        '[Supabase] Missing env variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local'
    )
}

let instance: SupabaseClient<Database> | null = null

export const supabase = (() => {
    if (!instance) {
        instance = createSupabaseClient<Database>(supabaseUrl ?? '', supabaseAnonKey ?? '')
    }
    return instance
})()
