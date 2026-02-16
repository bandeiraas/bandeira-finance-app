import { AccountRepository, accountRepository } from '../repositories/AccountRepository'
import type { Database } from '../../../core/types/database.types'

type Account = Database['public']['Tables']['accounts']['Row']

export class AccountService {
    private repository: AccountRepository

    constructor(repository: AccountRepository = accountRepository) {
        this.repository = repository
    }

    async getAccounts(userId: string): Promise<Account[]> {
        return this.repository.findByUser(userId)
    }

    async getAccountById(id: string): Promise<Account> {
        return this.repository.findById(id)
    }

    async createAccount(
        userId: string,
        data: {
            bankName: string
            accountType: string
            balance?: number
            color?: string
            isPrimary?: boolean
        }
    ): Promise<Account> {
        return this.repository.create({
            user_id: userId,
            bank_name: data.bankName,
            account_type: data.accountType,
            balance: data.balance ?? 0,
            color: data.color,
            is_primary: data.isPrimary ?? false,
        })
    }

    async getTotalBalance(userId: string): Promise<number> {
        return this.repository.getTotalBalance(userId)
    }

    async deleteAccount(id: string): Promise<void> {
        return this.repository.delete(id)
    }
}

export const accountService = new AccountService()
