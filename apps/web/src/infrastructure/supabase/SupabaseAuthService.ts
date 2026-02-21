import type { SupabaseClient } from '@supabase/supabase-js'
import type {
    Database,
    IAuthService,
    AuthUser,
    AuthSession,
    AuthResult,
    SignUpData,
    SignInData,
    AuthStateCallback,
    AuthSubscription,
    AuthEvent,
    Result,
} from '@bandeira/shared'
import { ResultUtil as R, AuthenticationError, AppError } from '@bandeira/shared'
import type { User, Session } from '@supabase/supabase-js'

export class SupabaseAuthService implements IAuthService {
    private client: SupabaseClient<Database>
    constructor(client: SupabaseClient<Database>) {
        this.client = client
    }

    async signUp(data: SignUpData): Promise<Result<AuthResult>> {
        const { data: result, error } = await this.client.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: { full_name: data.fullName },
            },
        })

        if (error) return R.fail(this.mapAuthError(error.message))
        if (!result.user || !result.session) {
            return R.fail(new AuthenticationError('Falha ao criar conta'))
        }

        return R.ok({
            user: this.toAuthUser(result.user),
            session: this.toAuthSession(result.session),
        })
    }

    async signIn(data: SignInData): Promise<Result<AuthResult>> {
        const { data: result, error } = await this.client.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        })

        if (error) return R.fail(this.mapAuthError(error.message))

        return R.ok({
            user: this.toAuthUser(result.user),
            session: this.toAuthSession(result.session),
        })
    }

    async signInWithOAuth(provider: 'google'): Promise<Result<void>> {
        try {
            const { error } = await this.client.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/login`,
                },
            })
            if (error) return R.fail(this.mapAuthError(error.message))
            return R.ok(undefined)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async signOut(): Promise<Result<void>> {
        const { error } = await this.client.auth.signOut()
        if (error) return R.fail(this.mapAuthError(error.message))
        return R.ok(undefined)
    }

    async resetPassword(email: string): Promise<Result<void>> {
        const { error } = await this.client.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        })
        if (error) return R.fail(this.mapAuthError(error.message))
        return R.ok(undefined)
    }

    async getSession(): Promise<AuthSession | null> {
        const { data: { session } } = await this.client.auth.getSession()
        return session ? this.toAuthSession(session) : null
    }

    async getCurrentUser(): Promise<AuthUser | null> {
        const { data: { user } } = await this.client.auth.getUser()
        return user ? this.toAuthUser(user) : null
    }

    onAuthStateChange(callback: AuthStateCallback): AuthSubscription {
        const { data: { subscription } } = this.client.auth.onAuthStateChange(
            (event, session) => {
                callback(
                    this.mapAuthEvent(event),
                    session ? this.toAuthSession(session) : null
                )
            }
        )
        return { unsubscribe: () => subscription.unsubscribe() }
    }

    private toAuthUser(user: User): AuthUser {
        const meta = user.user_metadata ?? {}
        // Google OAuth usa 'name' e 'picture'; outros provedores usam 'full_name' e 'avatar_url'
        const fullName = meta.full_name ?? meta.name ?? null
        const avatarUrl = meta.avatar_url ?? meta.picture ?? null
        return {
            id: user.id,
            email: user.email ?? '',
            fullName: typeof fullName === 'string' ? fullName : null,
            avatarUrl: typeof avatarUrl === 'string' ? avatarUrl : null,
        }
    }

    private toAuthSession(session: Session): AuthSession {
        return {
            accessToken: session.access_token,
            refreshToken: session.refresh_token,
            expiresAt: session.expires_at ?? 0,
            user: this.toAuthUser(session.user),
        }
    }

    private mapAuthEvent(event: string): AuthEvent {
        const eventMap: Record<string, AuthEvent> = {
            SIGNED_IN: 'SIGNED_IN',
            SIGNED_OUT: 'SIGNED_OUT',
            TOKEN_REFRESHED: 'TOKEN_REFRESHED',
            PASSWORD_RECOVERY: 'PASSWORD_RECOVERY',
        }
        return eventMap[event] ?? 'SIGNED_IN'
    }

    private mapAuthError(message: string): AppError {
        const messages: Record<string, string> = {
            'Invalid login credentials': 'Email ou senha incorretos.',
            'User already registered': 'Este email já está cadastrado.',
            'Password should be at least 6 characters': 'A senha deve ter pelo menos 6 caracteres.',
            'Email not confirmed': 'Confirme seu email antes de fazer login.',
            'Too many requests': 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
            'Over quota': 'Muitas tentativas. Aguarde 1 hora.',
            'provider_disabled': 'Login com Google não está habilitado. Entre em contato com o suporte.',
            'OAuth provider not enabled': 'Login com Google não está habilitado. Configure no painel do Supabase.',
        }
        return new AuthenticationError(messages[message] ?? message)
    }
}
