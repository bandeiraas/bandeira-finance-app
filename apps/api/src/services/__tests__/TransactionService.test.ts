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
        it('deve chamar o repositório com o ID da transação e o ID do usuário', async () => {
            const transactionId = 'tx-123'
            const userId = 'user-456'
            vi.mocked(repo.delete).mockResolvedValue(undefined)

            const result = await service.deleteTransaction(transactionId, userId)

            expect(result.success).toBe(true)
            expect(repo.delete).toHaveBeenCalledWith(transactionId, userId)
        })

        it('deve retornar erro se o repositório falhar', async () => {
            const transactionId = 'tx-123'
            const userId = 'user-456'
            vi.mocked(repo.delete).mockRejectedValue(new Error('DB error'))

            const result = await service.deleteTransaction(transactionId, userId)

            expect(result.success).toBe(false)
            expect(repo.delete).toHaveBeenCalledWith(transactionId, userId)
        })
    })
})
