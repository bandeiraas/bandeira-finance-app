import type { Account } from '../../types/models';
import type { InsertTables, UpdateTables } from '../../types/database.types';
export interface IAccountRepository {
    findByUser(userId: string): Promise<Account[]>;
    findById(id: string): Promise<Account | null>;
    create(account: InsertTables<'accounts'>): Promise<Account>;
    update(id: string, updates: UpdateTables<'accounts'>): Promise<Account>;
    delete(id: string): Promise<void>;
    getTotalBalance(userId: string): Promise<number>;
}
