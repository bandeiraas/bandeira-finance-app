import { AppError } from './AppError';
export class ValidationError extends AppError {
    code = 'VALIDATION_ERROR';
    statusCode = 400;
    fields;
    constructor(message, fields = {}) {
        super(message, { fields });
        this.fields = fields;
    }
}
