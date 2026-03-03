import { describe, it, expect } from 'vitest'
import { SupabaseErrorMapper } from '../SupabaseErrorMapper'
import { AppError, UnexpectedError } from '../AppError'
import { NotFoundError } from '../NotFoundError'
import { AuthenticationError } from '../AuthenticationError'
import { DatabaseError } from '../DatabaseError'

class TestAppError extends AppError {
    readonly code = 'TEST_ERROR'
    readonly statusCode = 400
    constructor() {
        super('Test error')
    }
}

describe('SupabaseErrorMapper', () => {
    describe('toAppError', () => {
        it('deve retornar o próprio erro se já for uma instância de AppError', () => {
            const appError = new TestAppError()
            const result = SupabaseErrorMapper.toAppError(appError)
            expect(result).toBe(appError)
        })

        it('deve mapear erro PGRST116 para NotFoundError com entidade padrão', () => {
            const error = { code: 'PGRST116', message: 'Not found' }
            const result = SupabaseErrorMapper.toAppError(error)
            expect(result).toBeInstanceOf(NotFoundError)
            expect(result.message).toBe('Registro não encontrado')
        })

        it('deve mapear erro PGRST116 para NotFoundError com entidade especificada', () => {
            const error = { code: 'PGRST116', message: 'Not found' }
            const result = SupabaseErrorMapper.toAppError(error, 'Usuário')
            expect(result).toBeInstanceOf(NotFoundError)
            expect(result.message).toBe('Usuário não encontrado')
        })

        it('deve mapear erro 42501 para AuthenticationError', () => {
            const error = { code: '42501', message: 'Permission denied' }
            const result = SupabaseErrorMapper.toAppError(error)
            expect(result).toBeInstanceOf(AuthenticationError)
            expect(result.message).toBe('Sem permissão para esta operação')
        })

        it('deve mapear erro 23505 para DatabaseError com mensagem de registro duplicado', () => {
            const error = { code: '23505', message: 'Duplicate key value violates unique constraint' }
            const result = SupabaseErrorMapper.toAppError(error)
            expect(result).toBeInstanceOf(DatabaseError)
            expect(result.message).toBe('Registro duplicado')
            expect((result as DatabaseError).pgCode).toBe('23505')
        })

        it('deve mapear erro 23503 para DatabaseError com mensagem de referência inválida', () => {
            const error = { code: '23503', message: 'Foreign key constraint violation' }
            const result = SupabaseErrorMapper.toAppError(error)
            expect(result).toBeInstanceOf(DatabaseError)
            expect(result.message).toBe('Referência inválida — registro relacionado não existe')
            expect((result as DatabaseError).pgCode).toBe('23503')
        })

        it('deve mapear outros erros do Postgrest para DatabaseError genérico', () => {
            const error = { code: '99999', message: 'Some other database error' }
            const result = SupabaseErrorMapper.toAppError(error)
            expect(result).toBeInstanceOf(DatabaseError)
            expect(result.message).toBe('Some other database error')
            expect((result as DatabaseError).pgCode).toBe('99999')
        })

        it('deve usar AppError.fromUnknown para outros tipos de erros (ex: numero que não é PostgrestError)', () => {
            const error = 12345
            const result = SupabaseErrorMapper.toAppError(error)
            expect(result).toBeInstanceOf(UnexpectedError)
            expect(result.message).toBe('12345')
        })

        it('deve usar AppError.fromUnknown para string', () => {
            const error = 'Apenas uma string de erro'
            const result = SupabaseErrorMapper.toAppError(error)
            expect(result).toBeInstanceOf(UnexpectedError)
            expect(result.message).toBe('Apenas uma string de erro')
        })
    })
})
