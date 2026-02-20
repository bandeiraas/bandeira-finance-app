import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { IAccountRepository } from '@bandeira/shared'
import { AccountService } from '../AccountService'

function createMockRepo(): IAccountRepository {
    return {
        findByUser: vi.fn(),
        findById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        getTotalBalance: vi.fn(),
    }
}

describe('AccountService', () => {
    let repo: IAccountRepository
    let service: AccountService

    beforeEach(() => {
        repo = createMockRepo()
        service = new AccountService(repo)
    })

    describe('getAccounts', () => {
        it('retorna contas do usuário', async () => {
            const accounts = [
                { id: '1', user_id: 'u1', bank_name: 'Nubank', account_type: 'corrente', balance: 100, color: null, is_primary: false, created_at: '' },
            ]
            vi.mocked(repo.findByUser).mockResolvedValue(accounts as never)

            const result = await service.getAccounts('u1')

            expect(result.success).toBe(true)
            if (result.success) expect(result.data).toEqual(accounts)
            expect(repo.findByUser).toHaveBeenCalledWith('u1')
        })

        it('retorna erro quando repository falha', async () => {
            vi.mocked(repo.findByUser).mockRejectedValue(new Error('DB error'))

            const result = await service.getAccounts('u1')

            expect(result.success).toBe(false)
        })
    })

    describe('createAccount', () => {
        it('cria conta com dados válidos', async () => {
            const input = {
                bankName: 'Nubank',
                accountType: 'corrente',
                balance: 1000,
                color: '#820ad1',
                isPrimary: false,
            }
            const created = {
                id: 'new-id',
                user_id: 'u1',
                bank_name: input.bankName,
                account_type: input.accountType,
                balance: input.balance,
                color: input.color,
                is_primary: input.isPrimary,
                created_at: new Date().toISOString(),
            }
            vi.mocked(repo.create).mockResolvedValue(created as never)

            const result = await service.createAccount('u1', input)

            expect(result.success).toBe(true)
            if (result.success) expect(result.data.bank_name).toBe('Nubank')
            expect(repo.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    bank_name: 'Nubank',
                    account_type: 'corrente',
                    balance: 1000,
                })
            )
        })
    })

    describe('getTotalBalance', () => {
        it('retorna saldo total', async () => {
            vi.mocked(repo.getTotalBalance).mockResolvedValue(5000)

            const result = await service.getTotalBalance('u1')

            expect(result.success).toBe(true)
            if (result.success) expect(result.data).toBe(5000)
        })
    })
})
