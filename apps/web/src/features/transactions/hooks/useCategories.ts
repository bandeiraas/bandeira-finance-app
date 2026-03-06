import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@features/auth/providers/AuthProvider'
import { api } from '@lib/api.ts'
import { QUERY_KEYS } from '@bandeira/shared'

export function useCategories(type?: 'income' | 'expense') {
    const { session } = useAuth()

    return useQuery({
        queryKey: [...QUERY_KEYS.CATEGORIES.ALL, type ?? 'all'],
        queryFn: () => api.categories.list(session!.accessToken, type),
        enabled: !!session,
    })
}
