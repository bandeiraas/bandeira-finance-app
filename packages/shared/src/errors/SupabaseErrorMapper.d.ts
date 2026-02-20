import { AppError } from './AppError';
export declare class SupabaseErrorMapper {
    static toAppError(error: unknown, entity?: string): AppError;
}
