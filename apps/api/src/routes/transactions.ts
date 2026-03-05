import { Hono } from 'hono'
import type { Env } from '../middleware/auth'
import { getServices } from '../lib/requestContext'
import {
    validate,
    createTransactionSchema,
    transactionsListQuerySchema,
    transactionsSummaryQuerySchema,
} from '@bandeira/shared'

export const transactionsRoutes = new Hono<Env>()

transactionsRoutes.get('/', async (c) => {
    const { userId, transactionService } = getServices(c)
    const validation = validate(transactionsListQuerySchema, { limit: c.req.query('limit') })
    if (!validation.success) {
        return c.json({ error: 'ValidationError', message: validation.error.message, fields: validation.error.fields ?? {} }, 400)
    }
    const limit = validation.data.limit
    const result = await transactionService.getTransactions(userId, limit)
    if (!result.success) throw result.error
    return c.json(result.data)
})

transactionsRoutes.get('/summary', async (c) => {
    const { userId, transactionService } = getServices(c)
    const query = {
        month: c.req.query('month') ?? String(new Date().getMonth() + 1),
        year: c.req.query('year') ?? String(new Date().getFullYear()),
    }
    const validation = validate(transactionsSummaryQuerySchema, query)
    if (!validation.success) {
        return c.json({ error: 'ValidationError', message: validation.error.message, fields: validation.error.fields ?? {} }, 400)
    }
    const monthIndex = validation.data.month - 1
    const result = await transactionService.getMonthlySummary(userId, monthIndex, validation.data.year)
    if (!result.success) throw result.error
    return c.json(result.data)
})

transactionsRoutes.post('/income', async (c) => {
    const { userId, transactionService } = getServices(c)
    const body = await c.req.json<unknown>()
    const validation = validate(createTransactionSchema, body)
    if (!validation.success) {
        return c.json({ error: 'ValidationError', message: validation.error.message, fields: validation.error.fields ?? {} }, 400)
    }
    const result = await transactionService.createIncome(userId, validation.data)
    if (!result.success) throw result.error
    return c.json(result.data, 201)
})

transactionsRoutes.post('/expense', async (c) => {
    const { userId, transactionService } = getServices(c)
    const body = await c.req.json<unknown>()
    const validation = validate(createTransactionSchema, body)
    if (!validation.success) {
        return c.json({ error: 'ValidationError', message: validation.error.message, fields: validation.error.fields ?? {} }, 400)
    }
    const result = await transactionService.createExpense(userId, validation.data)
    if (!result.success) throw result.error
    return c.json(result.data, 201)
})

transactionsRoutes.delete('/:id', async (c) => {
    const { transactionService } = getServices(c)
    const id = c.req.param('id')
    const result = await transactionService.deleteTransaction(id)
    if (!result.success) throw result.error
    return c.body(null, 204)
})
