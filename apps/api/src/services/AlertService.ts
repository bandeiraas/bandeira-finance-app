import type { IAlertRepository, Alert, Result } from '@bandeira/shared'
import { ResultUtil as R, AppError } from '@bandeira/shared'

export class AlertService {
    private repository: IAlertRepository
    constructor(repository: IAlertRepository) {
        this.repository = repository
    }

    async getAlerts(userId: string): Promise<Result<Alert[]>> {
        try {
            const alerts = await this.repository.findByUser(userId)
            return R.ok(alerts)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async getUnreadCount(userId: string): Promise<Result<number>> {
        try {
            const count = await this.repository.getUnreadCount(userId)
            return R.ok(count)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async markAsRead(id: string): Promise<Result<void>> {
        try {
            await this.repository.markAsRead(id)
            return R.ok(undefined)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }

    async markAllAsRead(userId: string): Promise<Result<void>> {
        try {
            await this.repository.markAllAsRead(userId)
            return R.ok(undefined)
        } catch (err) {
            return R.fail(AppError.fromUnknown(err))
        }
    }
}
