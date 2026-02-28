import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { ITransactionRepository, Transaction } from '@bandeira/shared'
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

    describe('getMonthlySummary', () => {
        it('deve calcular o resumo mensal corretamente com receitas e despesas', async () => {
            const transactions = [
                {
                    id: '1',
                    user_id: 'u1',
                    amount: 5000,
                    type: 'income',
                    date: '2023-10-05',
                    description: 'Salário',
                    category_id: 'c1',
                    account_id: 'a1',
                    created_at: '',
                },
                {
                    id: '2',
                    user_id: 'u1',
                    amount: 1500,
                    type: 'expense',
                    date: '2023-10-10',
                    description: 'Aluguel',
                    category_id: 'c2',
                    account_id: 'a1',
                    created_at: '',
                    categories: {
                        id: 'c2',
                        name: 'Moradia',
                        color: '#ff0000',
                        user_id: 'u1',
                        created_at: '',
                    },
                },
                {
                    id: '3',
                    user_id: 'u1',
                    amount: 500,
                    type: 'expense',
                    date: '2023-10-15',
                    description: 'Mercado',
                    category_id: 'c3',
                    account_id: 'a1',
                    created_at: '',
                    categories: {
                        id: 'c3',
                        name: 'Alimentação',
                        color: '#00ff00',
                        user_id: 'u1',
                        created_at: '',
                    },
                },
                {
                    id: '4',
                    user_id: 'u1',
                    amount: 500,
                    type: 'expense',
                    date: '2023-10-20',
                    description: 'Conta de Luz',
                    category_id: 'c2',
                    account_id: 'a1',
                    created_at: '',
                    categories: {
                        id: 'c2',
                        name: 'Moradia',
                        color: '#ff0000',
                        user_id: 'u1',
                        created_at: '',
                    },
                },
            ] as Transaction[]

            vi.mocked(repo.findByDateRange).mockResolvedValue(transactions)

            // 0-indexed month, so 9 is October
            const result = await service.getMonthlySummary('u1', 9, 2023)

            expect(result.success).toBe(true)
            if (!result.success) return

            expect(result.data.totalIncome).toBe(5000)
            expect(result.data.totalExpenses).toBe(2500)
            expect(result.data.balance).toBe(2500)
            expect(result.data.transactions).toEqual(transactions)

            expect(result.data.expensesByCategory).toEqual([
                {
                    categoryName: 'Moradia',
                    categoryColor: '#ff0000',
                    total: 2000,
                    percentage: 80, // (2000 / 2500) * 100
                },
                {
                    categoryName: 'Alimentação',
                    categoryColor: '#00ff00',
                    total: 500,
                    percentage: 20, // (500 / 2500) * 100
                },
            ])

            expect(repo.findByDateRange).toHaveBeenCalledWith(
                'u1',
                '2023-10-01',
                '2023-10-31'
            )
        })

        it('deve agrupar despesas sem categoria sob "Sem categoria"', async () => {
            const transactions = [
                {
                    id: '1',
                    user_id: 'u1',
                    amount: 1000,
                    type: 'expense',
                    date: '2023-10-05',
                    description: 'Compra online',
                    category_id: null,
                    account_id: 'a1',
                    created_at: '',
                },
            ] as unknown as Transaction[]

            vi.mocked(repo.findByDateRange).mockResolvedValue(transactions)

            const result = await service.getMonthlySummary('u1', 9, 2023)

            expect(result.success).toBe(true)
            if (!result.success) return

            expect(result.data.totalExpenses).toBe(1000)
            expect(result.data.expensesByCategory).toEqual([
                {
                    categoryName: 'Sem categoria',
                    categoryColor: null,
                    total: 1000,
                    percentage: 100,
                },
            ])
        })

        it('deve retornar um resumo zerado quando não houver transações', async () => {
            vi.mocked(repo.findByDateRange).mockResolvedValue([])

            const result = await service.getMonthlySummary('u1', 9, 2023)

            expect(result.success).toBe(true)
            if (!result.success) return

            expect(result.data.totalIncome).toBe(0)
            expect(result.data.totalExpenses).toBe(0)
            expect(result.data.balance).toBe(0)
            expect(result.data.transactions).toEqual([])
            expect(result.data.expensesByCategory).toEqual([])
        })

        it('deve retornar erro se a busca por transações falhar', async () => {
            vi.mocked(repo.findByDateRange).mockRejectedValue(new Error('DB error'))

            const result = await service.getMonthlySummary('u1', 9, 2023)

            expect(result.success).toBe(false)
            if (!result.success) {
                expect(result.error.message).toBe('DB error')
            }
        })
    })
})
