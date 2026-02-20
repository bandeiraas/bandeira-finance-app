import type { InsertTables } from '../../types/database.types'
import type { CreateAccountDTO } from '../../validation/accountSchema'

/**
 * Factory para criação de contas com invariantes de domínio.
 * Recebe DTO já validado e retorna objeto pronto para insert.
 */
export const AccountFactory = {
    create(userId: string, dto: CreateAccountDTO): InsertTables<'accounts'> {
        return {
            user_id: userId,
            bank_name: dto.bankName,
            account_type: dto.accountType,
            balance: dto.balance ?? 0,
            color: dto.color ?? null,
            is_primary: dto.isPrimary ?? false,
        }
    },
}
