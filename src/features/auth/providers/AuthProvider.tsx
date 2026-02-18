import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { authService, AuthService } from '../services/AuthService'
import type { AuthUser } from '../../../core/types/models'

interface AuthContextType {
    user: AuthUser | null
    session: Session | null
    isLoading: boolean
    isAuthenticated: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string, fullName: string) => Promise<void>
    signOut: () => Promise<void>
    resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Get initial session
        authService.getSession().then((session) => {
            setSession(session)
            if (session?.user) {
                setUser(AuthService.toAuthUser(session.user))
            }
            setIsLoading(false)
        })

        // Listen for auth changes
        const { data: { subscription } } = authService.onAuthStateChange(
            (_event, session) => {
                console.log('[AuthProvider] Auth state changed:', _event, session?.user?.email)
                setSession(session)
                if (session?.user) {
                    setUser(AuthService.toAuthUser(session.user))
                } else {
                    setUser(null)
                }
                setIsLoading(false)
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    const signIn = useCallback(async (email: string, password: string) => {
        await authService.signIn({ email, password })
    }, [])

    const signUp = useCallback(async (email: string, password: string, fullName: string) => {
        await authService.signUp({ email, password, fullName })
    }, [])

    const signOut = useCallback(async () => {
        await authService.signOut()
        setUser(null)
        setSession(null)
    }, [])

    const resetPassword = useCallback(async (email: string) => {
        await authService.resetPassword(email)
    }, [])

    const value: AuthContextType = {
        user,
        session,
        isLoading,
        isAuthenticated: !!user,
        signIn,
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

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
