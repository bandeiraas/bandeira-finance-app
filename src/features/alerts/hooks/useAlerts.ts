import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { alertRepository } from '../repositories/AlertRepository'
import { useAuth } from '../../auth/providers/AuthProvider'
import { QUERY_KEYS } from '../../../core/constants'

export function useAlerts() {
    const { user } = useAuth()

    return useQuery({
        queryKey: QUERY_KEYS.ALERTS.LIST(user?.id ?? ''),
        queryFn: () => alertRepository.findByUser(user!.id),
        enabled: !!user,
    })
}

export function useUnreadAlertCount() {
    const { user } = useAuth()

    return useQuery({
        queryKey: QUERY_KEYS.ALERTS.UNREAD_COUNT(user?.id ?? ''),
        queryFn: () => alertRepository.getUnreadCount(user!.id),
        enabled: !!user,
    })
}

export function useMarkAlertAsRead() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => alertRepository.markAsRead(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALERTS.ALL })
        },
    })
}

export function useMarkAllAlertsAsRead() {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => alertRepository.markAllAsRead(user!.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALERTS.ALL })
        },
    })
}
