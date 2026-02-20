import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../../auth/providers/AuthProvider.tsx'
import { api } from '@lib/api.ts'
import { QUERY_KEYS, type UpdateTables } from '@bandeira/shared'

export function useProfile() {
    const { user, session } = useAuth()

    return useQuery({
        queryKey: QUERY_KEYS.AUTH.PROFILE,
        queryFn: () => api.profile.get(session!.accessToken),
        enabled: !!user && !!session,
    })
}

export function useUpdateProfile() {
    const { session } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (updates: UpdateTables<'profiles'>) => api.profile.update(session!.accessToken, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.PROFILE })
        },
    })
}

export function useUploadAvatar() {
    const { session } = useAuth()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (file: File) => api.profile.uploadAvatar(session!.accessToken, file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.PROFILE })
        },
    })
}
