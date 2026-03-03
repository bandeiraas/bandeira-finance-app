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

    describe('createIncome', () => {
        it('cria uma transação de receita com dados válidos', async () => {
            const userId = 'u1'
            const input = {
                amount: 1500,
                description: 'Salário',
                categoryId: 'cat1',
                accountId: 'acc1',
                date: '2023-10-15T12:00:00.000Z',
            }

            const created = {
                id: 't1',
                user_id: userId,
                type: 'income',
                amount: input.amount,
                description: input.description,
                category_id: input.categoryId,
                account_id: input.accountId,
                date: '2023-10-15',
                created_at: new Date().toISOString(),
            }

            vi.mocked(repo.create).mockResolvedValue(created as never)

            const result = await service.createIncome(userId, input)

            expect(result.success).toBe(true)
            if (result.success) {
                expect(result.data).toEqual(created)
            }

            expect(repo.create).toHaveBeenCalledWith({
                user_id: userId,
                type: 'income',
                amount: input.amount,
                description: input.description,
                category_id: input.categoryId,
                account_id: input.accountId,
                date: '2023-10-15',
            })
        })

        it('retorna erro quando o repositório falha ao criar receita', async () => {
            const userId = 'u1'
            const input = {
                amount: 1500,
                description: 'Salário',
                categoryId: 'cat1',
                accountId: 'acc1',
                date: '2023-10-15T12:00:00.000Z',
            }

            vi.mocked(repo.create).mockRejectedValue(new Error('Database error'))

            const result = await service.createIncome(userId, input)

            expect(result.success).toBe(false)
            if (!result.success) {
                expect(result.error.message).toBe('Database error')
            }
        })
    })
})
