import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@bandeira/shared';
export interface CreateClientOptions {
    url: string;
    anonKey: string;
    auth?: {
        autoRefreshToken?: boolean;
        persistSession?: boolean;
        detectSessionInUrl?: boolean;
    };
    accessToken?: string;
}
export declare function createClient(options: CreateClientOptions): SupabaseClient<Database>;
