import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        '[Supabase] Missing env variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local'
    )
}

class SupabaseClientSingleton {
    private static instance: SupabaseClient<Database> | null = null

    static getInstance(): SupabaseClient<Database> {
        if (!this.instance) {
            this.instance = createClient<Database>(
                supabaseUrl ?? '',
                supabaseAnonKey ?? '',
                {
                    auth: {
                        autoRefreshToken: true,
                        persistSession: true,
                        detectSessionInUrl: true,
                    },
                }
            )
        }
        return this.instance
    }

    // Prevent instantiation
    private constructor() { }
}

export const supabase = SupabaseClientSingleton.getInstance()
