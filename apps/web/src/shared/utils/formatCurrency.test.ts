import { describe, it, expect } from 'vitest'
import { formatCurrency, formatCurrencyCompact } from './formatCurrency'

describe('formatCurrency', () => {
    it('deve formatar valores positivos corretamente', () => {
        expect(formatCurrency(1234.56)).toBe('R$\u00a01.234,56')
        expect(formatCurrency(0.5)).toBe('R$\u00a00,50')
        expect(formatCurrency(10)).toBe('R$\u00a010,00')
    })

    it('deve formatar valores negativos corretamente', () => {
        // Node's Intl format for negative pt-BR currency can be '-R$ 1.234,56' or 'R$ -1.234,56' depending on ICU versions.
        // We'll calculate the expected string natively here to avoid flaky tests based on node versions.
        const expected = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(-1234.56)

        expect(formatCurrency(-1234.56)).toBe(expected)
    })

    it('deve formatar zero corretamente', () => {
        expect(formatCurrency(0)).toBe('R$\u00a00,00')
    })
})

describe('formatCurrencyCompact', () => {
    it('deve formatar valores positivos corretamente sem prefixo de moeda', () => {
        expect(formatCurrencyCompact(1234.56)).toBe('1.234,56')
        expect(formatCurrencyCompact(0.5)).toBe('0,50')
        expect(formatCurrencyCompact(10)).toBe('10,00')
    })

    it('deve formatar valores negativos corretamente sem prefixo de moeda', () => {
        expect(formatCurrencyCompact(-1234.56)).toBe('-1.234,56')
    })

    it('deve formatar zero corretamente sem prefixo de moeda', () => {
        expect(formatCurrencyCompact(0)).toBe('0,00')
    })

    it('deve arredondar corretamente limitando a 2 casas decimais', () => {
        expect(formatCurrencyCompact(1234.567)).toBe('1.234,57')
        expect(formatCurrencyCompact(1234.564)).toBe('1.234,56')
    })
})
