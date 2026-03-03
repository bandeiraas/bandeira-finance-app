import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { ICardRepository, CreateCardDTO } from '@bandeira/shared'
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
        it('retorna os cartões do usuário com sucesso', async () => {
            const mockCards = [
                {
                    id: 'card1',
                    user_id: 'u1',
                    account_id: 'acc1',
                    brand: 'mastercard',
                    last_four: '1234',
                    expiry: '12/28',
                    card_name: 'Cartão de Crédito',
                    credit_limit: 5000,
                    style: 'black',
                    card_color: '#000000',
                    due_day: 10,
                    closing_day: 5,
                    created_at: '2023-01-01T00:00:00Z',
                },
                {
                    id: 'card2',
                    user_id: 'u1',
                    account_id: 'acc1',
                    brand: 'visa',
                    last_four: '5678',
                    expiry: '05/26',
                    card_name: 'Cartão Secundário',
                    credit_limit: 2000,
                    style: 'gold',
                    card_color: '#FFD700',
                    due_day: 15,
                    closing_day: 8,
                    created_at: '2023-01-02T00:00:00Z',
                }
            ]
            vi.mocked(repo.findByUser).mockResolvedValue(mockCards as never)

            const result = await service.getCards('u1')

            expect(result.success).toBe(true)
            if (result.success) {
                expect(result.data).toEqual(mockCards)
                expect(result.data).toHaveLength(2)
            }
            expect(repo.findByUser).toHaveBeenCalledWith('u1')
            expect(repo.findByUser).toHaveBeenCalledTimes(1)
        })

        it('retorna um array vazio se o usuário não tiver cartões', async () => {
            vi.mocked(repo.findByUser).mockResolvedValue([])

            const result = await service.getCards('u2')

            expect(result.success).toBe(true)
            if (result.success) {
                expect(result.data).toEqual([])
            }
            expect(repo.findByUser).toHaveBeenCalledWith('u2')
        })

        it('retorna erro (AppError) quando o repositório falha', async () => {
            const dbError = new Error('Database connection failed')
            vi.mocked(repo.findByUser).mockRejectedValue(dbError)

            const result = await service.getCards('u1')

            expect(result.success).toBe(false)
            if (!result.success) {
                expect(result.error).toBeDefined()
                // AppError wraps the original error message
            }
            expect(repo.findByUser).toHaveBeenCalledWith('u1')
        })
    })

    describe('createCard', () => {
        it('cria um cartão com sucesso fornecendo os dados corretos', async () => {
            const dto: CreateCardDTO = {
                account_id: 'acc1',
                brand: 'visa',
                last_four: '4321',
                expiry: '10/29',
                card_name: 'Cartão Platinum',
                credit_limit: 10000,
                card_color: '#C0C0C0',
                due_day: 20,
                closing_day: 13,
            }

            const expectedCard = {
                id: 'new-card-id',
                user_id: 'u1',
                ...dto,
                style: 'black',
                created_at: new Date().toISOString()
            }

            vi.mocked(repo.create).mockResolvedValue(expectedCard as never)

            const result = await service.createCard('u1', dto)

            expect(result.success).toBe(true)
            if (result.success) {
                expect(result.data).toEqual(expectedCard)
            }

            expect(repo.create).toHaveBeenCalledTimes(1)
            expect(repo.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    user_id: 'u1',
                    account_id: dto.account_id,
                    brand: dto.brand,
                    last_four: dto.last_four,
                    expiry: dto.expiry,
                    card_name: dto.card_name,
                    credit_limit: dto.credit_limit,
                    card_color: dto.card_color,
                    due_day: dto.due_day,
                    closing_day: dto.closing_day,
                    style: 'black'
                })
            )
        })

        it('cria um cartão utilizando valores default quando opcionais não são fornecidos', async () => {
            const dto: CreateCardDTO = {
                account_id: 'acc1',
                brand: 'mastercard',
                last_four: '9999',
                expiry: '12/30',
                card_name: 'Cartão Básico',
                credit_limit: 500,
                due_day: 10,
                closing_day: 5,
            }

            const expectedCard = {
                id: 'new-card-id-2',
                user_id: 'u1',
                account_id: dto.account_id,
                brand: dto.brand,
                last_four: dto.last_four,
                expiry: dto.expiry,
                card_name: dto.card_name,
                credit_limit: dto.credit_limit,
                card_color: null,
                due_day: 10,
                closing_day: 5,
                style: 'black',
                created_at: new Date().toISOString()
            }

            vi.mocked(repo.create).mockResolvedValue(expectedCard as never)

            const result = await service.createCard('u1', dto)

            expect(result.success).toBe(true)

            expect(repo.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    card_color: null,
                    due_day: 10,
                    closing_day: 5,
                })
            )
        })

        it('retorna erro (AppError) quando ocorre uma falha na criação no repositório', async () => {
            const dto: CreateCardDTO = {
                account_id: 'acc1',
                brand: 'visa',
                last_four: '4321',
                expiry: '10/29',
                card_name: 'Cartão Falho',
                credit_limit: 1000,
                due_day: 10,
                closing_day: 5,
            }

            vi.mocked(repo.create).mockRejectedValue(new Error('Insert failed'))

            const result = await service.createCard('u1', dto)

            expect(result.success).toBe(false)
            if (!result.success) {
                expect(result.error).toBeDefined()
            }
        })
    })

    describe('deleteCard', () => {
        it('deleta um cartão com sucesso', async () => {
            vi.mocked(repo.delete).mockResolvedValue(undefined)

            const result = await service.deleteCard('card1')

            expect(result.success).toBe(true)
            if (result.success) {
                expect(result.data).toBeUndefined()
            }
            expect(repo.delete).toHaveBeenCalledWith('card1')
            expect(repo.delete).toHaveBeenCalledTimes(1)
        })

        it('retorna erro quando o repositório falha ao deletar', async () => {
            vi.mocked(repo.delete).mockRejectedValue(new Error('Delete failed'))

            const result = await service.deleteCard('card1')

            expect(result.success).toBe(false)
            expect(repo.delete).toHaveBeenCalledWith('card1')
        })
    })
})
