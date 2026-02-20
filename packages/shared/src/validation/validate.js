import { z } from 'zod';
import { ValidationError } from '../errors/ValidationError';
import { Result as R } from '../types/Result';
export function validate(schema, data) {
    const result = schema.safeParse(data);
    if (result.success) {
        return R.ok(result.data);
    }
    const fields = {};
    for (const issue of result.error.issues) {
        const key = issue.path.join('.') || '_root';
        if (!fields[key])
            fields[key] = [];
        fields[key].push(issue.message);
    }
    return R.fail(new ValidationError('Dados inválidos', fields));
}
