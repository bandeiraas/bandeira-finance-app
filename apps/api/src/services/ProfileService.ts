import type { IProfileRepository, Profile, UpdateTables, Result } from '@bandeira/shared'
import { ResultUtil as R, AppError } from '@bandeira/shared'

export class ProfileService {
    private repository: IProfileRepository
    constructor(repository: IProfileRepository) {
        this.repository = repository
    }

    async getProfile(userId: string): Promise<Result<Profile | null>> {
        try {
            const profile = await this.repository.findById(userId)
            return R.ok(profile)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async updateProfile(userId: string, updates: UpdateTables<'profiles'>): Promise<Result<Profile>> {
        try {
            const profile = await this.repository.update(userId, updates)
            return R.ok(profile)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async uploadAvatar(userId: string, file: File): Promise<Result<string>> {
        try {
            const url = await this.repository.uploadAvatar(userId, file)
            return R.ok(url)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }
}
