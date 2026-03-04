import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@features/auth/providers/AuthProvider'
import { api } from '@lib/api.ts'
import { QUERY_KEYS } from '@bandeira/shared'

export function useAlerts() {
    const { user, session } = useAuth()

    return useQuery({
        queryKey: QUERY_KEYS.ALERTS.LIST(user?.id ?? ''),
        queryFn: () => api.alerts.list(session!.accessToken),
        enabled: !!user && !!session,
    })
}

export function useUnreadAlertCount() {
    const { user, session } = useAuth()

    return useQuery({
        queryKey: QUERY_KEYS.ALERTS.UNREAD_COUNT(user?.id ?? ''),
        queryFn: () => api.alerts.unreadCount(session!.accessToken),
        enabled: !!user && !!session,
    })
}

export function useMarkAlertAsRead() {
    const { session } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => api.alerts.markAsRead(session!.accessToken, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALERTS.ALL })
        },
    })
}

export function useMarkAllAlertsAsRead() {
    const { session } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => api.alerts.markAllAsRead(session!.accessToken),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALERTS.ALL })
        },
    })
}
