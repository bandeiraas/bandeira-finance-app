// Query Keys for React Query
export const QUERY_KEYS = {
    AUTH: {
        SESSION: ['auth', 'session'],
        PROFILE: ['auth', 'profile'],
    },
    TRANSACTIONS: {
        ALL: ['transactions'],
        LIST: (userId, month, year) => ['transactions', userId, month, year],
        DETAIL: (id) => ['transactions', id],
    },
    ACCOUNTS: {
        ALL: ['accounts'],
        LIST: (userId) => ['accounts', userId],
        DETAIL: (id) => ['accounts', id],
    },
    CARDS: {
        ALL: ['cards'],
        LIST: (userId) => ['cards', userId],
    },
    INVOICES: {
        ALL: ['invoices'],
        LIST: (userId) => ['invoices', userId],
    },
    ALERTS: {
        ALL: ['alerts'],
        LIST: (userId) => ['alerts', userId],
        UNREAD_COUNT: (userId) => ['alerts', 'unread', userId],
    },
    CATEGORIES: {
        ALL: ['categories'],
    },
    DASHBOARD: {
        SUMMARY: (userId, month, year) => ['dashboard', 'summary', userId, month, year],
    },
};
// Transaction types
export const TransactionType = {
    INCOME: 'income',
    EXPENSE: 'expense',
};
// Account types
export const AccountType = {
    CHECKING: 'corrente',
    SAVINGS: 'poupanca',
    INVESTMENT: 'investimento',
};
// Invoice statuses
export const InvoiceStatus = {
    OPEN: 'open',
    PAID: 'paid',
    OVERDUE: 'overdue',
};
// Alert types
export const AlertType = {
    INFO: 'info',
    WARNING: 'warning',
    SUCCESS: 'success',
    DANGER: 'danger',
};
