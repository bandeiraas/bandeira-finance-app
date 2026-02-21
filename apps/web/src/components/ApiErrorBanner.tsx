import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { AlertCircle, X } from 'lucide-react'
import { getErrorMessage } from '@lib/errorMessages'

export function ApiErrorBanner() {
    const queryClient = useQueryClient()
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const cache = queryClient.getQueryCache()
        const unsub = cache.subscribe((event) => {
            if (event?.type === 'updated' && event.query.state.status === 'error') {
                const err = event.query.state.error
                if (err instanceof Error) setError(err)
                else setError(new Error(String(err)))
            }
        })
        return unsub
    }, [queryClient])

    if (!error) return null

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl shadow-lg">
            <AlertCircle size={24} className="flex-shrink-0 text-red-600 dark:text-red-400" />
            <p className="flex-1 text-sm text-red-800 dark:text-red-200">{getErrorMessage(error)}</p>
            <button
                onClick={() => setError(null)}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/50 rounded transition-colors"
                aria-label="Fechar"
            >
                <X size={18} className="text-red-600 dark:text-red-400" />
            </button>
        </div>
    )
}
