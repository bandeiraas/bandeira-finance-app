import type { Card } from '../../types/models'
import type { InsertTables } from '../../types/database.types'

export interface ICardRepository {
    findByUser(userId: string): Promise<Card[]>
    create(card: InsertTables<'cards'>): Promise<Card>
    delete(id: string, userId: string): Promise<void>
}
