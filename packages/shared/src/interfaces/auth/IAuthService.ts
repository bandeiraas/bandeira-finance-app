import type { Result } from '../../types/Result'
import type {
    AuthUser,
    AuthSession,
    AuthResult,
    SignUpData,
    SignInData,
    AuthStateCallback,
    AuthSubscription,
} from '../../types/auth.types'

export type OAuthProvider = 'google'

export interface IAuthService {
    signUp(data: SignUpData): Promise<Result<AuthResult>>
    signIn(data: SignInData): Promise<Result<AuthResult>>
    signInWithOAuth(provider: OAuthProvider): Promise<Result<void>>
    signOut(): Promise<Result<void>>
    resetPassword(email: string): Promise<Result<void>>
    getSession(): Promise<AuthSession | null>
    getCurrentUser(): Promise<AuthUser | null>
    onAuthStateChange(callback: AuthStateCallback): AuthSubscription
}
