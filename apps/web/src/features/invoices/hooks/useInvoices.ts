import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@features/auth/providers/AuthProvider'
import { api } from '@lib/api.ts'
import { QUERY_KEYS } from '@bandeira/shared'

export function useInvoices() {
    const { user, session } = useAuth()

    return useQuery({
        queryKey: QUERY_KEYS.INVOICES.LIST(user?.id ?? ''),
        queryFn: () => api.invoices.list(session!.accessToken),
        enabled: !!user && !!session,
    })
}
