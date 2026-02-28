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
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
            if (!allowedTypes.includes(file.type)) {
                return R.fail(new ValidationError('Tipo de arquivo inválido. Formatos permitidos: JPG, PNG, WEBP'))
            }

            const maxSize = 5 * 1024 * 1024 // 5MB
            if (file.size > maxSize) {
                return R.fail(new ValidationError('Tamanho do arquivo excede o limite de 5MB'))
            }

            const url = await this.repository.uploadAvatar(userId, file)
            return R.ok(url)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }
}
