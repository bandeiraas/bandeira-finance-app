import { AppError } from './AppError';
export class NotFoundError extends AppError {
    code = 'NOT_FOUND';
    statusCode = 404;
    constructor(entity, id) {
        super(`${entity} não encontrado${id ? `: ${id}` : ''}`, { entity, id });
    }
}
