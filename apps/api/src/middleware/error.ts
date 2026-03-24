import type { Context } from 'hono'
import type { AppError } from '@bandeira/shared'
import {
    ValidationError,
    AuthenticationError,
    NotFoundError,
    NetworkError,
    DatabaseError,
} from '@bandeira/shared'

export function errorHandler(err: Error, c: Context) {
    if (err instanceof ValidationError) {
        return c.json(
            { error: 'ValidationError', message: err.message, fields: err.fields ?? {} },
            400
        )
    }
    if (err instanceof AuthenticationError) {
        return c.json({ error: 'AuthenticationError', message: err.message }, 401)
    }
    if (err instanceof NotFoundError) {
        return c.json({ error: 'NotFoundError', message: err.message }, 404)
    }
    if (err instanceof NetworkError) {
        return c.json({ error: 'NetworkError', message: err.message }, 503)
    }
    if (err instanceof DatabaseError) {
        return c.json({ error: 'DatabaseError', message: err.message }, 500)
    }
    if (err instanceof Error && 'statusCode' in err) {
        const appErr = err as AppError
        const status = Math.min(599, Math.max(400, appErr.statusCode)) as 400 | 401 | 404 | 500 | 503
        return c.json({ error: appErr.code, message: err.message }, { status })
    }

    // Sanitize error before logging to prevent leaking sensitive credentials/PII
    let sanitizedError: unknown = err
    if (err && typeof err === 'object') {
        const safeErr = err as unknown as Record<string, unknown>
        sanitizedError = {
            name: safeErr.name,
            message: safeErr.message,
            stack: safeErr.stack,
            code: safeErr.code,
            statusCode: safeErr.statusCode,
        }
    }
    console.error('[API Error]', sanitizedError)

    const isDev = process.env.NODE_ENV !== 'production'
    return c.json(
        { error: 'InternalError', message: isDev ? (err instanceof Error ? err.message : String(err)) : 'Erro interno do servidor' },
        500
    )
}
