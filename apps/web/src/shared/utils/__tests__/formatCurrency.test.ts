import { describe, it, expect } from 'vitest';
import { formatCurrency, formatCurrencyCompact } from '../formatCurrency';

describe('formatCurrency', () => {
    it('deve formatar o valor como moeda BRL com o símbolo', () => {
        expect(formatCurrency(10)).toBe('R$\u00A010,00');
        expect(formatCurrency(1234.56)).toBe('R$\u00A01.234,56');
        expect(formatCurrency(0)).toBe('R$\u00A00,00');
        expect(formatCurrency(-50)).toBe('-R$\u00A050,00');
    });
});

describe('formatCurrencyCompact', () => {
    it('deve formatar o valor como moeda BRL sem o símbolo', () => {
        expect(formatCurrencyCompact(10)).toBe('10,00');
        expect(formatCurrencyCompact(1234.56)).toBe('1.234,56');
        expect(formatCurrencyCompact(0)).toBe('0,00');
        expect(formatCurrencyCompact(-50)).toBe('-50,00');
    });
});
