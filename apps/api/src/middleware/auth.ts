import { createMiddleware } from 'hono/factory'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@bandeira/shared'
import { createClient } from '@bandeira/database'
import { createClient as createSupabaseAuth } from '@supabase/supabase-js'

export type Env = {
    Variables: {
        userId: string
        supabase: SupabaseClient<Database>
    }
}

export const authMiddleware = createMiddleware<Env>(async (c, next) => {
    const authHeader = c.req.header('Authorization')
    const token = authHeader?.replace(/^Bearer\s+/i, '')

    if (!token) {
        return c.json({ error: 'Unauthorized', message: 'Token ausente' }, 401)
    }

    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_ANON_KEY

    if (!url || !key) {
        return c.json({ error: 'Server error', message: 'Configuração inválida' }, 500)
    }

    const authClient = createSupabaseAuth(url, key)
    const { data: { user }, error } = await authClient.auth.getUser(token)

    if (error || !user) {
        return c.json({ error: 'Unauthorized', message: 'Token inválido' }, 401)
    }

    const supabase = createClient({
        url,
        anonKey: key,
        accessToken: token,
    })

    c.set('userId', user.id)
    c.set('supabase', supabase)
    await next()
})
