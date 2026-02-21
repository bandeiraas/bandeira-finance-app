import { CreditCard } from "lucide-react";
import { formatCurrency } from "@shared/utils/formatCurrency";
import { cn } from "@lib/utils";
import type { Invoice } from "@bandeira/shared";

interface InvoiceDetailHeaderProps {
    month: number;
    year: number;
    activeInvoice: Invoice | null;
    totalExpenses: number;
    isLoading: boolean;
}

export function InvoiceDetailHeader({
    month,
    year,
    activeInvoice,
    totalExpenses,
    isLoading,
}: InvoiceDetailHeaderProps) {
    const monthName = new Date(year, month - 1).toLocaleString("pt-BR", { month: "long" });

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-700/50 pb-6">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white capitalize">
                        Análise de {monthName}
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center gap-2 text-slate-500">
                            <CreditCard size={16} />
                            <span>Todos os Cartões</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span
                        className={cn(
                            "text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
                            activeInvoice?.status === "open"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                                : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                        )}
                    >
                        {activeInvoice?.status === "open" ? "Período Aberto" : "Período Fechado"}
                    </span>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                        Referência: {year}-{month.toString().padStart(2, "0")}
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                    Gasto Total
                </span>
                {isLoading ? (
                    <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 animate-pulse rounded" />
                ) : (
                    <span className="text-3xl font-display font-bold text-slate-800 dark:text-white">
                        {formatCurrency(totalExpenses)}
                    </span>
                )}
            </div>
        </div>
    );
}
