import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus, Loader2, Search, Filter, ChevronDown, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { useAccounts } from "@features/accounts/hooks/useAccounts";
import { useMonthlySummary, useTransactions } from "@features/transactions/hooks/useTransactions";
import { formatCurrency } from "@shared/utils/formatCurrency";
import { cn } from "@lib/utils";
import {
    AccountIcon,
    TransactionIcon,
    BalanceSummaryCard,
} from "@features/accounts/components";
import { ACCOUNT_TYPE_LABELS } from "@features/accounts/constants";

export default function Accounts() {
    const [searchTerm, setSearchTerm] = useState("");
    const [showBalance, setShowBalance] = useState(true);
    const [period, setPeriod] = useState("30");
    const [currentPage, setCurrentPage] = useState(1);

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const { data: accounts, isLoading } = useAccounts();
    const { data: summary, isLoading: loadingSummary } = useMonthlySummary(currentMonth, currentYear);
    const { data: transactions, isLoading: loadingTransactions } = useTransactions(50);

    const totalBalance = accounts?.reduce((sum, a) => sum + Number(a.balance), 0) ?? 0;
    const accountById = useMemo(() => {
        const map: Record<string, { bank_name: string }> = {};
        accounts?.forEach((a) => {
            map[a.id] = { bank_name: a.bank_name };
        });
        return map;
    }, [accounts]);

    const filteredTransactions = useMemo(() => {
        if (!transactions) return [];
        return transactions.filter((t) =>
            (t.description ?? "").toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [transactions, searchTerm]);

    const flattenedWithLabels = useMemo(() => {
        return filteredTransactions.map((t) => {
            const d = new Date(t.date);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            let label: string;
            if (d.toDateString() === today.toDateString())
                label = `Hoje, ${d.toLocaleDateString("pt-BR", { day: "numeric", month: "long" })}`;
            else if (d.toDateString() === yesterday.toDateString())
                label = `Ontem, ${d.toLocaleDateString("pt-BR", { day: "numeric", month: "long" })}`;
            else
                label = d.toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                });
            return { ...t, _groupLabel: label };
        });
    }, [filteredTransactions]);

    const PAGE_SIZE = 24;
    const totalPages = Math.max(1, Math.ceil(flattenedWithLabels.length / PAGE_SIZE));
    const paginatedItems = flattenedWithLabels.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const groupedForPage = useMemo(() => {
        const g: Record<string, typeof paginatedItems> = {};
        paginatedItems.forEach((item) => {
            if (!g[item._groupLabel]) g[item._groupLabel] = [];
            g[item._groupLabel].push(item);
        });
        return g;
    }, [paginatedItems]);

    if (isLoading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full animate-fade-in">
            <header className="mb-6 flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">
                        Saúde Financeira
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Visão geral de suas contas e atividades recentes.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        to="/new-income"
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                    >
                        <Plus size={20} />
                        Nova Transação
                    </Link>
                </div>
            </header>

            <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
                {/* Left: Suas Contas */}
                <div className="w-full sm:w-72 lg:w-80 flex flex-col shrink-0 gap-4 overflow-y-auto hide-scrollbar">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="font-display font-bold text-slate-800 dark:text-white">
                            Suas Contas
                        </h3>
                        <Link
                            to="/accounts"
                            className="text-primary hover:underline text-xs font-semibold"
                        >
                            Ver todas
                        </Link>
                    </div>

                    <div className="space-y-3">
                        <BalanceSummaryCard
                            totalBalance={totalBalance}
                            showBalance={showBalance}
                            onToggleBalance={() => setShowBalance(!showBalance)}
                            totalIncome={summary?.totalIncome ?? 0}
                            totalExpenses={summary?.totalExpenses ?? 0}
                            isLoadingSummary={loadingSummary}
                        />

                        {/* Account List */}
                        {accounts && accounts.length > 0 ? (
                            <>
                                {accounts.map((acc) => {
                                    const isSelected = acc.is_primary;
                                    return (
                                        <Link
                                            key={acc.id}
                                            to={`/accounts/${acc.id}`}
                                            className={cn("w-full text-left p-4 rounded-2xl flex items-center gap-4 group transition-all", isSelected ? "glass-card bg-white/80 dark:bg-slate-800/80 border-l-4 border-l-primary" : "glass-card bg-white/40 dark:bg-slate-900/40")}
                                        >
                                            <AccountIcon name={acc.bank_name} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                                                    {acc.bank_name}
                                                </p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    {acc.is_primary
                                                        ? "Principal"
                                                        : ACCOUNT_TYPE_LABELS[acc.account_type] ??
                                                          acc.account_type}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-slate-800 dark:text-white">
                                                    {formatCurrency(Number(acc.balance))}
                                                </p>
                                            </div>
                                        </Link>
                                    );
                                })}
                                <Link
                                    to="/accounts/add"
                                    className="w-full text-left p-4 glass-card bg-white/40 dark:bg-slate-900/40 rounded-2xl flex items-center gap-4 group border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-primary/50 hover:bg-primary/5 text-slate-400 hover:text-primary transition-all"
                                >
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-slate-200 dark:bg-slate-800">
                                        <Plus size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">Adicionar conta</p>
                                    </div>
                                </Link>
                            </>
                        ) : (
                            <Link
                                to="/accounts/add"
                                className="w-full text-left p-4 glass-card bg-white/40 dark:bg-slate-900/40 rounded-2xl flex items-center gap-4 group border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-primary/50 hover:bg-primary/5 text-slate-400 hover:text-primary transition-all"
                            >
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-slate-200 dark:bg-slate-800">
                                    <Plus size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold">Nenhuma conta cadastrada</p>
                                    <p className="text-xs">Clique para adicionar</p>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Right: Transações */}
                <div className="flex-1 flex flex-col min-w-0 bg-white/40 dark:bg-slate-900/40 rounded-3xl border border-white/20 dark:border-slate-700/30 overflow-hidden shadow-sm">
                    {/* Toolbar */}
                    <div className="p-6 border-b border-white/20 dark:border-slate-800/50 flex flex-col md:flex-row md:items-center gap-4 shrink-0">
                        <div className="relative flex-1">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Buscar transações..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
                            <button className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shrink-0 shadow-sm">
                                <Filter size={18} />
                                Filtros
                            </button>
                            <div className="relative">
                                <select
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value)}
                                    className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium pr-10 pl-4 py-2 text-slate-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary shrink-0 shadow-sm cursor-pointer outline-none"
                                >
                                    <option value="7">Últimos 7 dias</option>
                                    <option value="30">Últimos 30 dias</option>
                                    <option value="60">Mês atual</option>
                                    <option value="90">Personalizado</option>
                                </select>
                                <ChevronDown
                                    className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
                                    size={20}
                                />
                            </div>
                            <button className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shrink-0 shadow-sm">
                                <Download size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Transaction List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
                        {loadingTransactions ? (
                            <div className="flex justify-center py-12">
                                <Loader2 size={32} className="animate-spin text-primary" />
                            </div>
                        ) : filteredTransactions.length > 0 ? (
                            Object.entries(groupedForPage).map(([label, items]) => (
                                    <div key={label}>
                                        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                                            {label}
                                        </h5>
                                        <div className="space-y-3">
                                            {items.map((t) => {
                                                const accountName =
                                                    accountById[t.account_id]?.bank_name ?? "Conta";
                                                const time = new Date(t.date).toLocaleTimeString("pt-BR", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                });
                                                return (
                                                    <div
                                                        key={t.id}
                                                        className="flex items-center justify-between p-3.5 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-2xl transition-all cursor-pointer group"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <TransactionIcon
                                                                categoryName={t.categories?.name}
                                                                type={t.type}
                                                            />
                                                            <div>
                                                                <p className="text-sm font-bold text-slate-800 dark:text-white">
                                                                    {t.description ?? "Transação"}
                                                                </p>
                                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                                    {t.categories?.name ?? "—"} • {time}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p
                                                                className={cn("text-sm font-bold", t.type === "income" ? "text-emerald-500" : "text-rose-500")}
                                                            >
                                                                {t.type === "income" ? "+" : "-"} {formatCurrency(Number(t.amount))}
                                                            </p>
                                                            <p className="text-[10px] text-slate-400">
                                                                {accountName} •{" "}
                                                                {t.type === "income" ? "Entrada" : "Saída"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-slate-500 dark:text-slate-400">
                                <p className="font-medium">Nenhuma transação encontrada</p>
                                <p className="text-sm mt-1">Busque por outro termo ou adicione uma transação</p>
                            </div>
                        )}
                    </div>

                    {/* Footer Pagination */}
                    {filteredTransactions.length > 0 && (
                        <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-white/20 dark:border-slate-800/50 flex items-center justify-between text-xs text-slate-500 shrink-0">
                            <p>Exibindo {filteredTransactions.length} de {transactions?.length ?? 0} transações</p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage <= 1}
                                    className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <span className="font-medium">
                                    {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage >= totalPages}
                                    className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 transition-colors"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
