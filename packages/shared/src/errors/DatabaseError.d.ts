import { AppError } from './AppError';
export declare class DatabaseError extends AppError {
    readonly code = "DATABASE_ERROR";
    readonly statusCode = 500;
    readonly pgCode?: string;
    constructor(message: string, pgCode?: string);
}
