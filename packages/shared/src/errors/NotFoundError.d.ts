import { AppError } from './AppError';
export declare class NotFoundError extends AppError {
    readonly code = "NOT_FOUND";
    readonly statusCode = 404;
    constructor(entity: string, id?: string);
}
