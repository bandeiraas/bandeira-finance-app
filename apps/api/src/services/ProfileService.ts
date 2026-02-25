import type { IProfileRepository, Profile, UpdateTables, Result } from '@bandeira/shared'
import { ResultUtil as R, AppError, ValidationError } from '@bandeira/shared'

export class ProfileService {
    private repository: IProfileRepository
    constructor(repository: IProfileRepository) {
        this.repository = repository
    }

    private validateAvatar(file: File): void {
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
        const MAX_SIZE = 5 * 1024 * 1024 // 5MB

        if (!ALLOWED_TYPES.includes(file.type)) {
            throw new ValidationError('Tipo de arquivo inválido. Permitidos: JPEG, PNG, WebP', {
                type: ['Apenas imagens JPEG, PNG ou WebP são permitidas'],
            })
        }

        if (file.size > MAX_SIZE) {
            throw new ValidationError('Arquivo muito grande. Máximo 5MB', {
                size: ['O tamanho do arquivo não deve exceder 5MB'],
            })
        }
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
            this.validateAvatar(file)
            const url = await this.repository.uploadAvatar(userId, file)
            return R.ok(url)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }
}
