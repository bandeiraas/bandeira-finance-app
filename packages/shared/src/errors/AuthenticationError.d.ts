import { AppError } from './AppError';
export declare class AuthenticationError extends AppError {
    readonly code = "AUTH_ERROR";
    readonly statusCode = 401;
    constructor(message?: string);
}
