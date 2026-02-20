import { Hono } from 'hono'
import type { Env } from '../middleware/auth'
import { getServices } from '../lib/requestContext'

export const invoicesRoutes = new Hono<Env>()

invoicesRoutes.get('/', async (c) => {
    const { userId, invoiceService } = getServices(c)
    const result = await invoiceService.getInvoices(userId)
    if (!result.success) throw result.error
    return c.json(result.data)
})

invoicesRoutes.get('/card/:cardId', async (c) => {
    const { invoiceService } = getServices(c)
    const cardId = c.req.param('cardId')
    const result = await invoiceService.getInvoicesByCard(cardId)
    if (!result.success) throw result.error
    return c.json(result.data)
})

invoicesRoutes.patch('/:id/paid', async (c) => {
    const { invoiceService } = getServices(c)
    const id = c.req.param('id')
    const result = await invoiceService.markAsPaid(id)
    if (!result.success) throw result.error
    return c.json(result.data)
})
