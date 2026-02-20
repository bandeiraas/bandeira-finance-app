import type { ICategoryRepository, Category, Result } from '@bandeira/shared'
import { ResultUtil as R, AppError } from '@bandeira/shared'

export class CategoryService {
    private repository: ICategoryRepository
    constructor(repository: ICategoryRepository) {
        this.repository = repository
    }

    async getCategories(): Promise<Result<Category[]>> {
        try {
            const categories = await this.repository.findAll()
            return R.ok(categories)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async getCategoriesByType(type: 'income' | 'expense'): Promise<Result<Category[]>> {
        try {
            const categories = await this.repository.findByType(type)
            return R.ok(categories)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }
}
