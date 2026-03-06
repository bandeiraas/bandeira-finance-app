import { ShoppingBag } from "lucide-react";
import { formatCurrency } from "@shared/utils/formatCurrency";
import type { DashboardSummary } from "@bandeira/shared";

interface TopTransactionsListProps {
    summary: DashboardSummary | undefined;
    isLoading: boolean;
}

export function TopTransactionsList({ summary, isLoading }: TopTransactionsListProps) {
    const transactions =
        summary?.transactions
            ?.filter((t) => t.type === "expense")
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 3) ?? [];

    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
                Maior Impacto
            </h3>
            <div className="space-y-2">
                {isLoading ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl" />
                    ))
                ) : transactions.length > 0 ? (
                    transactions.map((t) => (
                        <div
                            key={t.id}
                            className="flex items-center justify-between p-3 glass-card rounded-xl border border-slate-100 dark:border-slate-700/30"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                    <ShoppingBag size={14} />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-slate-800 dark:text-white">
                                        {t.description || "Sem descrição"}
                                    </div>
                                    <div className="text-[10px] text-slate-500">
                                        {t.categories?.name || "Geral"} • {new Date(t.date).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            <span className="font-bold text-sm text-slate-800 dark:text-white">
                                {formatCurrency(t.amount)}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-center text-slate-500 text-sm">Nenhuma transação encontrada.</div>
                )}
            </div>
        </div>
    );
}
