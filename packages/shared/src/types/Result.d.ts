import type { AppError } from '../errors/AppError';
export type Result<T, E = AppError> = {
    success: true;
    data: T;
} | {
    success: false;
    error: E;
};
export declare const Result: {
    ok<T>(data: T): Result<T, never>;
    fail<E>(error: E): Result<never, E>;
};
