import type { Context } from 'hono'
import type { Env } from '../middleware/auth'
import { SupabaseAccountRepository } from '../repositories/SupabaseAccountRepository'
import { SupabaseTransactionRepository } from '../repositories/SupabaseTransactionRepository'
import { SupabaseCategoryRepository } from '../repositories/SupabaseCategoryRepository'
import { SupabaseAlertRepository } from '../repositories/SupabaseAlertRepository'
import { SupabaseCardRepository } from '../repositories/SupabaseCardRepository'
import { SupabaseInvoiceRepository } from '../repositories/SupabaseInvoiceRepository'
import { SupabaseProfileRepository } from '../repositories/SupabaseProfileRepository'
import { AccountService } from '../services/AccountService'
import { TransactionService } from '../services/TransactionService'
import { CategoryService } from '../services/CategoryService'
import { AlertService } from '../services/AlertService'
import { CardService } from '../services/CardService'
import { InvoiceService } from '../services/InvoiceService'
import { ProfileService } from '../services/ProfileService'

export function getServices(c: Context<Env>) {
    const supabase = c.get('supabase')
    const userId = c.get('userId')

    const accountRepo = new SupabaseAccountRepository(supabase)
    const transactionRepo = new SupabaseTransactionRepository(supabase)
    const categoryRepo = new SupabaseCategoryRepository(supabase)
    const alertRepo = new SupabaseAlertRepository(supabase)
    const cardRepo = new SupabaseCardRepository(supabase)
    const invoiceRepo = new SupabaseInvoiceRepository(supabase)
    const profileRepo = new SupabaseProfileRepository(supabase)

    const accountService = new AccountService(accountRepo)
    const transactionService = new TransactionService(transactionRepo)
    const categoryService = new CategoryService(categoryRepo)
    const alertService = new AlertService(alertRepo)
    const cardService = new CardService(cardRepo)
    const invoiceService = new InvoiceService(invoiceRepo)
    const profileService = new ProfileService(profileRepo)

    return {
        userId,
        accountService,
        transactionService,
        categoryService,
        alertService,
        cardService,
        invoiceService,
        profileService,
    }
}
