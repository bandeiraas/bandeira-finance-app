import { AppError } from './AppError';
import { NotFoundError } from './NotFoundError';
import { NetworkError } from './NetworkError';
import { AuthenticationError } from './AuthenticationError';
import { DatabaseError } from './DatabaseError';
function isPostgrestError(err) {
    return (typeof err === 'object' &&
        err !== null &&
        'message' in err &&
        typeof err.message === 'string');
}
export class SupabaseErrorMapper {
    static toAppError(error, entity) {
        if (error instanceof AppError)
            return error;
        if (isPostgrestError(error)) {
            if (error.code === 'PGRST116') {
                return new NotFoundError(entity ?? 'Registro');
            }
            if (error.code === '42501') {
                return new AuthenticationError('Sem permissão para esta operação');
            }
            if (error.code === '23505') {
                return new DatabaseError('Registro duplicado', error.code);
            }
            if (error.code === '23503') {
                return new DatabaseError('Referência inválida — registro relacionado não existe', error.code);
            }
            return new DatabaseError(error.message, error.code);
        }
        if (error instanceof Error && error.message.includes('fetch')) {
            return new NetworkError();
        }
        return AppError.fromUnknown(error);
    }
}
