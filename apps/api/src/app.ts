import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { rateLimiter } from 'hono-rate-limiter'
import { getConnInfo } from '@hono/node-server/conninfo'
import { authMiddleware } from './middleware/auth'
import { errorHandler } from './middleware/error'
import { accountsRoutes } from './routes/accounts'
import { transactionsRoutes } from './routes/transactions'
import { categoriesRoutes } from './routes/categories'
import { alertsRoutes } from './routes/alerts'
import { cardsRoutes } from './routes/cards'
import { invoicesRoutes } from './routes/invoices'
import { profileRoutes } from './routes/profile'

export const app = new Hono()
    .use('*', logger())
    .use(
        '/api/*',
        rateLimiter({
            windowMs: 60 * 1000,
            limit: 100,
            keyGenerator: (c) => {
                if (process.env.TRUST_PROXY === 'true') {
                    return c.req.header('x-forwarded-for') ?? c.req.header('x-real-ip') ?? 'anonymous'
                }
                const info = getConnInfo(c)
                return info.remote.address ?? 'anonymous'
            },
        })
    )
    .use(
        '*',
        cors({
            origin: (() => {
                const env = process.env.CORS_ORIGINS?.split(',').map((o) => o.trim()).filter(Boolean)
                if (env?.length) return env
                return ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost', 'http://localhost:80']
            })(),
        })
    )
    .use('/api/*', authMiddleware)
    .onError(errorHandler)
    .get('/', (c) => c.json({ name: 'Bandeira Finance API', version: '0.0.0' }))
    .get('/health', (c) => c.json({ status: 'ok' }))
    .route('/api/accounts', accountsRoutes)
    .route('/api/transactions', transactionsRoutes)
    .route('/api/categories', categoriesRoutes)
    .route('/api/alerts', alertsRoutes)
    .route('/api/cards', cardsRoutes)
    .route('/api/invoices', invoicesRoutes)
    .route('/api/profile', profileRoutes)

export type AppType = typeof app
