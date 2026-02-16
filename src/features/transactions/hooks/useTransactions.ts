import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionService } from '../services/TransactionService'
import { useAuth } from '../../auth/providers/AuthProvider'
import { QUERY_KEYS } from '../../../core/constants'

/**
 * Hook to fetch monthly transactions with summary data.
 */
export function useMonthlySummary(month: number, year: number) {
    const { user } = useAuth()

    return useQuery({
        queryKey: QUERY_KEYS.DASHBOARD.SUMMARY(user?.id ?? '', month, year),
        queryFn: () => transactionService.getMonthlySummary(user!.id, month, year),
        enabled: !!user,
    })
}

/**
 * Hook to fetch recent transactions.
 */
export function useTransactions(limit?: number) {
    const { user } = useAuth()

    return useQuery({
        queryKey: QUERY_KEYS.TRANSACTIONS.ALL,
        queryFn: () => transactionService.getTransactions(user!.id, limit),
        enabled: !!user,
    })
}

/**
 * Hook to create an income transaction.
 */
export function useCreateIncome() {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: {
            amount: number
            description: string
            categoryId: string
            accountId: string
            date: string
        }) => transactionService.createIncome(user!.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TRANSACTIONS.ALL })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ACCOUNTS.ALL })
        },
    })
}

/**
 * Hook to create an expense transaction.
 */
export function useCreateExpense() {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: {
            amount: number
            description: string
            categoryId: string
            accountId: string
            date: string
        }) => transactionService.createExpense(user!.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TRANSACTIONS.ALL })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ACCOUNTS.ALL })
        },
    })
}

/**
 * Hook to delete a transaction.
 */
export function useDeleteTransaction() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => transactionService.deleteTransaction(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TRANSACTIONS.ALL })
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ACCOUNTS.ALL })
        },
    })
}
