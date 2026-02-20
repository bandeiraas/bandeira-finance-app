import { AppError } from './AppError';
export class NetworkError extends AppError {
    code = 'NETWORK_ERROR';
    statusCode = 0;
    constructor(message = 'Falha na conexão com o servidor') {
        super(message);
    }
}
