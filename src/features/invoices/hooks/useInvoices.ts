import { useQuery } from '@tanstack/react-query'
import { invoiceRepository } from '../repositories/InvoiceRepository'
import { useAuth } from '../../auth/providers/AuthProvider'
import { QUERY_KEYS } from '../../../core/constants'

export function useInvoices() {
    const { user } = useAuth()

    return useQuery({
        queryKey: QUERY_KEYS.INVOICES.LIST(user?.id ?? ''),
        queryFn: () => invoiceRepository.findByUser(user!.id),
        enabled: !!user,
    })
}
