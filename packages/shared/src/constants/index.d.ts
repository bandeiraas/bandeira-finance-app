export declare const QUERY_KEYS: {
    readonly AUTH: {
        readonly SESSION: readonly ["auth", "session"];
        readonly PROFILE: readonly ["auth", "profile"];
    };
    readonly TRANSACTIONS: {
        readonly ALL: readonly ["transactions"];
        readonly LIST: (userId: string, month: number, year: number) => readonly ["transactions", string, number, number];
        readonly DETAIL: (id: string) => readonly ["transactions", string];
    };
    readonly ACCOUNTS: {
        readonly ALL: readonly ["accounts"];
        readonly LIST: (userId: string) => readonly ["accounts", string];
        readonly DETAIL: (id: string) => readonly ["accounts", string];
    };
    readonly CARDS: {
        readonly ALL: readonly ["cards"];
        readonly LIST: (userId: string) => readonly ["cards", string];
    };
    readonly INVOICES: {
        readonly ALL: readonly ["invoices"];
        readonly LIST: (userId: string) => readonly ["invoices", string];
    };
    readonly ALERTS: {
        readonly ALL: readonly ["alerts"];
        readonly LIST: (userId: string) => readonly ["alerts", string];
        readonly UNREAD_COUNT: (userId: string) => readonly ["alerts", "unread", string];
    };
    readonly CATEGORIES: {
        readonly ALL: readonly ["categories"];
    };
    readonly DASHBOARD: {
        readonly SUMMARY: (userId: string, month: number, year: number) => readonly ["dashboard", "summary", string, number, number];
    };
};
export declare const TransactionType: {
    readonly INCOME: "income";
    readonly EXPENSE: "expense";
};
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
export declare const AccountType: {
    readonly CHECKING: "corrente";
    readonly SAVINGS: "poupanca";
    readonly INVESTMENT: "investimento";
};
export type AccountType = (typeof AccountType)[keyof typeof AccountType];
export declare const InvoiceStatus: {
    readonly OPEN: "open";
    readonly PAID: "paid";
    readonly OVERDUE: "overdue";
};
export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus];
export declare const AlertType: {
    readonly INFO: "info";
    readonly WARNING: "warning";
    readonly SUCCESS: "success";
    readonly DANGER: "danger";
};
export type AlertType = (typeof AlertType)[keyof typeof AlertType];
