import type {
    IAuthService,
    AuthUser,
    AuthSession,
    AuthResult,
    SignUpData,
    SignInData,
    AuthStateCallback,
    AuthSubscription,
    Result,
} from '@bandeira/shared'
import { ResultUtil as R, AuthenticationError } from '@bandeira/shared'

export class FakeAuthService implements IAuthService {
    private currentUser: AuthUser | null = null
    private currentSession: AuthSession | null = null
    private listeners: AuthStateCallback[] = []

    async signUp(data: SignUpData): Promise<Result<AuthResult>> {
        this.currentUser = {
            id: crypto.randomUUID(),
            email: data.email,
            fullName: data.fullName,
            avatarUrl: null,
        }
        this.currentSession = this.makeSession(this.currentUser)
        this.notify('SIGNED_IN', this.currentSession)
        return R.ok({ user: this.currentUser, session: this.currentSession })
    }

    async signIn(data: SignInData): Promise<Result<AuthResult>> {
        if (data.password.length < 6) {
            return R.fail(new AuthenticationError('Senha deve ter pelo menos 6 caracteres'))
        }
        this.currentUser = {
            id: crypto.randomUUID(),
            email: data.email,
            fullName: 'Test User',
            avatarUrl: null,
        }
        this.currentSession = this.makeSession(this.currentUser)
        this.notify('SIGNED_IN', this.currentSession)
        return R.ok({ user: this.currentUser, session: this.currentSession })
    }

    async signOut(): Promise<Result<void>> {
        this.currentUser = null
        this.currentSession = null
        this.notify('SIGNED_OUT', null)
        return R.ok(undefined)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- interface requires param
    async resetPassword(_email: string): Promise<Result<void>> {
        return R.ok(undefined)
    }

    async getSession(): Promise<AuthSession | null> {
        return this.currentSession
    }

    async getCurrentUser(): Promise<AuthUser | null> {
        return this.currentUser
    }

    onAuthStateChange(callback: AuthStateCallback): AuthSubscription {
        this.listeners.push(callback)
        return {
            unsubscribe: () => {
                this.listeners = this.listeners.filter(l => l !== callback)
            },
        }
    }

    private notify(event: 'SIGNED_IN' | 'SIGNED_OUT', session: AuthSession | null): void {
        for (const listener of this.listeners) {
            listener(event, session)
        }
    }

    private makeSession(user: AuthUser): AuthSession {
        return {
            accessToken: 'fake-access-token',
            refreshToken: 'fake-refresh-token',
            expiresAt: Date.now() + 3600_000,
            user,
        }
    }
}
