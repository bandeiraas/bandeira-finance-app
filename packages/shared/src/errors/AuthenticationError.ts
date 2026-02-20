import { AppError } from './AppError'

export class AuthenticationError extends AppError {
    readonly code = 'AUTH_ERROR'
    readonly statusCode = 401

    constructor(message = 'Não autenticado') {
        super(message)
    }
}
