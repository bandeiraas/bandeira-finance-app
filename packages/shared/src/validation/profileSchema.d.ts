import { z } from 'zod';
export declare const updateProfileSchema: z.ZodObject<{
    full_name: z.ZodOptional<z.ZodString>;
    phone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    username: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    website: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;
