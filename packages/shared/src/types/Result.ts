import type { AppError } from '../errors/AppError'

export type Result<T, E = AppError> =
    | { success: true; data: T }
    | { success: false; error: E }

export const Result = {
    ok<T>(data: T): Result<T, never> {
        return { success: true, data }
    },
    fail<E>(error: E): Result<never, E> {
        return { success: false, error }
    },
}
