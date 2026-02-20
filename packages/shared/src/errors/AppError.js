export class AppError extends Error {
    timestamp;
    context;
    constructor(message, context) {
        super(message);
        this.name = this.constructor.name;
        this.timestamp = new Date();
        this.context = context;
    }
    static fromUnknown(err) {
        if (err instanceof AppError)
            return err;
        if (err instanceof Error)
            return new UnexpectedError(err.message);
        return new UnexpectedError(String(err));
    }
}
export class UnexpectedError extends AppError {
    code = 'UNEXPECTED_ERROR';
    statusCode = 500;
    constructor(message = 'Ocorreu um erro inesperado') {
        super(message);
    }
}
