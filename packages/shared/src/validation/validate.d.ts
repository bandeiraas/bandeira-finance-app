import { z } from 'zod';
import { ValidationError } from '../errors/ValidationError';
import type { Result } from '../types/Result';
export declare function validate<T>(schema: z.ZodSchema<T>, data: unknown): Result<T, ValidationError>;
