import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { formatDate, formatRelativeDate } from './formatDate'

describe('formatDate', () => {
    it('deve formatar uma data ISO no formato pt-BR', () => {
        const dateString = '2024-01-10T12:00:00Z'
        // Como o JS usa a data local, o fuso pode mudar o dia. Vamos mockar o fuso horário ou
        // construir a string com o fuso local do ambiente. Para evitar problemas de fuso,
        // vamos usar uma data fixa e validar o formato gerado.
        const formatted = formatDate(dateString)

        // Dependendo do TZ, pode ser 10 de jan. de 2024
        // Apenas verificamos se contém partes da data
        expect(formatted).toMatch(/10 de jan\. de 2024/)
    })

    it('deve formatar corretamente para diferentes datas', () => {
        const dateString = '2024-12-25T12:00:00Z'
        const formatted = formatDate(dateString)
        expect(formatted).toMatch(/25 de dez\. de 2024/)
    })
})

describe('formatRelativeDate', () => {
    const fixedNow = new Date('2024-01-10T15:30:00.000Z')

    beforeEach(() => {
        vi.useFakeTimers()
        vi.setSystemTime(fixedNow)
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('deve retornar "Hoje, HH:mm" para o mesmo dia', () => {
        const todayDate = new Date(fixedNow)
        todayDate.setHours(todayDate.getHours() - 2) // 2 horas antes

        const formatted = formatRelativeDate(todayDate.toISOString())

        const time = new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(todayDate)

        expect(formatted).toBe(`Hoje, ${time}`)
    })

    it('deve retornar "Ontem, HH:mm" para o dia anterior', () => {
        const yesterdayDate = new Date(fixedNow)
        yesterdayDate.setDate(yesterdayDate.getDate() - 1)
        yesterdayDate.setHours(yesterdayDate.getHours() - 2)

        const formatted = formatRelativeDate(yesterdayDate.toISOString())

        const time = new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(yesterdayDate)

        expect(formatted).toBe(`Ontem, ${time}`)
    })

    it('deve retornar "X dias atrás" para datas entre 2 e 6 dias atrás', () => {
        const daysAgoDate = new Date(fixedNow)
        daysAgoDate.setDate(daysAgoDate.getDate() - 3)

        const formatted = formatRelativeDate(daysAgoDate.toISOString())

        expect(formatted).toBe('3 dias atrás')
    })

    it('deve retornar a data formatada normal para mais de 6 dias atrás', () => {
        const oldDate = new Date(fixedNow)
        oldDate.setDate(oldDate.getDate() - 10) // 10 dias atrás (2023-12-31)

        const formatted = formatRelativeDate(oldDate.toISOString())

        expect(formatted).toBe(formatDate(oldDate.toISOString()))
    })
})
