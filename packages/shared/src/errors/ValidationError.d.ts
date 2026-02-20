import { AppError } from './AppError';
export declare class ValidationError extends AppError {
    readonly code = "VALIDATION_ERROR";
    readonly statusCode = 400;
    readonly fields: Record<string, string[]>;
    constructor(message: string, fields?: Record<string, string[]>);
}
