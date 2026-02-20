export declare abstract class AppError extends Error {
    abstract readonly code: string;
    abstract readonly statusCode: number;
    readonly timestamp: Date;
    readonly context?: Record<string, unknown>;
    constructor(message: string, context?: Record<string, unknown>);
    static fromUnknown(err: unknown): AppError;
}
export declare class UnexpectedError extends AppError {
    readonly code = "UNEXPECTED_ERROR";
    readonly statusCode = 500;
    constructor(message?: string);
}
