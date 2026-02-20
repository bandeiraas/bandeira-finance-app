import { z } from 'zod';
export const updateProfileSchema = z.object({
    full_name: z.string()
        .min(2, 'Nome deve ter pelo menos 2 caracteres')
        .max(100, 'Nome muito longo')
        .optional(),
    phone: z.string().max(20, 'Telefone muito longo').optional().nullable(),
    username: z.string()
        .min(3, 'Username deve ter pelo menos 3 caracteres')
        .max(30, 'Username muito longo')
        .regex(/^[a-zA-Z0-9_]+$/, 'Apenas letras, números e underscore')
        .optional()
        .nullable(),
    website: z.string().url('URL inválida').optional().nullable(),
});
