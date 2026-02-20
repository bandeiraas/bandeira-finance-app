import type { Tables } from './database.types'

export type { AuthUser, AuthSession, SignUpData, SignInData, AuthResult } from './auth.types'

export type Profile = Tables<'profiles'>
export type Account = Tables<'accounts'>
export type Category = Tables<'categories'>
export type Card = Tables<'cards'>
export type Invoice = Tables<'invoices'>
export type Alert = Tables<'alerts'>

export interface Transaction extends Tables<'transactions'> {
    categories?: Category | null
}

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
