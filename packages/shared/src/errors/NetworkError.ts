import { AppError } from './AppError'

export class NetworkError extends AppError {
    readonly code = 'NETWORK_ERROR'
    readonly statusCode = 0

    constructor(message = 'Falha na conexão com o servidor') {
        super(message)
    }
}
