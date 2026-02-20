import { z } from 'zod';
export declare const signInSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const signUpSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    fullName: z.ZodString;
}, z.core.$strip>;
export declare const resetPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
export type SignInDTO = z.infer<typeof signInSchema>;
export type SignUpDTO = z.infer<typeof signUpSchema>;
export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>;
