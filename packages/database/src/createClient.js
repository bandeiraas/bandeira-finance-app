import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';
export function createClient(options) {
    return createSupabaseClient(options.url, options.anonKey, {
        auth: {
            autoRefreshToken: options.auth?.autoRefreshToken ?? true,
            persistSession: options.auth?.persistSession ?? true,
            detectSessionInUrl: options.auth?.detectSessionInUrl ?? true,
        },
        global: options.accessToken
            ? { headers: { Authorization: `Bearer ${options.accessToken}` } }
            : undefined,
    });
}
