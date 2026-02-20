import { AppError } from './AppError';
export class AuthenticationError extends AppError {
    code = 'AUTH_ERROR';
    statusCode = 401;
    constructor(message = 'Não autenticado') {
        super(message);
    }
}
