import { Hono } from 'hono'
import type { Env } from '../middleware/auth'
import { getServices } from '../lib/requestContext'

export const alertsRoutes = new Hono<Env>()

alertsRoutes.get('/', async (c) => {
    const { userId, alertService } = getServices(c)
    const result = await alertService.getAlerts(userId)
    if (!result.success) throw result.error
    return c.json(result.data)
})

alertsRoutes.get('/unread-count', async (c) => {
    const { userId, alertService } = getServices(c)
    const result = await alertService.getUnreadCount(userId)
    if (!result.success) throw result.error
    return c.json({ count: result.data })
})

alertsRoutes.post('/mark-all-read', async (c) => {
    const { userId, alertService } = getServices(c)
    const result = await alertService.markAllAsRead(userId)
    if (!result.success) throw result.error
    return c.body(null, 204)
})

alertsRoutes.patch('/:id/read', async (c) => {
    const { userId, alertService } = getServices(c)
    const id = c.req.param('id')
    const result = await alertService.markAsRead(id, userId)
    if (!result.success) throw result.error
    return c.body(null, 204)
})
