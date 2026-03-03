import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { ITransactionRepository} from '@bandeira/shared'
import { TransactionService } from '../TransactionService'

function createMockRepo(): ITransactionRepository {
    return {
        findByUser: vi.fn(),
        findByDateRange: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        findByCategory: vi.fn(),
    }
}

describe('TransactionService', () => {
    let repo: ITransactionRepository
    let service: TransactionService

    beforeEach(() => {
        repo = createMockRepo()
        service = new TransactionService(repo)
    })

    describe('getTransactions', () => {
        it('deve retornar transacoes do usuario sem limite', async () => {
            const mockTransactions = [
                { id: '1', user_id: 'u1', amount: '100', type: 'income', description: 'Salario', category_id: 'c1', account_id: 'a1', date: '2023-10-01' },
            ]
            vi.mocked(repo.findByUser).mockResolvedValue(mockTransactions as never)

            const result = await service.getTransactions('u1')

            expect(result.success).toBe(true)
            if (result.success) expect(result.data).toEqual(mockTransactions)
            expect(repo.findByUser).toHaveBeenCalledWith('u1', undefined)
        })

        it('deve retornar transacoes do usuario com limite', async () => {
            const mockTransactions = [
                { id: '1', user_id: 'u1', amount: '100', type: 'income', description: 'Salario', category_id: 'c1', account_id: 'a1', date: '2023-10-01' },
            ]
            vi.mocked(repo.findByUser).mockResolvedValue(mockTransactions as never)

            const result = await service.getTransactions('u1', 5)

            expect(result.success).toBe(true)
            if (result.success) expect(result.data).toEqual(mockTransactions)
            expect(repo.findByUser).toHaveBeenCalledWith('u1', 5)
        })

        it('deve retornar erro quando o repositorio falha', async () => {
            vi.mocked(repo.findByUser).mockRejectedValue(new Error('DB error'))

            const result = await service.getTransactions('u1')

            expect(result.success).toBe(false)
        })
    })
})
