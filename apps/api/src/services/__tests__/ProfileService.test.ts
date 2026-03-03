import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { IProfileRepository } from '@bandeira/shared'
import { ProfileService } from '../ProfileService'

function createMockRepo(): IProfileRepository {
    return {
        findById: vi.fn(),
        update: vi.fn(),
        uploadAvatar: vi.fn(),
    }
}

describe('ProfileService', () => {
    let repo: IProfileRepository
    let service: ProfileService

    beforeEach(() => {
        repo = createMockRepo()
        service = new ProfileService(repo)
    })

    describe('uploadAvatar', () => {
        it('should upload valid avatar', async () => {
            const file = new File([''], 'avatar.png', { type: 'image/png' })
            vi.mocked(repo.uploadAvatar).mockResolvedValue('https://example.com/avatar.png')

            const result = await service.uploadAvatar('u1', file)

            expect(result.success).toBe(true)
            if (result.success) expect(result.data).toBe('https://example.com/avatar.png')
            expect(repo.uploadAvatar).toHaveBeenCalledWith('u1', file)
        })

        it('should reject invalid file type', async () => {
            const file = new File([''], 'doc.pdf', { type: 'application/pdf' })

            const result = await service.uploadAvatar('u1', file)

            expect(result.success).toBe(false)
            // Expecting VALIDATION_ERROR once implemented
            if (!result.success) expect(result.error.code).toBe('VALIDATION_ERROR')
        })

        it('should reject large file', async () => {
            // 5MB + 1 byte
            const size = 5 * 1024 * 1024 + 1
            const content = new Uint8Array(size)
            const file = new File([content], 'large.png', { type: 'image/png' })

            const result = await service.uploadAvatar('u1', file)

            expect(result.success).toBe(false)
            if (!result.success) expect(result.error.code).toBe('VALIDATION_ERROR')
        })

        it('should handle repository errors', async () => {
            const file = new File([''], 'avatar.png', { type: 'image/png' })
            vi.mocked(repo.uploadAvatar).mockRejectedValue(new Error('Upload failed'))

            const result = await service.uploadAvatar('u1', file)

            expect(result.success).toBe(false)
        })
    })
})
