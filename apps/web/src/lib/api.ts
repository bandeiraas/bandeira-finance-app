import type { Account, Alert, Card, Category, DashboardSummary, Invoice, Profile, Transaction } from '@bandeira/shared'

const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

function headers(token: string, json = true): HeadersInit {
    const h: Record<string, string> = {
        Authorization: `Bearer ${token}`,
    }
    if (json) h['Content-Type'] = 'application/json'
    return h
}

async function parse<T>(res: Response): Promise<T> {
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
        const msg = (data as { message?: string; error?: string })?.message ?? (data as { message?: string; error?: string })?.error ?? 'Request failed'
        throw new Error(msg)
    }
    return data as T
}

export const api = {
    accounts: {
        list: (token: string): Promise<Account[]> =>
            fetch(`${baseUrl}/api/accounts`, { headers: headers(token) }).then((r) => parse<Account[]>(r)),
        totalBalance: (token: string): Promise<number> =>
            fetch(`${baseUrl}/api/accounts/total-balance`, { headers: headers(token) })
                .then((r) => parse<{ balance: number }>(r))
                .then((x) => x.balance),
        create: (token: string, data: { bankName: string; accountType: string; balance?: number; color?: string; isPrimary?: boolean }) =>
            fetch(`${baseUrl}/api/accounts`, { method: 'POST', headers: headers(token), body: JSON.stringify(data) }).then((r) => parse<Account>(r)),
    },
    transactions: {
        list: (token: string, limit?: number): Promise<Transaction[]> => {
            const url = limit !== undefined ? `${baseUrl}/api/transactions?limit=${limit}` : `${baseUrl}/api/transactions`
            return fetch(url, { headers: headers(token) }).then((r) => parse<Transaction[]>(r))
        },
        summary: (token: string, month: number, year: number): Promise<DashboardSummary> =>
            fetch(`${baseUrl}/api/transactions/summary?month=${month}&year=${year}`, { headers: headers(token) }).then((r) => parse<DashboardSummary>(r)),
        createIncome: (token: string, data: { amount: number; description: string; categoryId: string; accountId: string; date: string }) =>
            fetch(`${baseUrl}/api/transactions/income`, { method: 'POST', headers: headers(token), body: JSON.stringify(data) }).then((r) => parse(r)),
        createExpense: (token: string, data: { amount: number; description: string; categoryId: string; accountId: string; date: string }) =>
            fetch(`${baseUrl}/api/transactions/expense`, { method: 'POST', headers: headers(token), body: JSON.stringify(data) }).then((r) => parse(r)),
        delete: (token: string, id: string) =>
            fetch(`${baseUrl}/api/transactions/${id}`, { method: 'DELETE', headers: headers(token) }).then((r) => (r.ok ? undefined : parse(r).then(() => { throw new Error('Delete failed') }))),
    },
    categories: {
        list: (token: string, type?: 'income' | 'expense'): Promise<Category[]> => {
            const url = type ? `${baseUrl}/api/categories?type=${type}` : `${baseUrl}/api/categories`
            return fetch(url, { headers: headers(token) }).then((r) => parse<Category[]>(r))
        },
    },
    alerts: {
        list: (token: string): Promise<Alert[]> => fetch(`${baseUrl}/api/alerts`, { headers: headers(token) }).then((r) => parse<Alert[]>(r)),
        unreadCount: (token: string) =>
            fetch(`${baseUrl}/api/alerts/unread-count`, { headers: headers(token) })
                .then((r) => parse<{ count: number }>(r))
                .then((x) => x.count),
        markAsRead: (token: string, id: string) =>
            fetch(`${baseUrl}/api/alerts/${id}/read`, { method: 'PATCH', headers: headers(token) }).then((r) => (r.ok ? undefined : parse(r).then(() => { throw new Error('Update failed') }))),
        markAllAsRead: (token: string) =>
            fetch(`${baseUrl}/api/alerts/mark-all-read`, { method: 'POST', headers: headers(token) }).then((r) => (r.ok ? undefined : parse(r).then(() => { throw new Error('Update failed') }))),
    },
    cards: {
        list: (token: string): Promise<Card[]> => fetch(`${baseUrl}/api/cards`, { headers: headers(token) }).then((r) => parse<Card[]>(r)),
        create: (token: string, data: { brand: string; last_four: string; expiry: string; card_name: string; credit_limit: number }) =>
            fetch(`${baseUrl}/api/cards`, { method: 'POST', headers: headers(token), body: JSON.stringify(data) }).then((r) => parse<Card>(r)),
        delete: (token: string, id: string) =>
            fetch(`${baseUrl}/api/cards/${id}`, { method: 'DELETE', headers: headers(token) }).then((r) => (r.ok ? undefined : parse(r).then(() => { throw new Error('Delete failed') }))),
    },
    invoices: {
        list: (token: string): Promise<Invoice[]> => fetch(`${baseUrl}/api/invoices`, { headers: headers(token) }).then((r) => parse<Invoice[]>(r)),
    },
    profile: {
        get: (token: string): Promise<Profile> => fetch(`${baseUrl}/api/profile`, { headers: headers(token) }).then((r) => parse<Profile>(r)),
        update: (token: string, data: Record<string, unknown>): Promise<Profile> =>
            fetch(`${baseUrl}/api/profile`, { method: 'PATCH', headers: headers(token), body: JSON.stringify(data) }).then((r) => parse<Profile>(r)),
        uploadAvatar: async (token: string, file: File) => {
            const formData = new FormData()
            formData.append('file', file)
            const res = await fetch(`${baseUrl}/api/profile/avatar`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            })
            const data = await parse<{ avatarUrl: string }>(res)
            return data.avatarUrl
        },
    },
}
