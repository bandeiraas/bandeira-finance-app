import { supabase } from '../../../core/config/supabase'
import type { AuthUser } from '../../../core/types/models'
import type { User, AuthError, Session } from '@supabase/supabase-js'

export interface SignUpData {
    email: string
    password: string
    fullName: string
}

export interface SignInData {
    email: string
    password: string
}

export interface AuthResult {
    user: User | null
    session: Session | null
}

export class AuthService {
    /**
     * Register a new user with email, password and full name.
     * The profile is created automatically via a database trigger.
     */
    async signUp(data: SignUpData): Promise<AuthResult> {
        const { data: result, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: { full_name: data.fullName },
            },
        })

        if (error) throw this.handleAuthError(error)
        return { user: result.user, session: result.session }
    }

    /**
     * Sign in with email and password.
     */
    async signIn(data: SignInData): Promise<AuthResult> {
        const { data: result, error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        })

        if (error) throw this.handleAuthError(error)
        return { user: result.user, session: result.session }
    }

    /**
     * Sign out the current user.
     */
    async signOut(): Promise<void> {
        const { error } = await supabase.auth.signOut()
        if (error) throw this.handleAuthError(error)
    }

    /**
     * Send a password reset email.
     */
    async resetPassword(email: string): Promise<void> {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        })
        if (error) throw this.handleAuthError(error)
    }

    /**
     * Get the current session from storage.
     */
    async getSession(): Promise<Session | null> {
        const { data: { session } } = await supabase.auth.getSession()
        return session
    }

    /**
     * Get the current authenticated user.
     */
    async getUser(): Promise<User | null> {
        const { data: { user } } = await supabase.auth.getUser()
        return user
    }

    /**
     * Subscribe to auth state changes.
     * Returns an unsubscribe function.
     */
    onAuthStateChange(
        callback: (event: string, session: Session | null) => void
    ) {
        return supabase.auth.onAuthStateChange(callback)
    }

    /**
     * Map a Supabase User to our AuthUser domain model.
     */
    static toAuthUser(user: User): AuthUser {
        return {
            id: user.id,
            email: user.email ?? '',
            fullName: user.user_metadata?.full_name ?? null,
            avatarUrl: user.user_metadata?.avatar_url ?? null,
        }
    }

    /**
     * Translate Supabase auth errors to user-friendly messages.
     */
    private handleAuthError(error: AuthError): Error {
        const messages: Record<string, string> = {
            'Invalid login credentials': 'Email ou senha incorretos.',
            'User already registered': 'Este email já está cadastrado.',
            'Password should be at least 6 characters':
                'A senha deve ter pelo menos 6 caracteres.',
            'Email not confirmed': 'Confirme seu email antes de fazer login.',
        }

        const message = messages[error.message] ?? error.message
        return new Error(message)
    }
}

// Singleton instance
export const authService = new AuthService()
