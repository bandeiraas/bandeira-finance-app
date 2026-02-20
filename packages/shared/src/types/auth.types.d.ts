export interface AuthUser {
    id: string;
    email: string;
    fullName: string | null;
    avatarUrl: string | null;
}
export interface AuthSession {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    user: AuthUser;
}
export interface SignUpData {
    email: string;
    password: string;
    fullName: string;
}
export interface SignInData {
    email: string;
    password: string;
}
export interface AuthResult {
    user: AuthUser;
    session: AuthSession;
}
export type AuthEvent = 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED' | 'PASSWORD_RECOVERY';
export type AuthStateCallback = (event: AuthEvent, session: AuthSession | null) => void;
export interface AuthSubscription {
    unsubscribe: () => void;
}
