import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../../auth/providers/AuthProvider.tsx'
import { api } from '@lib/api.ts'
import { QUERY_KEYS } from '@bandeira/shared'

export function useAccounts() {
    const { user, session } = useAuth()

    return useQuery({
        queryKey: QUERY_KEYS.ACCOUNTS.LIST(user?.id ?? ''),
        queryFn: () => api.accounts.list(session!.accessToken),
        enabled: !!user && !!session,
    })
}

export function useTotalBalance() {
    const { user, session } = useAuth()

    return useQuery({
        queryKey: [...QUERY_KEYS.ACCOUNTS.ALL, 'total-balance'],
        queryFn: () => api.accounts.totalBalance(session!.accessToken),
        enabled: !!user && !!session,
    })
}

export function useCreateAccount() {
    const { session } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: {
            bankName: string
            accountType: string
            balance?: number
            color?: string
            isPrimary?: boolean
        }) => api.accounts.create(session!.accessToken, {
            ...data,
            isPrimary: data.isPrimary ?? false,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ACCOUNTS.ALL })
        },
    })
}
