import type { Profile } from '../../types/models';
import type { UpdateTables } from '../../types/database.types';
export interface IProfileRepository {
    findById(userId: string): Promise<Profile | null>;
    update(userId: string, updates: UpdateTables<'profiles'>): Promise<Profile>;
    uploadAvatar(userId: string, file: File): Promise<string>;
}
