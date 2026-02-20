import { describe, it, expect } from 'vitest'
import { validate } from '../validate'
import { createTransactionSchema } from '../transactionSchema'
import { createAccountSchema } from '../accountSchema'
import { signUpSchema } from '../authSchema'

describe('Validation Schemas', () => {
    describe('createTransactionSchema', () => {
        it('deve aceitar dados válidos', () => {
            const result = validate(createTransactionSchema, {
                amount: 100.50,
                description: 'Almoço',
                categoryId: '550e8400-e29b-41d4-a716-446655440000',
                accountId: '550e8400-e29b-41d4-a716-446655440001',
                date: '2026-02-18',
            })
            expect(result.success).toBe(true)
        })

        it('deve rejeitar valor negativo', () => {
            const result = validate(createTransactionSchema, {
                amount: -50,
                description: 'Teste',
                categoryId: '550e8400-e29b-41d4-a716-446655440000',
                accountId: '550e8400-e29b-41d4-a716-446655440001',
                date: '2026-02-18',
            })
            expect(result.success).toBe(false)
            if (!result.success) {
                expect(result.error.fields).toHaveProperty('amount')
            }
        })

        it('deve rejeitar descrição vazia', () => {
            const result = validate(createTransactionSchema, {
                amount: 100,
                description: '',
                categoryId: '550e8400-e29b-41d4-a716-446655440000',
                accountId: '550e8400-e29b-41d4-a716-446655440001',
                date: '2026-02-18',
            })
            expect(result.success).toBe(false)
        })

        it('deve rejeitar UUID inválido', () => {
            const result = validate(createTransactionSchema, {
                amount: 100,
                description: 'Teste',
                categoryId: 'nao-e-uuid',
                accountId: '550e8400-e29b-41d4-a716-446655440001',
                date: '2026-02-18',
            })
            expect(result.success).toBe(false)
        })
    })

    describe('createAccountSchema', () => {
        it('deve aceitar dados válidos', () => {
            const result = validate(createAccountSchema, {
                bankName: 'Nubank',
                accountType: 'corrente',
            })
            expect(result.success).toBe(true)
        })

        it('deve rejeitar tipo de conta inválido', () => {
            const result = validate(createAccountSchema, {
                bankName: 'Nubank',
                accountType: 'bitcoin',
            })
            expect(result.success).toBe(false)
        })

        it('deve usar valores padrão', () => {
            const result = validate(createAccountSchema, {
                bankName: 'Inter',
                accountType: 'poupanca',
            })
            expect(result.success).toBe(true)
            if (result.success) {
                expect(result.data.balance).toBe(0)
                expect(result.data.isPrimary).toBe(false)
            }
        })
    })

    describe('signUpSchema', () => {
        it('deve aceitar dados válidos', () => {
            const result = validate(signUpSchema, {
                email: 'user@email.com',
                password: 'senha123',
                fullName: 'João Silva',
            })
            expect(result.success).toBe(true)
        })

        it('deve rejeitar email inválido', () => {
            const result = validate(signUpSchema, {
                email: 'invalido',
                password: 'senha123',
                fullName: 'João',
            })
            expect(result.success).toBe(false)
        })

        it('deve rejeitar senha curta', () => {
            const result = validate(signUpSchema, {
                email: 'user@email.com',
                password: '123',
                fullName: 'João',
            })
            expect(result.success).toBe(false)
        })
    })
})
