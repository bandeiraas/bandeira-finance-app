import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { IProfileRepository } from '@bandeira/shared'
import { ValidationError } from '@bandeira/shared'
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
        it('deve fazer upload de avatar válido (PNG)', async () => {
            const file = new File(['content'], 'avatar.png', { type: 'image/png' })
            vi.mocked(repo.uploadAvatar).mockResolvedValue('http://url/avatar.png')

            const result = await service.uploadAvatar('u1', file)

            expect(result.success).toBe(true)
            if (result.success) expect(result.data).toBe('http://url/avatar.png')
            expect(repo.uploadAvatar).toHaveBeenCalledWith('u1', file)
        })

        it('deve rejeitar arquivo com tipo inválido', async () => {
            const file = new File(['content'], 'script.js', { type: 'application/javascript' })

            const result = await service.uploadAvatar('u1', file)

            expect(result.success).toBe(false)
            if (!result.success) {
                expect(result.error).toBeInstanceOf(ValidationError)
                expect(result.error.message).toContain('Tipo de arquivo inválido')
            }
            expect(repo.uploadAvatar).not.toHaveBeenCalled()
        })

        it('deve rejeitar arquivo muito grande', async () => {
            // Mock size property if constructing huge string is slow/memory intensive
            // But File constructor calculates size from content.
            // Let's make a smaller content but override size property if possible,
            // or just make a 6MB string (it's not too big for modern node).
            const bigContent = new Uint8Array(6 * 1024 * 1024)
            const file = new File([bigContent], 'large.png', { type: 'image/png' })

            const result = await service.uploadAvatar('u1', file)

            expect(result.success).toBe(false)
            if (!result.success) {
                expect(result.error).toBeInstanceOf(ValidationError)
                expect(result.error.message).toContain('Arquivo muito grande')
            }
            expect(repo.uploadAvatar).not.toHaveBeenCalled()
        })
    })
})
