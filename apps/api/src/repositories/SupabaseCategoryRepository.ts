import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, ICategoryRepository, Category } from '@bandeira/shared'
import { SupabaseErrorMapper } from '@bandeira/shared'

export class SupabaseCategoryRepository implements ICategoryRepository {
    private client: SupabaseClient<Database>
    constructor(client: SupabaseClient<Database>) {
        this.client = client
    }

    async findAll(): Promise<Category[]> {
        const { data, error } = await this.client
            .from('categories')
            .select('*')
            .order('name')

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Category')
        return data
    }

    async findByType(type: 'income' | 'expense'): Promise<Category[]> {
        const { data, error } = await this.client
            .from('categories')
            .select('*')
            .eq('type', type)
            .order('name')

        if (error) throw SupabaseErrorMapper.toAppError(error, 'Category')
        return data
    }
}
