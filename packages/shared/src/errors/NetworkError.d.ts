import { AppError } from './AppError';
export declare class NetworkError extends AppError {
    readonly code = "NETWORK_ERROR";
    readonly statusCode = 0;
    constructor(message?: string);
}
