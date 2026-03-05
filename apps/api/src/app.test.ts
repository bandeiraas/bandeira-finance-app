import { describe, it, expect } from 'vitest'
import { app } from './app'

describe('Health endpoint', () => {
    it('should return health status and no leaked info', async () => {
        const res = await app.request('/health')
        expect(res.status).toBe(200)
        const body = await res.json()
        expect(body).toEqual({
            status: 'ok',
        })
    })
})
