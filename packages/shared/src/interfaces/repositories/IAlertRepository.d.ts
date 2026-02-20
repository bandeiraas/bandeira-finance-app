import type { Alert } from '../../types/models';
export interface IAlertRepository {
    findByUser(userId: string): Promise<Alert[]>;
    getUnreadCount(userId: string): Promise<number>;
    markAsRead(id: string): Promise<void>;
    markAllAsRead(userId: string): Promise<void>;
}
