import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { ICardRepository } from '@bandeira/shared'
import { CardService } from '../CardService'

function createMockRepo(): ICardRepository {
    return {
        findByUser: vi.fn(),
        create: vi.fn(),
        delete: vi.fn(),
    }
}

describe('CardService', () => {
    let repo: ICardRepository
    let service: CardService

    beforeEach(() => {
        repo = createMockRepo()
        service = new CardService(repo)
    })

    describe('deleteCard', () => {
        it('deleta cartão com sucesso', async () => {
            vi.mocked(repo.delete).mockResolvedValue(undefined)

            const result = await service.deleteCard('card-id')

            expect(result.success).toBe(true)
            if (result.success) expect(result.data).toBeUndefined()
            expect(repo.delete).toHaveBeenCalledWith('card-id')
        })

        it('retorna erro quando repository falha ao deletar', async () => {
            vi.mocked(repo.delete).mockRejectedValue(new Error('DB error'))

            const result = await service.deleteCard('card-id')

            expect(result.success).toBe(false)
            if (!result.success) expect(result.error).toBeDefined()
        })
    })

    describe('getCards', () => {
        it('retorna cartões do usuário', async () => {
            const cards = [
                { id: '1', user_id: 'u1', card_name: 'Nubank', last_four: '1234', brand: 'mastercard', credit_limit: 100, account_id: 'acc-1', expiry: '12/25', due_day: 10, closing_day: 5, created_at: '' },
            ]
            vi.mocked(repo.findByUser).mockResolvedValue(cards as never)

            const result = await service.getCards('u1')

            expect(result.success).toBe(true)
            if (result.success) expect(result.data).toEqual(cards)
            expect(repo.findByUser).toHaveBeenCalledWith('u1')
        })

        it('retorna erro quando repository falha', async () => {
            vi.mocked(repo.findByUser).mockRejectedValue(new Error('DB error'))

            const result = await service.getCards('u1')

            expect(result.success).toBe(false)
        })
    })

    describe('createCard', () => {
        it('cria cartão com dados válidos', async () => {
            const input = {
                card_name: 'Nubank',
                last_four: '1234',
                brand: 'mastercard' as const,
                credit_limit: 1000,
                account_id: 'acc-1',
                expiry: '12/25',
                due_day: 10,
                closing_day: 5,
            }
            const created = {
                id: 'new-id',
                user_id: 'u1',
                card_name: input.card_name,
                last_four: input.last_four,
                brand: input.brand,
                credit_limit: input.credit_limit,
                account_id: input.account_id,
                expiry: input.expiry,
                due_day: input.due_day,
                closing_day: input.closing_day,
                created_at: new Date().toISOString(),
            }
            vi.mocked(repo.create).mockResolvedValue(created as never)

            const result = await service.createCard('u1', input)

            expect(result.success).toBe(true)
            if (result.success) expect(result.data.card_name).toBe('Nubank')
            expect(repo.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    card_name: 'Nubank',
                    last_four: '1234',
                    credit_limit: 1000,
                })
            )
        })
    })
})
