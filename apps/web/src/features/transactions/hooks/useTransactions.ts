import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@features/auth/providers/AuthProvider'
import { api } from '@lib/api.ts'
import { QUERY_KEYS } from '@bandeira/shared'

export function useMonthlySummary(month: number, year: number) {
    const { user, session } = useAuth()

    return useQuery({
        queryKey: QUERY_KEYS.DASHBOARD.SUMMARY(user?.id ?? '', month, year),
        queryFn: () => api.transactions.summary(session!.accessToken, month, year),
        enabled: !!user && !!session,
    })
}

export function useTransactions(limit?: number) {
    const { user, session } = useAuth()

    return useQuery({
        queryKey: QUERY_KEYS.TRANSACTIONS.ALL,
        queryFn: () => api.transactions.list(session!.accessToken, limit),
        enabled: !!user && !!session,
    })
}

export function useCreateIncome() {
    const { session } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: {
            amount: number
            description: string
            categoryId: string
            accountId: string
            date: string
        }) => api.transactions.createIncome(session!.accessToken, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TRANSACTIONS.ALL })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ACCOUNTS.ALL })
        },
    })
}

export function useCreateExpense() {
    const { session } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: {
            amount: number
            description: string
            categoryId: string
            accountId: string
            date: string
        }) => api.transactions.createExpense(session!.accessToken, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TRANSACTIONS.ALL })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ACCOUNTS.ALL })
        },
    })
}

export function useDeleteTransaction() {
    const { session } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => api.transactions.delete(session!.accessToken, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TRANSACTIONS.ALL })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ACCOUNTS.ALL })
        },
    })
}
