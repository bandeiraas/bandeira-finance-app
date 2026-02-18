import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { cardRepository } from '../repositories/CardRepository'
import { useAuth } from '../../auth/providers/AuthProvider'
import { QUERY_KEYS } from '../../../core/constants'

export function useCards() {
    const { user } = useAuth()

    return useQuery({
        queryKey: QUERY_KEYS.CARDS.LIST(user?.id ?? ''),
        queryFn: () => cardRepository.findByUser(user!.id),
        enabled: !!user,
    })
}

export function useCreateCard() {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: {
            brand: string
            last_four: string
            expiry: string
            card_name: string
            credit_limit: number
        }) => cardRepository.create({
            user_id: user!.id,
            ...data
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CARDS.ALL })
        },
    })
}

export function useDeleteCard() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => cardRepository.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CARDS.ALL })
        },
    })
}

