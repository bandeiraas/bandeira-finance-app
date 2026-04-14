import { useState, useMemo } from "react";
import { ListFilter, LineChart, Loader2 } from "lucide-react";
import { useInvoices } from "@features/invoices/hooks/useInvoices";
import { useMonthlySummary } from "@features/transactions/hooks/useTransactions";
import {
    InvoiceCard,
    InvoiceDetailHeader,
    ExpenseChart,
    TopTransactionsList,
} from "@features/invoices/components";

export default function Invoices() {
    const { data: invoices, isLoading: loadingInvoices } = useInvoices();
    const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

    const activeInvoice = useMemo(() => {
        if (!invoices || invoices.length === 0) return null;
        return invoices.find((i) => i.id === selectedInvoiceId) || invoices[0];
    }, [invoices, selectedInvoiceId]);

    const { month, year } = useMemo(() => {
        if (activeInvoice?.period && activeInvoice.period.includes("-")) {
            const [y, m] = activeInvoice.period.split("-");
            return { month: parseInt(m), year: parseInt(y) };
        }
        const now = new Date();
        return { month: now.getMonth() + 1, year: now.getFullYear() };
    }, [activeInvoice]);

    const { data: summary, isLoading: loadingSummary } = useMonthlySummary(month, year);

    if (loadingInvoices) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6 h-full flex flex-col animate-fade-in">
            <header className="flex items-center justify-between mb-8 shrink-0">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">Faturas</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Controle seus gastos e analise tendências mensais
                    </p>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden flex-1">
                {/* Left Column: History Sidebar */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4 overflow-hidden h-full">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Histórico de Gestão
                        </h3>
                        <div className="flex gap-2">
                            <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" aria-label="Filtrar histórico">
                                <ListFilter size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3 pb-20">
                        {invoices && invoices.length > 0 ? (
                            invoices.map((invoice) => (
                                <InvoiceCard
                                    key={invoice.id}
                                    invoice={invoice}
                                    isSelected={activeInvoice?.id === invoice.id}
                                    onClick={() => setSelectedInvoiceId(invoice.id)}
                                />
                            ))
                        ) : (
                            <div className="p-8 text-center text-slate-500">Nenhuma fatura encontrada.</div>
                        )}
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="w-full lg:w-2/3 glassmorphism rounded-3xl p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto hide-scrollbar h-full">
                    <InvoiceDetailHeader
                        month={month}
                        year={year}
                        activeInvoice={activeInvoice ?? null}
                        totalExpenses={summary?.totalExpenses ?? 0}
                        isLoading={loadingSummary}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ExpenseChart summary={summary} isLoading={loadingSummary ?? false} />
                        <TopTransactionsList summary={summary} isLoading={loadingSummary ?? false} />
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700/50 flex flex-col gap-6">
                        <div className="bg-slate-800 dark:bg-slate-100 p-4 rounded-xl flex items-center justify-between text-white dark:text-slate-900 opacity-80">
                            <div className="flex items-center gap-3">
                                <LineChart size={20} className="text-accent-blue" />
                                <span className="text-sm font-medium">Insights financeiros em breve...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
