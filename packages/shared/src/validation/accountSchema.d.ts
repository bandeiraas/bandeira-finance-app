import { z } from 'zod';
export declare const createAccountSchema: z.ZodObject<{
    bankName: z.ZodString;
    accountType: z.ZodEnum<{
        corrente: "corrente";
        poupanca: "poupanca";
        investimento: "investimento";
    }>;
    balance: z.ZodDefault<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
    isPrimary: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type CreateAccountDTO = z.infer<typeof createAccountSchema>;
