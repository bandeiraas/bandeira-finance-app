import type { ICardRepository, Card, Result } from '@bandeira/shared'
import { ResultUtil as R, AppError, CardFactory } from '@bandeira/shared'

export class CardService {
    private repository: ICardRepository
    constructor(repository: ICardRepository) {
        this.repository = repository
    }

    async getCards(userId: string): Promise<Result<Card[]>> {
        try {
            const cards = await this.repository.findByUser(userId)
            return R.ok(cards)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async createCard(
        userId: string,
        data: {
            brand: string
            last_four: string
            expiry: string
            card_name: string
            credit_limit: number
            style?: 'black' | 'purple' | 'green' | 'pink'
        }
    ): Promise<Result<Card>> {
        try {
            const insert = CardFactory.create(userId, { ...data, style: data.style ?? 'black' })
            const card = await this.repository.create(insert)
            return R.ok(card)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async deleteCard(id: string, userId: string): Promise<Result<void>> {
        try {
            await this.repository.delete(id, userId)
            return R.ok(undefined)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }
}
