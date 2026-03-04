import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { cn } from "@lib/utils";
import { formatCurrency } from "@shared/utils/formatCurrency";
import { BAR_HEIGHTS } from "../constants";

interface BalanceSummaryCardProps {
    totalBalance: number;
    showBalance: boolean;
    onToggleBalance: () => void;
    totalIncome?: number;
    totalExpenses?: number;
    isLoadingSummary?: boolean;
}

export function BalanceSummaryCard({
    totalBalance,
    showBalance,
    onToggleBalance,
    totalIncome = 0,
    totalExpenses = 0,
    isLoadingSummary = false,
}: BalanceSummaryCardProps) {
    return (
        <div className="p-5 bg-slate-900 dark:bg-slate-800 rounded-2xl text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Saldo Total
                    </span>
                    <button
                        onClick={onToggleBalance}
                        className="text-slate-400 hover:text-slate-200 transition-colors"
                        aria-label={showBalance ? "Ocultar saldo" : "Mostrar saldo"}
                    >
                        {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>
                <h4 className="text-2xl font-display font-bold mb-3">
                    {showBalance ? formatCurrency(totalBalance) : "••••••"}
                </h4>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 rounded-lg">
                        <TrendingUp size={14} className="text-emerald-400" />
                        <span className="text-emerald-400 text-[11px] font-bold">+12.5%</span>
                    </div>
                    <div className="h-8 flex-1 flex items-end gap-[2px] pb-1">
                        {BAR_HEIGHTS.map((h, i) => (
                            <div
                                key={i}
                                className={cn("flex-1 rounded-full", i >= 5 ? "bg-primary" : "bg-slate-700/50")}
                                style={{ height: `${h}%` }}
                            />
                        ))}
                    </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-slate-500 uppercase font-medium">Entradas</span>
                        <span className="text-[11px] font-bold text-emerald-400">
                            {isLoadingSummary ? "—" : formatCurrency(totalIncome)}
                        </span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-[9px] text-slate-500 uppercase font-medium">Saídas</span>
                        <span className="text-[11px] font-bold text-rose-400">
                            {isLoadingSummary ? "—" : formatCurrency(totalExpenses)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
