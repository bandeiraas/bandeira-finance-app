import { useState, useMemo } from "react";
import {
    ListFilter,
    LineChart,
    CheckCircle,
    CreditCard,
    ShoppingBag,
    Loader2
} from "lucide-react";
import { useInvoices } from "../features/invoices/hooks/useInvoices";
import { useMonthlySummary } from "../features/transactions/hooks/useTransactions";
import { formatCurrency } from "../shared/utils/formatCurrency";
import { cn } from "../lib/utils";


export default function Invoices() {
    const { data: invoices, isLoading: loadingInvoices } = useInvoices();
    const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

    // Default to first invoice or current month if no invoices
    const activeInvoice = useMemo(() => {
        if (!invoices || invoices.length === 0) return null;
        return invoices.find(i => i.id === selectedInvoiceId) || invoices[0];
    }, [invoices, selectedInvoiceId]);

    // Parse period from invoice (assuming YYYY-MM) or use current date
    const { month, year } = useMemo(() => {
        if (activeInvoice?.period && activeInvoice.period.includes('-')) {
            const [y, m] = activeInvoice.period.split('-');
            return { month: parseInt(m), year: parseInt(y) };
        }
        const now = new Date();
        return { month: now.getMonth() + 1, year: now.getFullYear() };
    }, [activeInvoice]);

    const { data: summary, isLoading: loadingSummary } = useMonthlySummary(month, year);



    // Mock category colors matches
    const getCategoryColor = (color: string | null) => color || "#94a3b8";

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
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Controle seus gastos e analise tendências mensais</p>
                </div>
                {/* User info is in sidebar/header usually, keeping simple here */}
            </header>

            <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden flex-1">
                {/* Left Column: History Sidebar */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4 overflow-hidden h-full">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Histórico de Gestão</h3>
                        <div className="flex gap-2">
                            <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <ListFilter size={18} />
                            </button>
                            {/* Sorting could be added here */}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3 pb-20">
                        {invoices && invoices.length > 0 ? (
                            invoices.map((invoice) => {
                                const isSelected = activeInvoice?.id === invoice.id;
                                const statusColor =
                                    invoice.status === 'paid' ? 'emerald' :
                                        invoice.status === 'open' ? 'sky' :
                                            'red'; // overdue or closed

                                return (
                                    <div
                                        key={invoice.id}
                                        onClick={() => setSelectedInvoiceId(invoice.id)}
                                        className={cn(
                                            "p-4 rounded-2xl border-l-4 cursor-pointer relative shadow-lg transition-all",
                                            isSelected ? "bg-white/60 dark:bg-slate-800/60" : "glass-card opacity-70 hover:opacity-100",
                                            statusColor === 'emerald' ? "border-l-emerald-500" :
                                                statusColor === 'sky' ? "border-l-sky-500" : "border-l-rose-500"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide",
                                            statusColor === 'emerald' ? "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30" :
                                                statusColor === 'sky' ? "text-sky-600 bg-sky-100 dark:bg-sky-900/30" : "text-rose-600 bg-rose-100 dark:bg-rose-900/30"
                                        )}>
                                            {invoice.status === 'paid' ? 'Pago' : invoice.status === 'open' ? 'Aberta' : 'Fechada'}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                                                Referência {invoice.period}
                                            </span>
                                            <span className={cn("text-xl font-bold", isSelected ? "text-slate-800 dark:text-white" : "text-slate-600 dark:text-slate-300")}>
                                                {formatCurrency(invoice.total || 0)}
                                            </span>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-sm text-slate-500">
                                                Vencimento: {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : 'N/A'}
                                            </span>
                                            {statusColor === 'emerald' && <CheckCircle size={18} className="text-emerald-500" />}
                                            {statusColor === 'sky' && <LineChart size={18} className="text-sky-500" />}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-8 text-center text-slate-500">Nenhuma fatura encontrada.</div>
                        )}
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="w-full lg:w-2/3 glassmorphism rounded-3xl p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto hide-scrollbar h-full">
                    {/* Header Details */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-700/50 pb-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-white capitalize">
                                    Análise de {new Date(year, month - 1).toLocaleString('pt-BR', { month: 'long' })}
                                </h2>
                                <div className="flex items-center gap-2">
                                    {/* Card selection placeholder */}
                                    <div className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium flex items-center gap-2 text-slate-500">
                                        <CreditCard size={16} />
                                        <span>Todos os Cartões</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={cn(
                                    "text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
                                    activeInvoice?.status === 'open' ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200" : "bg-slate-100 text-slate-700"
                                )}>
                                    {activeInvoice?.status === 'open' ? 'Período Aberto' : 'Período Fechado'}
                                </span>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">
                                    Referência: {year}-{month.toString().padStart(2, '0')}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Gasto Total</span>
                            {loadingSummary ? (
                                <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 animate-pulse rounded"></div>
                            ) : (
                                <span className="text-3xl font-display font-bold text-slate-800 dark:text-white">
                                    {formatCurrency(summary?.totalExpenses || 0)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Chart & Top Transactions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Chart Widget */}
                        <div className="glass-card p-5 rounded-2xl flex flex-col">
                            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Composição de Gastos</h3>
                            {loadingSummary ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <Loader2 className="animate-spin text-slate-400" />
                                </div>
                            ) : summary?.expensesByCategory && summary.expensesByCategory.length > 0 ? (
                                <>
                                    <div className="flex items-center justify-center flex-1 min-h-[180px]">
                                        <div className="relative w-40 h-40 rounded-full"
                                            style={{
                                                background: `conic-gradient(${summary.expensesByCategory.map((c, i, arr) => {
                                                    const prev = arr.slice(0, i).reduce((sum, item) => sum + item.percentage, 0);
                                                    return `${getCategoryColor(c.categoryColor)} ${prev}% ${prev + c.percentage}%`;
                                                }).join(', ')})`
                                            }}
                                        >
                                            <div className="absolute inset-0 m-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center shadow-inner">
                                                <div className="text-center">
                                                    <span className="block text-xs text-slate-400">Total</span>
                                                    <span className="block text-sm font-bold text-slate-700 dark:text-slate-200">100%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                                        {summary.expensesByCategory.slice(0, 4).map((cat) => (
                                            <div key={cat.categoryName} className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getCategoryColor(cat.categoryColor) }}></div>
                                                <span className="text-slate-600 dark:text-slate-300 truncate">{cat.categoryName} ({Math.round(cat.percentage)}%)</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
                                    Sem dados para o gráfico
                                </div>
                            )}
                        </div>

                        {/* Top Transactions List */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">Maior Impacto</h3>
                            <div className="space-y-2">
                                {loadingSummary ? (
                                    <div className="space-y-2">
                                        {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl"></div>)}
                                    </div>
                                ) : summary?.transactions && summary.transactions.length > 0 ? (
                                    summary.transactions
                                        .filter(t => t.type === 'expense')
                                        .sort((a, b) => b.amount - a.amount)
                                        .slice(0, 3)
                                        .map((t) => (
                                            <div key={t.id} className="flex items-center justify-between p-3 glass-card rounded-xl border border-slate-100 dark:border-slate-700/30">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                                        <ShoppingBag size={14} />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-slate-800 dark:text-white">{t.description || "Sem descrição"}</div>
                                                        <div className="text-[10px] text-slate-500">{t.categories?.name || "Geral"} • {new Date(t.date).toLocaleDateString()}</div>
                                                    </div>
                                                </div>
                                                <span className="font-bold text-sm text-slate-800 dark:text-white">{formatCurrency(t.amount)}</span>
                                            </div>
                                        ))
                                ) : (
                                    <div className="p-4 text-center text-slate-500 text-sm">Nenhuma transação encontrada.</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom KPIs Mockup (Dynamic later) */}
                    <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700/50 flex flex-col gap-6">
                        {/* Placeholder for future insights */}
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
