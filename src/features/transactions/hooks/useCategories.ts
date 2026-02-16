import { useQuery } from '@tanstack/react-query'
import { categoryRepository } from '../repositories/CategoryRepository'
import { QUERY_KEYS } from '../../../core/constants'

export function useCategories(type?: 'income' | 'expense') {
    return useQuery({
        queryKey: [...QUERY_KEYS.CATEGORIES.ALL, type ?? 'all'],
        queryFn: () =>
            type ? categoryRepository.findByType(type) : categoryRepository.findAll(),
    })
}
