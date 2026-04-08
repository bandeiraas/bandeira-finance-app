import { Hono } from 'hono'
import { bodyLimit } from 'hono/body-limit'
import type { Env } from '../middleware/auth'
import { getServices } from '../lib/requestContext'
import { validate, updateProfileSchema } from '@bandeira/shared'

export const profileRoutes = new Hono<Env>()

profileRoutes.get('/', async (c) => {
    const { userId, profileService } = getServices(c)
    const result = await profileService.getProfile(userId)
    if (!result.success) throw result.error
    return c.json(result.data)
})

profileRoutes.patch('/', async (c) => {
    const { userId, profileService } = getServices(c)
    const body = await c.req.json<unknown>()
    const validation = validate(updateProfileSchema, body)
    if (!validation.success) {
        return c.json({ error: 'ValidationError', message: validation.error.message, fields: validation.error.fields ?? {} }, 400)
    }
    const result = await profileService.updateProfile(userId, validation.data)
    if (!result.success) throw result.error
    return c.json(result.data)
})

profileRoutes.post(
    '/avatar',
    bodyLimit({
        maxSize: 5 * 1024 * 1024, // 5MB
        onError: (c) => {
            return c.json({ error: 'Payload Too Large' }, 413)
        },
    }),
    async (c) => {
        const { userId, profileService } = getServices(c)
        const formData = await c.req.formData()
        const file = formData.get('file') as File | null
        if (!file || !(file instanceof File)) {
            return c.json({ error: 'File required' }, 400)
        }
        const result = await profileService.uploadAvatar(userId, file)
        if (!result.success) throw result.error
        return c.json({ avatarUrl: result.data }, 201)
    }
)
