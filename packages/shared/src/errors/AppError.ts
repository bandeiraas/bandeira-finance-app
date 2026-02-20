export abstract class AppError extends Error {
    abstract readonly code: string
    abstract readonly statusCode: number
    readonly timestamp: Date
    readonly context?: Record<string, unknown>

    constructor(message: string, context?: Record<string, unknown>) {
        super(message)
        this.name = this.constructor.name
        this.timestamp = new Date()
        this.context = context
    }

    static fromUnknown(err: unknown): AppError {
        if (err instanceof AppError) return err
        if (err instanceof Error) return new UnexpectedError(err.message)
        return new UnexpectedError(String(err))
    }
}

export class UnexpectedError extends AppError {
    readonly code = 'UNEXPECTED_ERROR'
    readonly statusCode = 500

    constructor(message = 'Ocorreu um erro inesperado') {
        super(message)
    }
}
