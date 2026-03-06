import type { IProfileRepository, Profile, UpdateTables, Result } from '@bandeira/shared'
import { ResultUtil as R, AppError, ValidationError } from '@bandeira/shared'

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
            // Security: Validate file type to prevent malicious uploads
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
            if (!allowedTypes.includes(file.type)) {
                return R.fail(new ValidationError('Invalid file type. Allowed types are JPEG, PNG, and WEBP.'))
            }

            // Security: Validate file size (5MB limit) to prevent DoS
            const maxSize = 5 * 1024 * 1024 // 5MB
            if (file.size > maxSize) {
                return R.fail(new ValidationError('File size exceeds the 5MB limit.'))
            }

            const url = await this.repository.uploadAvatar(userId, file)
            return R.ok(url)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }
}
