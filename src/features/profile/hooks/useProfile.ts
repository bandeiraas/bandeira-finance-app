import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { profileRepository } from '../repositories/ProfileRepository'
import { useAuth } from '../../auth/providers/AuthProvider'
import { QUERY_KEYS } from '../../../core/constants'
import type { Database } from '../../../core/types/database.types'

type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export function useProfile() {
    const { user } = useAuth()

    return useQuery({
        queryKey: QUERY_KEYS.AUTH.PROFILE,
        queryFn: () => profileRepository.findById(user!.id),
        enabled: !!user,
    })
}

export function useUpdateProfile() {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (updates: ProfileUpdate) =>
            profileRepository.update(user!.id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.PROFILE })
        },
    })
}

export function useUploadAvatar() {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (file: File) => profileRepository.uploadAvatar(user!.id, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.PROFILE })
        },
    })
}
