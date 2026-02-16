import { useQuery } from '@tanstack/react-query'
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
