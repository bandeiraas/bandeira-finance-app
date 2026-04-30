import type { Invoice } from '../../types/models';
export interface IInvoiceRepository {
    findByUser(userId: string): Promise<Invoice[]>;
    findByCard(cardId: string): Promise<Invoice[]>;
    updateStatus(id: string, status: string, userId: string): Promise<Invoice>;
}
