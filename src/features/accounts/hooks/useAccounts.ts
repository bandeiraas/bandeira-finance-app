import { useQuery } from '@tanstack/react-query'
import { accountService } from '../services/AccountService'
import { useAuth } from '../../auth/providers/AuthProvider'
import { QUERY_KEYS } from '../../../core/constants'

/**
 * Hook to fetch user accounts.
 */
export function useAccounts() {
    const { user } = useAuth()

    return useQuery({
        queryKey: QUERY_KEYS.ACCOUNTS.LIST(user?.id ?? ''),
        queryFn: () => accountService.getAccounts(user!.id),
        enabled: !!user,
    })
}

/**
 * Hook to get total balance across all accounts.
 */
export function useTotalBalance() {
    const { user } = useAuth()

    return useQuery({
        queryKey: [...QUERY_KEYS.ACCOUNTS.ALL, 'total-balance'],
        queryFn: () => accountService.getTotalBalance(user!.id),
        enabled: !!user,
    })
}
