import { z } from 'zod';
export declare const createCardSchema: z.ZodObject<{
    last_four: z.ZodString;
    brand: z.ZodString;
    expiry: z.ZodString;
    card_name: z.ZodString;
    credit_limit: z.ZodNumber;
}, z.core.$strip>;
export type CreateCardDTO = z.infer<typeof createCardSchema>;
