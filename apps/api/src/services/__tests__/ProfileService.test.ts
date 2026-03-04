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
        it('deve permitir upload de imagem válida (JPEG)', async () => {
            const file = new File(['dummy content'], 'avatar.jpg', { type: 'image/jpeg' })
            vi.mocked(repo.uploadAvatar).mockResolvedValue('https://example.com/avatar.jpg')

            const result = await service.uploadAvatar('u1', file)

            expect(result.success).toBe(true)
            if (result.success) expect(result.data).toBe('https://example.com/avatar.jpg')
            expect(repo.uploadAvatar).toHaveBeenCalledWith('u1', file)
        })

        it('deve rejeitar tipo de arquivo inválido (text/plain)', async () => {
            const file = new File(['dummy content'], 'script.js', { type: 'text/plain' })

            const result = await service.uploadAvatar('u1', file)

            expect(result.success).toBe(false)
            if (!result.success) {
                expect(result.error.code).toBe('VALIDATION_ERROR')
                // We expect a validation error about the file type
            }
            expect(repo.uploadAvatar).not.toHaveBeenCalled()
        })

        it('deve rejeitar arquivo muito grande (> 5MB)', async () => {
            // Mock file size by creating a blob/file with explicit options or just trusting the size calc
            // Since creating a 5MB string is slow/memory heavy, we can mock the File object
            const file = {
                type: 'image/jpeg',
                size: 5 * 1024 * 1024 + 1, // 5MB + 1 byte
                name: 'large.jpg'
            } as File

            const result = await service.uploadAvatar('u1', file)

            expect(result.success).toBe(false)
            if (!result.success) {
                expect(result.error.code).toBe('VALIDATION_ERROR')
            }
            expect(repo.uploadAvatar).not.toHaveBeenCalled()
        })
    })
})
