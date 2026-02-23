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
            account_id: dto.account_id,
            brand: dto.brand,
            last_four: dto.last_four,
            expiry: dto.expiry,
            card_name: dto.card_name,
            credit_limit: dto.credit_limit,
            style: 'black',
            card_color: dto.card_color ?? null,
            due_day: dto.due_day ?? 10,
            closing_day: dto.closing_day ?? 5,
        }
    },
}
