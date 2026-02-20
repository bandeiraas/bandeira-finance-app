import { z } from 'zod';
export const createCardSchema = z.object({
    last_four: z.string()
        .length(4, 'Informe os 4 últimos dígitos')
        .regex(/^\d{4}$/, 'Apenas números são permitidos'),
    brand: z.string().min(1, 'Bandeira é obrigatória'),
    expiry: z.string()
        .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Formato inválido (MM/AA)'),
    card_name: z.string()
        .min(1, 'Nome do cartão é obrigatório')
        .max(50, 'Nome do cartão muito longo'),
    credit_limit: z.number().positive('Limite deve ser positivo'),
});
