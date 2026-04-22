import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import { getCategoryColor } from "../utils";
import type { DashboardSummary } from "@bandeira/shared";

interface ExpenseChartProps {
    summary: DashboardSummary | undefined;
    isLoading: boolean;
}

export function ExpenseChart({ summary, isLoading }: ExpenseChartProps) {
    const categories = useMemo(() => summary?.expensesByCategory ?? [], [summary?.expensesByCategory]);

    const gradientString = useMemo(() => {
        if (categories.length === 0) return "";
        let prev = 0;
        const gradients = [];
        for (const c of categories) {
            const next = prev + c.percentage;
            gradients.push(`${getCategoryColor(c.categoryColor)} ${prev}% ${next}%`);
            prev = next;
        }
        return `conic-gradient(${gradients.join(", ")})`;
    }, [categories]);

    if (isLoading) {
        return (
            <div className="glass-card p-5 rounded-2xl flex flex-col">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                    Composição de Gastos
                </h3>
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="animate-spin text-slate-400" size={24} />
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card p-5 rounded-2xl flex flex-col">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                Composição de Gastos
            </h3>
            {categories.length > 0 ? (
                <>
                    <div className="flex items-center justify-center flex-1 min-h-[180px]">
                        <div
                            className="relative w-40 h-40 rounded-full"
                            style={{
                                background: gradientString,
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
                        {categories.slice(0, 4).map((cat) => (
                            <div key={cat.categoryName} className="flex items-center gap-2">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: getCategoryColor(cat.categoryColor) }}
                                />
                                <span className="text-slate-600 dark:text-slate-300 truncate">
                                    {cat.categoryName} ({Math.round(cat.percentage)}%)
                                </span>
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
    );
}
