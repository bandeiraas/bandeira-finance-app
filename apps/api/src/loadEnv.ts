import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { existsSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const roots = [
    resolve(process.cwd(), '.env.local'),
    resolve(__dirname, '../../.env.local'),
    resolve(process.cwd(), '../.env.local'),
]
for (const p of roots) {
    if (existsSync(p)) {
        config({ path: p })
        break
    }
}
if (!process.env.SUPABASE_URL && process.env.VITE_SUPABASE_URL) {
    process.env.SUPABASE_URL = process.env.VITE_SUPABASE_URL
    process.env.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY
}
