import type { InsertTables } from '../../types/database.types'
import type { CreateCardDTO } from '../../validation/cardSchema'

/**
 * Factory para criação de cartões com invariantes de domínio.
 * Recebe DTO já validado e retorna objeto pronto para insert.
 */
export const CardFactory = {
    create(userId: string, dto: CreateCardDTO): InsertTables<'cards'> {
        return {
            user_id: userId,
            brand: dto.brand,
            last_four: dto.last_four,
            expiry: dto.expiry,
            card_name: dto.card_name,
            credit_limit: dto.credit_limit,
            style: dto.style ?? 'black',
        }
    },
}
