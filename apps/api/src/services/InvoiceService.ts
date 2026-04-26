import type { IInvoiceRepository, Invoice, Result } from '@bandeira/shared'
import { ResultUtil as R, AppError } from '@bandeira/shared'

export class InvoiceService {
    private repository: IInvoiceRepository
    constructor(repository: IInvoiceRepository) {
        this.repository = repository
    }

    async getInvoices(userId: string): Promise<Result<Invoice[]>> {
        try {
            const invoices = await this.repository.findByUser(userId)
            return R.ok(invoices)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async getInvoicesByCard(cardId: string): Promise<Result<Invoice[]>> {
        try {
            const invoices = await this.repository.findByCard(cardId)
            return R.ok(invoices)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async markAsPaid(id: string, userId: string): Promise<Result<Invoice>> {
        try {
            const invoice = await this.repository.updateStatus(id, userId, 'paid')
            return R.ok(invoice)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }
}
