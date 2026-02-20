import { z } from 'zod'
import { ValidationError } from '../errors/ValidationError'
import type { Result } from '../types/Result'
import { Result as R } from '../types/Result'

export function validate<T>(schema: z.ZodSchema<T>, data: unknown): Result<T, ValidationError> {
    const result = schema.safeParse(data)

    if (result.success) {
        return R.ok(result.data)
    }

    const fields: Record<string, string[]> = {}
    for (const issue of result.error.issues) {
        const key = issue.path.join('.') || '_root'
        if (!fields[key]) fields[key] = []
        fields[key].push(issue.message)
    }

    return R.fail(new ValidationError('Dados inválidos', fields))
}
