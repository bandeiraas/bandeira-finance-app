import type { Tables } from './database.types'

// Domain models — enriched versions of database rows
export type Profile = Tables<'profiles'>
export type Account = Tables<'accounts'>
export type Category = Tables<'categories'>
export type Card = Tables<'cards'>
export type Invoice = Tables<'invoices'>
export type Alert = Tables<'alerts'>

// Transaction with joined category
export interface Transaction extends Tables<'transactions'> {
    categories?: Category | null
}

// Dashboard summary
export interface DashboardSummary {
    totalIncome: number
    totalExpenses: number
    balance: number
    transactions: Transaction[]
    expensesByCategory: CategorySummary[]
}

export interface CategorySummary {
    categoryName: string
    categoryColor: string | null
    total: number
    percentage: number
}

// Auth user
export interface AuthUser {
    id: string
    email: string
    fullName: string | null
    avatarUrl: string | null
}
