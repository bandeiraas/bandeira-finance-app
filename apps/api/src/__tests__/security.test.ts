import { describe, it, expect } from 'vitest'
import { app } from '../app'

describe('Security Headers', () => {
    it('should have security headers', async () => {
        const res = await app.request('/health')

        // Ensure request was successful
        expect(res.status).toBe(200)

        // Check for specific headers added by secureHeaders
        // These are standard headers added by hono/secure-headers
        expect(res.headers.get('X-Frame-Options')).toBe('SAMEORIGIN')
        expect(res.headers.get('X-XSS-Protection')).toBe('0')
        expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff')
        expect(res.headers.get('Referrer-Policy')).toBe('no-referrer')
        expect(res.headers.get('Content-Security-Policy')).toBeDefined()
        expect(res.headers.get('Strict-Transport-Security')).toBeDefined()
    })
})
