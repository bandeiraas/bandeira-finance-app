import { Hono } from 'hono'
import type { Env } from '../middleware/auth'
import { getServices } from '../lib/requestContext'
import { validate, createCardSchema } from '@bandeira/shared'

export const cardsRoutes = new Hono<Env>()

cardsRoutes.get('/', async (c) => {
    const { userId, cardService } = getServices(c)
    const result = await cardService.getCards(userId)
    if (!result.success) throw result.error
    return c.json(result.data)
})

cardsRoutes.post('/', async (c) => {
    const { userId, cardService } = getServices(c)
    const body = await c.req.json<unknown>()
    const validation = validate(createCardSchema, body)
    if (!validation.success) {
        return c.json({ error: 'ValidationError', message: validation.error.message, fields: validation.error.fields ?? {} }, 400)
    }
    const result = await cardService.createCard(userId, validation.data)
    if (!result.success) throw result.error
    return c.json(result.data, 201)
})

cardsRoutes.delete('/:id', async (c) => {
    const { cardService } = getServices(c)
    const id = c.req.param('id')
    const result = await cardService.deleteCard(id)
    if (!result.success) throw result.error
    return c.body(null, 204)
})
