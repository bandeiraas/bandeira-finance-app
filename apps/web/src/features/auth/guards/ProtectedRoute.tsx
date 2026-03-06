import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@features/auth/providers/AuthProvider'

/**
 * Guard component that protects routes requiring authentication.
 * Redirects to /login if the user is not authenticated.
 * Preserves the intended destination for redirect after login.
 */
export function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth()
    const location = useLocation()

    if (isLoading) {
        return (
            <div className="min-h-screen bg-mesh flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-slate-400 font-medium">Carregando...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <Outlet />
}
