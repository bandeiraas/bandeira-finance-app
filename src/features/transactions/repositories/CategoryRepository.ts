import { supabase } from '../../../core/config/supabase'
import type { Database } from '../../../core/types/database.types'

type Category = Database['public']['Tables']['categories']['Row']

export class CategoryRepository {
    async findAll(): Promise<Category[]> {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name')

        if (error) throw error
        return data
    }

    async findByType(type: 'income' | 'expense'): Promise<Category[]> {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('type', type)
            .order('name')

        if (error) throw error
        return data
    }
}

export const categoryRepository = new CategoryRepository()
