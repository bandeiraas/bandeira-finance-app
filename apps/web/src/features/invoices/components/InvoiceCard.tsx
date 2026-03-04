import { CheckCircle, LineChart } from "lucide-react";
import { cn } from "@lib/utils";
import { formatCurrency } from "@shared/utils/formatCurrency";
import { getInvoiceStatusColor, getInvoiceStatusLabel } from "../utils";
import type { Invoice } from "@bandeira/shared";

interface InvoiceCardProps {
    invoice: Invoice;
    isSelected: boolean;
    onClick: () => void;
}

export function InvoiceCard({ invoice, isSelected, onClick }: InvoiceCardProps) {
    const statusColor = getInvoiceStatusColor(invoice.status ?? "");

    return (
        <div
            onClick={onClick}
            className={cn(
                "p-4 rounded-2xl border-l-4 cursor-pointer relative shadow-lg transition-all",
                isSelected ? "bg-white/60 dark:bg-slate-800/60" : "glass-card opacity-70 hover:opacity-100",
                statusColor === "emerald" ? "border-l-emerald-500" : statusColor === "sky" ? "border-l-sky-500" : "border-l-rose-500"
            )}
        >
            <div
                className={cn(
                    "absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide",
                    statusColor === "emerald"
                        ? "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30"
                        : statusColor === "sky"
                          ? "text-sky-600 bg-sky-100 dark:bg-sky-900/30"
                          : "text-rose-600 bg-rose-100 dark:bg-rose-900/30"
                )}
            >
                {getInvoiceStatusLabel(invoice.status ?? "")}
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                    Referência {invoice.period}
                </span>
                <span
                    className={cn("text-xl font-bold", isSelected ? "text-slate-800 dark:text-white" : "text-slate-600 dark:text-slate-300")}
                >
                    {formatCurrency(invoice.total ?? 0)}
                </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-500">
                    Vencimento:{" "}
                    {invoice.due_date
                        ? new Date(invoice.due_date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
                        : "N/A"}
                </span>
                {statusColor === "emerald" && <CheckCircle size={18} className="text-emerald-500" />}
                {statusColor === "sky" && <LineChart size={18} className="text-sky-500" />}
            </div>
        </div>
    );
}
