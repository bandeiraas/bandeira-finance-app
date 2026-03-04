export { CARD_BRANDS, CARD_BRAND_SLUGS, type CardBrandSlug } from './cardBrands'

// Query Keys for React Query
export const QUERY_KEYS = {
    AUTH: {
        SESSION: ['auth', 'session'] as const,
        PROFILE: ['auth', 'profile'] as const,
    },
    TRANSACTIONS: {
        ALL: ['transactions'] as const,
        LIST: (userId: string, month: number, year: number) =>
            ['transactions', userId, month, year] as const,
        DETAIL: (id: string) => ['transactions', id] as const,
    },
    ACCOUNTS: {
        ALL: ['accounts'] as const,
        LIST: (userId: string) => ['accounts', userId] as const,
        DETAIL: (id: string) => ['accounts', id] as const,
    },
    CARDS: {
        ALL: ['cards'] as const,
        LIST: (userId: string) => ['cards', userId] as const,
    },
    INVOICES: {
        ALL: ['invoices'] as const,
        LIST: (userId: string) => ['invoices', userId] as const,
    },
    ALERTS: {
        ALL: ['alerts'] as const,
        LIST: (userId: string) => ['alerts', userId] as const,
        UNREAD_COUNT: (userId: string) => ['alerts', 'unread', userId] as const,
    },
    CATEGORIES: {
        ALL: ['categories'] as const,
    },
    DASHBOARD: {
        SUMMARY: (userId: string, month: number, year: number) =>
            ['dashboard', 'summary', userId, month, year] as const,
    },
} as const

// Transaction types
export const TransactionType = {
    INCOME: 'income',
    EXPENSE: 'expense',
} as const
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]

// Account types
export const AccountType = {
    CHECKING: 'corrente',
    SAVINGS: 'poupanca',
    INVESTMENT: 'investimento',
} as const
export type AccountType = (typeof AccountType)[keyof typeof AccountType]

// Invoice statuses
export const InvoiceStatus = {
    OPEN: 'open',
    PAID: 'paid',
    OVERDUE: 'overdue',
} as const
export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus]

// Alert types
export const AlertType = {
    INFO: 'info',
    WARNING: 'warning',
    SUCCESS: 'success',
    DANGER: 'danger',
} as const
export type AlertType = (typeof AlertType)[keyof typeof AlertType]
