import { describe, it, expect } from 'vitest'
import { formatCurrency, formatCurrencyCompact } from '../formatCurrency'

describe('formatCurrency utils', () => {
    describe('formatCurrency', () => {
        it('deve formatar valor positivo corretamente', () => {
            // \u00a0 é o caractere de espaço não-quebrável (nbsp) usado pelo Intl.NumberFormat
            expect(formatCurrency(100)).toBe('R$\u00a0100,00')
        })

        it('deve formatar valor decimal corretamente', () => {
            expect(formatCurrency(1234.56)).toBe('R$\u00a01.234,56')
        })

        it('deve formatar valor zero corretamente', () => {
            expect(formatCurrency(0)).toBe('R$\u00a00,00')
        })

        it('deve formatar valor negativo corretamente', () => {
            expect(formatCurrency(-100)).toBe('-R$\u00a0100,00')
        })
    })

    describe('formatCurrencyCompact', () => {
        it('deve formatar valor positivo sem o prefixo R$', () => {
            expect(formatCurrencyCompact(100)).toBe('100,00')
        })

        it('deve formatar valor decimal sem o prefixo R$', () => {
            expect(formatCurrencyCompact(1234.56)).toBe('1.234,56')
        })

        it('deve formatar valor zero corretamente', () => {
            expect(formatCurrencyCompact(0)).toBe('0,00')
        })

        it('deve formatar valor negativo sem o prefixo R$', () => {
            expect(formatCurrencyCompact(-100)).toBe('-100,00')
        })
    })
})
