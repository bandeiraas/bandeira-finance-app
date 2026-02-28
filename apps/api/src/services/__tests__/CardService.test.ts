import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { ICardRepository, CreateCardDTO } from '@bandeira/shared'
import { CardFactory } from '@bandeira/shared'
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

    describe('getCards', () => {
        it('retorna cartões do usuário', async () => {
            const cards = [
                {
                    id: '1',
                    user_id: 'u1',
                    account_id: 'a1',
                    brand: 'nubank',
                    last_four: '1234',
                    expiry: '12/30',
                    card_name: 'Meu Cartão',
                    credit_limit: 5000,
                    style: 'black',
                    card_color: '#820ad1',
                    due_day: 10,
                    closing_day: 5,
                    created_at: new Date().toISOString()
                }
            ]
            vi.mocked(repo.findByUser).mockResolvedValue(cards as never)

            const result = await service.getCards('u1')

            expect(result.success).toBe(true)
            if (result.success) expect(result.data).toEqual(cards)
            expect(repo.findByUser).toHaveBeenCalledWith('u1')
        })

        it('retorna erro quando repository falha no getCards', async () => {
            vi.mocked(repo.findByUser).mockRejectedValue(new Error('DB error'))

            const result = await service.getCards('u1')

            expect(result.success).toBe(false)
        })
    })

    describe('createCard', () => {
        it('cria cartão com dados válidos', async () => {
            const input: CreateCardDTO = {
                brand: 'nubank',
                last_four: '1234',
                expiry: '12/30',
                card_name: 'Meu Cartão',
                credit_limit: 5000,
                account_id: 'a1',
                card_color: '#820ad1',
                due_day: 10,
                closing_day: 5,
            }

            const insertData = CardFactory.create('u1', input)

            const created = {
                id: 'new-card-id',
                ...insertData,
                created_at: new Date().toISOString()
            }
            vi.mocked(repo.create).mockResolvedValue(created as never)

            const result = await service.createCard('u1', input)

            expect(result.success).toBe(true)
            if (result.success) {
                expect(result.data.brand).toBe('nubank')
                expect(result.data.last_four).toBe('1234')
            }
            expect(repo.create).toHaveBeenCalledWith(insertData)
        })

        it('retorna erro quando repository falha no createCard', async () => {
            const input: CreateCardDTO = {
                brand: 'nubank',
                last_four: '1234',
                expiry: '12/30',
                card_name: 'Meu Cartão',
                credit_limit: 5000,
                account_id: 'a1'
            }
            vi.mocked(repo.create).mockRejectedValue(new Error('DB error create'))

            const result = await service.createCard('u1', input)

            expect(result.success).toBe(false)
        })
    })

    describe('deleteCard', () => {
        it('deleta cartão com sucesso', async () => {
            vi.mocked(repo.delete).mockResolvedValue(undefined)

            const result = await service.deleteCard('card-id-1')

            expect(result.success).toBe(true)
            expect(repo.delete).toHaveBeenCalledWith('card-id-1')
        })

        it('retorna erro quando repository falha no deleteCard', async () => {
            vi.mocked(repo.delete).mockRejectedValue(new Error('DB error delete'))

            const result = await service.deleteCard('card-id-1')

            expect(result.success).toBe(false)
        })
    })
})
