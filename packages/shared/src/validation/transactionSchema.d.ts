import { z } from 'zod';
export declare const createTransactionSchema: z.ZodObject<{
    amount: z.ZodNumber;
    description: z.ZodString;
    categoryId: z.ZodString;
    accountId: z.ZodString;
    date: z.ZodString;
}, z.core.$strip>;
export type CreateTransactionDTO = z.infer<typeof createTransactionSchema>;
