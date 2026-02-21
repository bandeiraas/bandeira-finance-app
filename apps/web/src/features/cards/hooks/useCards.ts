import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@features/auth/providers/AuthProvider'
import { api } from '@lib/api.ts'
import { QUERY_KEYS } from '@bandeira/shared'

export function useCards() {
    const { user, session } = useAuth()

    return useQuery({
        queryKey: QUERY_KEYS.CARDS.LIST(user?.id ?? ''),
        queryFn: () => api.cards.list(session!.accessToken),
        enabled: !!user && !!session,
    })
}

export function useCreateCard() {
    const { session } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: {
            brand: string
            last_four: string
            expiry: string
            card_name: string
            credit_limit: number
        }) => api.cards.create(session!.accessToken, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CARDS.ALL })
        },
    })
}

export function useDeleteCard() {
    const { session } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => api.cards.delete(session!.accessToken, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CARDS.ALL })
        },
    })
}
