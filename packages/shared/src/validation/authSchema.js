import { z } from 'zod';
export const signInSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});
export const signUpSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string()
        .min(6, 'Senha deve ter pelo menos 6 caracteres')
        .max(72, 'Senha muito longa'),
    fullName: z.string()
        .min(2, 'Nome deve ter pelo menos 2 caracteres')
        .max(100, 'Nome muito longo'),
});
export const resetPasswordSchema = z.object({
    email: z.string().email('Email inválido'),
});
