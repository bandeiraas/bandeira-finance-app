import type { Category } from '../../types/models';
export interface ICategoryRepository {
    findAll(): Promise<Category[]>;
    findByType(type: 'income' | 'expense'): Promise<Category[]>;
}
