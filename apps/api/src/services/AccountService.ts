import type { IAccountRepository, Account, Result } from '@bandeira/shared'
import { ResultUtil as R, AppError, AccountFactory } from '@bandeira/shared'

export class AccountService {
    private repository: IAccountRepository
    constructor(repository: IAccountRepository) {
        this.repository = repository
    }

    async getAccounts(userId: string): Promise<Result<Account[]>> {
        try {
            const accounts = await this.repository.findByUser(userId)
            return R.ok(accounts)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async getAccountById(id: string): Promise<Result<Account | null>> {
        try {
            const account = await this.repository.findById(id)
            return R.ok(account)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
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
    ): Promise<Result<Account>> {
        try {
            const insert = AccountFactory.create(userId, data as Parameters<typeof AccountFactory.create>[1])
            const account = await this.repository.create(insert)
            return R.ok(account)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async getTotalBalance(userId: string): Promise<Result<number>> {
        try {
            const balance = await this.repository.getTotalBalance(userId)
            return R.ok(balance)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async deleteAccount(id: string, userId: string): Promise<Result<void>> {
        try {
            await this.repository.delete(id, userId)
            return R.ok(undefined)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }
}
