import type { IAccountRepository, Account, InsertTables, UpdateTables } from '@bandeira/shared'

export class InMemoryAccountRepository implements IAccountRepository {
    private accounts: Account[] = []

    async findByUser(userId: string): Promise<Account[]> {
        return this.accounts
            .filter(a => a.user_id === userId)
            .sort((a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0))
    }

    async findById(id: string): Promise<Account | null> {
        return this.accounts.find(a => a.id === id) ?? null
    }

    async create(account: InsertTables<'accounts'>): Promise<Account> {
        const newAccount: Account = {
            id: account.id ?? crypto.randomUUID(),
            user_id: account.user_id,
            bank_name: account.bank_name,
            account_type: account.account_type,
            balance: account.balance ?? 0,
            color: account.color ?? null,
            is_primary: account.is_primary ?? false,
            created_at: account.created_at ?? new Date().toISOString(),
        }
        this.accounts.push(newAccount)
        return newAccount
    }

    async update(id: string, updates: UpdateTables<'accounts'>): Promise<Account> {
        const index = this.accounts.findIndex(a => a.id === id)
        if (index === -1) throw new Error('Account not found')
        this.accounts[index] = { ...this.accounts[index], ...updates }
        return this.accounts[index]
    }

    async delete(id: string, userId: string): Promise<void> {
        this.accounts = this.accounts.filter(a => !(a.id === id && a.user_id === userId))
    }

    async getTotalBalance(userId: string): Promise<number> {
        return this.accounts
            .filter(a => a.user_id === userId)
            .reduce((sum, a) => sum + Number(a.balance), 0)
    }

    seed(accounts: Account[]): void {
        this.accounts = [...accounts]
    }

    clear(): void {
        this.accounts = []
    }
}
