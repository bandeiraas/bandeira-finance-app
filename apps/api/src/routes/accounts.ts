import { Hono } from 'hono'
import type { Env } from '../middleware/auth'
import { getServices } from '../lib/requestContext'
import { validate, createAccountSchema } from '@bandeira/shared'

const ACCOUNT_TYPE_MAP: Record<string, string> = {
    'Conta Corrente': 'corrente',
    'Poupança': 'poupanca',
    'Investimento': 'investimento',
    'Carteira': 'carteira',
}

function normalizeAccountType(label: string): string {
    return ACCOUNT_TYPE_MAP[label] ?? label
}

export const accountsRoutes = new Hono<Env>()

accountsRoutes.get('/', async (c) => {
    const { userId, accountService } = getServices(c)
    const result = await accountService.getAccounts(userId)
    if (!result.success) throw result.error
    return c.json(result.data)
})

accountsRoutes.get('/total-balance', async (c) => {
    const { userId, accountService } = getServices(c)
    const result = await accountService.getTotalBalance(userId)
    if (!result.success) throw result.error
    return c.json({ balance: result.data })
})

accountsRoutes.post('/', async (c) => {
    const { userId, accountService } = getServices(c)
    const raw = await c.req.json<{
        bankName: string
        accountType: string
        balance?: number
        color?: string
        isPrimary?: boolean
    }>()
    const body = { ...raw, accountType: normalizeAccountType(raw.accountType ?? '') }
    const validation = validate(createAccountSchema, body)
    if (!validation.success) {
        return c.json({ error: 'ValidationError', message: validation.error.message, fields: validation.error.fields ?? {} }, 400)
    }
    const result = await accountService.createAccount(userId, validation.data)
    if (!result.success) throw result.error
    return c.json(result.data, 201)
})
