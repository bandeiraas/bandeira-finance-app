import { AppError } from './AppError'

export class NotFoundError extends AppError {
    readonly code = 'NOT_FOUND'
    readonly statusCode = 404

    constructor(entity: string, id?: string) {
        super(
            `${entity} não encontrado${id ? `: ${id}` : ''}`,
            { entity, id }
        )
    }
}
