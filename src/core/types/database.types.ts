// Auto-generated types placeholder
// In production, run: supabase gen types typescript --local > src/core/types/database.types.ts
// For now, we define the schema manually to match our migrations

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    full_name: string | null
                    avatar_url: string | null
                    phone: string | null
                    username: string | null
                    website: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    full_name?: string | null
                    avatar_url?: string | null
                    phone?: string | null
                    username?: string | null
                    website?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    full_name?: string | null
                    avatar_url?: string | null
                    phone?: string | null
                    username?: string | null
                    website?: string | null
                    updated_at?: string
                }
                Relationships: []
            }
            accounts: {
                Row: {
                    id: string
                    user_id: string
                    bank_name: string
                    account_type: string
                    balance: number
                    color: string | null
                    is_primary: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    bank_name: string
                    account_type: string
                    balance?: number
                    color?: string | null
                    is_primary?: boolean
                    created_at?: string
                }
                Update: {
                    bank_name?: string
                    account_type?: string
                    balance?: number
                    color?: string | null
                    is_primary?: boolean
                }
                Relationships: [
                    {
                        foreignKeyName: 'accounts_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'profiles'
                        referencedColumns: ['id']
                    }
                ]
            }
            categories: {
                Row: {
                    id: string
                    name: string
                    icon: string | null
                    color: string | null
                    type: string
                }
                Insert: {
                    id?: string
                    name: string
                    icon?: string | null
                    color?: string | null
                    type: string
                }
                Update: {
                    name?: string
                    icon?: string | null
                    color?: string | null
                    type?: string
                }
                Relationships: []
            }
            transactions: {
                Row: {
                    id: string
                    user_id: string
                    account_id: string
                    category_id: string | null
                    amount: number
                    type: string
                    description: string | null
                    date: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    account_id: string
                    category_id?: string | null
                    amount: number
                    type: string
                    description?: string | null
                    date?: string
                    created_at?: string
                }
                Update: {
                    account_id?: string
                    category_id?: string | null
                    amount?: number
                    type?: string
                    description?: string | null
                    date?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'transactions_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'profiles'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'transactions_account_id_fkey'
                        columns: ['account_id']
                        isOneToOne: false
                        referencedRelation: 'accounts'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'transactions_category_id_fkey'
                        columns: ['category_id']
                        isOneToOne: false
                        referencedRelation: 'categories'
                        referencedColumns: ['id']
                    }
                ]
            }
            cards: {
                Row: {
                    id: string
                    user_id: string
                    last_four: string
                    brand: string | null
                    expiry: string | null
                    card_name: string | null
                    credit_limit: number | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    last_four: string
                    brand?: string | null
                    expiry?: string | null
                    card_name?: string | null
                    credit_limit?: number | null
                    created_at?: string
                }
                Update: {
                    last_four?: string
                    brand?: string | null
                    expiry?: string | null
                    card_name?: string | null
                    credit_limit?: number | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'cards_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'profiles'
                        referencedColumns: ['id']
                    }
                ]
            }
            invoices: {
                Row: {
                    id: string
                    card_id: string
                    user_id: string
                    period: string | null
                    total: number | null
                    status: string
                    due_date: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    card_id: string
                    user_id: string
                    period?: string | null
                    total?: number | null
                    status?: string
                    due_date?: string | null
                    created_at?: string
                }
                Update: {
                    period?: string | null
                    total?: number | null
                    status?: string
                    due_date?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'invoices_card_id_fkey'
                        columns: ['card_id']
                        isOneToOne: false
                        referencedRelation: 'cards'
                        referencedColumns: ['id']
                    },
                    {
                        foreignKeyName: 'invoices_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'profiles'
                        referencedColumns: ['id']
                    }
                ]
            }
            alerts: {
                Row: {
                    id: string
                    user_id: string
                    type: string | null
                    title: string | null
                    message: string | null
                    is_read: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    type?: string | null
                    title?: string | null
                    message?: string | null
                    is_read?: boolean
                    created_at?: string
                }
                Update: {
                    type?: string | null
                    title?: string | null
                    message?: string | null
                    is_read?: boolean
                }
                Relationships: [
                    {
                        foreignKeyName: 'alerts_user_id_fkey'
                        columns: ['user_id']
                        isOneToOne: false
                        referencedRelation: 'profiles'
                        referencedColumns: ['id']
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

// Helper types for easier access
export type Tables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Update']
