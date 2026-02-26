import type { IProfileRepository, Profile, UpdateTables, Result } from '@bandeira/shared'
import { ResultUtil as R, AppError, ValidationError } from '@bandeira/shared'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

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
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            return R.fail(new ValidationError('Tipo de arquivo inválido. Apenas JPEG, PNG e WebP são permitidos.', {
                file: ['Tipo de arquivo não suportado']
            }))
        }

        if (file.size > MAX_FILE_SIZE) {
            return R.fail(new ValidationError('Arquivo muito grande. O tamanho máximo é 5MB.', {
                file: ['Tamanho do arquivo excede 5MB']
            }))
        }

        try {
            const url = await this.repository.uploadAvatar(userId, file)
            return R.ok(url)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }
}
