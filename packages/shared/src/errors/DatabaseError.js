import { AppError } from './AppError';
export class DatabaseError extends AppError {
    code = 'DATABASE_ERROR';
    statusCode = 500;
    pgCode;
    constructor(message, pgCode) {
        super(message, { pgCode });
        this.pgCode = pgCode;
    }
}
