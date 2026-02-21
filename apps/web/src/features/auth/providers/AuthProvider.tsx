import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { AuthUser, AuthSession } from '@bandeira/shared'
import { SupabaseAuthService } from '@infrastructure/supabase/SupabaseAuthService'
import { supabase } from '@core/config/supabase'

const authService = new SupabaseAuthService(supabase)

interface AuthContextType {
    user: AuthUser | null
    session: AuthSession | null
    isLoading: boolean
    isAuthenticated: boolean
    signIn: (email: string, password: string) => Promise<void>
    signInWithOAuth: (provider: 'google') => Promise<void>
    signUp: (email: string, password: string, fullName: string) => Promise<void>
    signOut: () => Promise<void>
    resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const queryClient = useQueryClient()
    const [user, setUser] = useState<AuthUser | null>(null)
    const [session, setSession] = useState<AuthSession | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        authService.getSession().then((s) => {
            setSession(s)
            if (s?.user) {
                setUser(s.user)
            }
            setIsLoading(false)
        })

        const subscription = authService.onAuthStateChange((_event, s) => {
            setSession(s)
            setUser(s?.user ?? null)
            setIsLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const signIn = useCallback(async (email: string, password: string) => {
        const result = await authService.signIn({ email, password })
        if (!result.success) throw result.error
    }, [])

    const signInWithOAuth = useCallback(async (provider: 'google') => {
        const result = await authService.signInWithOAuth(provider)
        if (!result.success) throw result.error
    }, [])

    const signUp = useCallback(async (email: string, password: string, fullName: string) => {
        const result = await authService.signUp({ email, password, fullName })
        if (!result.success) throw result.error
    }, [])

    const signOut = useCallback(async () => {
        const result = await authService.signOut()
        if (!result.success) throw result.error
        setUser(null)
        setSession(null)
        queryClient.clear() // Evita vazamento de dados do usuário anterior
    }, [queryClient])

    const resetPassword = useCallback(async (email: string) => {
        const result = await authService.resetPassword(email)
        if (!result.success) throw result.error
    }, [])

    const value: AuthContextType = {
        user,
        session,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signInWithOAuth,
        signUp,
        signOut,
        resetPassword,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components -- hook exported from provider
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
