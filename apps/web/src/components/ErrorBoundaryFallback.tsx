import { AlertCircle } from 'lucide-react'

interface ErrorFallbackProps {
    error: unknown
    resetErrorBoundary: () => void
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
    const message = error instanceof Error ? error.message : 'Algo deu errado. Tente novamente.'
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
            <div className="max-w-md w-full p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle size={32} className="text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-xl font-display font-bold text-slate-800 dark:text-white mb-2">Erro inesperado</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{message}</p>
                <button
                    onClick={resetErrorBoundary}
                    className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-colors"
                >
                    Tentar novamente
                </button>
            </div>
        </div>
    )
}
