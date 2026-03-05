import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { ITransactionRepository } from '@bandeira/shared'
import { TransactionService } from '../TransactionService'

function createMockRepo(): ITransactionRepository {
    return {
        findByUser: vi.fn(),
        findByDateRange: vi.fn(),
        findByCategory: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    }
}

describe('TransactionService', () => {
    let repo: ITransactionRepository
    let service: TransactionService

    beforeEach(() => {
        repo = createMockRepo()
        service = new TransactionService(repo)
    })

    describe('deleteTransaction', () => {
        it('deletes transaction with user verification', async () => {
            const userId = 'user-123'
            const transactionId = 'trans-456'
            vi.mocked(repo.delete).mockResolvedValue(undefined)

            const result = await service.deleteTransaction(transactionId, userId)

            expect(result.success).toBe(true)
            // This expects the repo to be called with both arguments
            expect(repo.delete).toHaveBeenCalledWith(transactionId, userId)
        })
    })
})
