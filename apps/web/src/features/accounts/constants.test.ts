import { describe, it, expect } from 'vitest';
import { getBankKey } from './constants';

describe('getBankKey', () => {
    it('deve retornar "nubank" para variações do nome Nubank', () => {
        expect(getBankKey('Nubank')).toBe('nubank');
        expect(getBankKey('NUBANK')).toBe('nubank');
        expect(getBankKey(' nubank ')).toBe('nubank');
        expect(getBankKey('Banco Nubank S.A.')).toBe('nubank');
    });

    it('deve retornar "itau" para variações do nome Itaú', () => {
        expect(getBankKey('Itaú')).toBe('itau');
        expect(getBankKey('ITAU')).toBe('itau');
        expect(getBankKey('itaú')).toBe('itau');
        expect(getBankKey('itau')).toBe('itau');
        expect(getBankKey('Banco Itaú Unibanco S.A.')).toBe('itau');
    });

    it('deve retornar "bradesco" para variações do nome Bradesco', () => {
        expect(getBankKey('Bradesco')).toBe('bradesco');
        expect(getBankKey('BRADESCO')).toBe('bradesco');
        expect(getBankKey('Banco Bradesco S.A.')).toBe('bradesco');
    });

    it('deve retornar "santander" para variações do nome Santander', () => {
        expect(getBankKey('Santander')).toBe('santander');
        expect(getBankKey('SANTANDER')).toBe('santander');
        expect(getBankKey('Banco Santander (Brasil) S.A.')).toBe('santander');
    });

    it('deve retornar "bb" para variações do nome Banco do Brasil', () => {
        expect(getBankKey('Banco do Brasil')).toBe('bb');
        expect(getBankKey('BANCO DO BRASIL')).toBe('bb');
        expect(getBankKey('BB ')).toBe('bb');
        expect(getBankKey('bb ')).toBe('bb');
        expect(getBankKey('Conta BB')).toBe('bb');
        expect(getBankKey('BB cartões')).toBe('bb');
        expect(getBankKey('banco bb cartões')).toBe('bb');
    });

    it('deve retornar "inter" para variações do nome Banco Inter', () => {
        expect(getBankKey('Inter')).toBe('inter');
        expect(getBankKey('INTER')).toBe('inter');
        expect(getBankKey('Banco Inter')).toBe('inter');
    });

    it('deve retornar "c6" para variações do nome C6 Bank', () => {
        expect(getBankKey('C6')).toBe('c6');
        expect(getBankKey('C6 Bank')).toBe('c6');
        expect(getBankKey('c6')).toBe('c6');
    });

    it('deve retornar "caixa" para variações do nome Caixa Econômica Federal', () => {
        expect(getBankKey('Caixa')).toBe('caixa');
        expect(getBankKey('CAIXA')).toBe('caixa');
        expect(getBankKey('Caixa Econômica')).toBe('caixa');
    });

    it('deve retornar "default" para nomes de bancos desconhecidos', () => {
        expect(getBankKey('Banco Desconhecido')).toBe('default');
        expect(getBankKey('XP Investimentos')).toBe('default');
        expect(getBankKey('BTG Pactual')).toBe('default');
        expect(getBankKey('Outro Banco Qualquer')).toBe('default');
        expect(getBankKey('')).toBe('default');
        expect(getBankKey('   ')).toBe('default');
    });
});
