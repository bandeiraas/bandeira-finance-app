import './loadEnv'
import { serve } from '@hono/node-server'
import { app } from './app'

const port = Number(process.env.PORT) || 3001
serve({ fetch: app.fetch, port })
console.log(`API running at http://localhost:${port}`)
console.log('[API] Env: SUPABASE_URL', process.env.SUPABASE_URL ? '✓' : '✗', '| SUPABASE_ANON_KEY', process.env.SUPABASE_ANON_KEY ? '✓' : '✗')
