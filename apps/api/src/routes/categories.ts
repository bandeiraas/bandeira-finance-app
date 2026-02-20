import { Hono } from 'hono'
import type { Env } from '../middleware/auth'
import { getServices } from '../lib/requestContext'
import { validate, categoriesListQuerySchema } from '@bandeira/shared'

export const categoriesRoutes = new Hono<Env>()

categoriesRoutes.get('/', async (c) => {
    const { categoryService } = getServices(c)
    const validation = validate(categoriesListQuerySchema, { type: c.req.query('type') })
    if (!validation.success) {
        return c.json({ error: 'ValidationError', message: validation.error.message, fields: validation.error.fields ?? {} }, 400)
    }
    const type = validation.data.type
    const result = type
        ? await categoryService.getCategoriesByType(type)
        : await categoryService.getCategories()
    if (!result.success) throw result.error
    return c.json(result.data)
})
