import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Plus, Minus, FileText, Lightbulb, CreditCard, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import UserMenu from "@components/UserMenu";
import { cn } from "@lib/utils";
import { useAuth } from "@features/auth/providers/AuthProvider";
import { useMonthlySummary, useTransactions } from "@features/transactions/hooks/useTransactions";
import { useAccounts } from "@features/accounts/hooks/useAccounts";
import { useCards } from "@features/cards/hooks/useCards";
import { CardPreview } from "@features/cards/components/CardPreview";
import { formatCurrency } from "@shared/utils/formatCurrency";
import {
    AccountCard,
    AddAccountCard,
    QuickActionCard,
    RecentTransactionRow,
} from "@features/dashboard/components";

export default function Dashboard() {
    const { user } = useAuth();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const { data: summary, isLoading: loadingSummary } = useMonthlySummary(currentMonth, currentYear);
    const { data: recentTransactions, isLoading: loadingTransactions } = useTransactions(3); // Limit 3
    const { data: accounts, isLoading: loadingAccounts } = useAccounts();
    const { data: cards, isLoading: loadingCards } = useCards();
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);

    const displayCards = cards?.slice(0, 3) ?? [];

    useEffect(() => {

        const max = Math.max(0, displayCards.length - 1);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (selectedCardIndex > max) setSelectedCardIndex(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayCards.length]);

    // Dummy data for financial tip in this phase
    const financialTip = {
        category: "Alimentação",
        savingsPercent: 12,
        goalPercent: 82
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Resumo Financeiro</h1>
                    <p className="text-slate-700 dark:text-slate-400 text-sm">Olá, {user?.fullName?.split(' ')[0] || user?.email}</p>
                </div>
                <div className="flex items-center gap-3">
                    <UserMenu />
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Chart Section */}
                <div className="lg:col-span-8 flex flex-col gap-5">
                    <div className="glassmorphism p-8 rounded-3xl relative overflow-hidden shadow-lg dark:shadow-none">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/5 blur-3xl rounded-full"></div>

                        <div className="flex flex-col md:flex-row items-center gap-10">
                            {/* SVG Chart Placeholder - Dynamic later */}
                            <div className="relative w-64 h-64 shrink-0">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle className="text-slate-200 dark:text-slate-800" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeWidth="8"></circle>
                                    {/* Simplified implementation for now */}
                                    <circle className="transition-all duration-1000 origin-center" cx="50" cy="50" fill="transparent" r="45" stroke="#f59e0b" strokeDasharray="283" strokeDashoffset={loadingSummary ? 283 : 180} strokeLinecap="round" strokeWidth="9"></circle>
                                    <circle className="transition-all duration-1000 origin-center" cx="50" cy="50" fill="transparent" r="45" stroke="#0ea5e9" strokeDasharray="283" strokeDashoffset={loadingSummary ? 283 : 240} strokeLinecap="round" strokeWidth="9"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Saldo Mensal</span>
                                    {loadingSummary ? (
                                        <Loader2 className="animate-spin text-slate-600 dark:text-slate-400" />
                                    ) : (
                                        <span className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                                            {formatCurrency(summary?.balance || 0)}
                                        </span>
                                    )}
                                    <span className="text-[10px] font-medium text-emerald-500">Mês Atual</span>
                                </div>
                            </div>

                            {/* Stats & Categories */}
                            <div className="flex-1 w-full space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <TrendingUp className="text-emerald-500" size={18} />
                                            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Receitas</span>
                                        </div>
                                        {loadingSummary ? (
                                            <div className="h-6 w-24 bg-emerald-500/20 rounded animate-pulse"></div>
                                        ) : (
                                            <p className="text-xl font-display font-bold text-slate-900 dark:text-white">{formatCurrency(summary?.totalIncome || 0)}</p>
                                        )}
                                    </div>
                                    <div className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <TrendingDown className="text-red-500" size={18} />
                                            <span className="text-[10px] font-bold text-red-700 dark:text-red-400 uppercase tracking-wider">Despesas</span>
                                        </div>
                                        {loadingSummary ? (
                                            <div className="h-6 w-24 bg-red-500/20 rounded animate-pulse"></div>
                                        ) : (
                                            <p className="text-xl font-display font-bold text-slate-900 dark:text-white">{formatCurrency(summary?.totalExpenses || 0)}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider">Maiores Gastos por Categoria</h4>
                                    {loadingSummary ? (
                                        <div className="space-y-2">
                                            <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                                            <div className="h-4 w-2/3 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {/* Placeholder for category breakdown, real data would come from summary if implemented */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Gasto Geral</span>
                                                </div>
                                                <span className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(summary?.totalExpenses || 0)}</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className="bg-amber-500 h-full w-[100%]"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Balances */}
                    <div>
                        <div className="flex items-center justify-between mb-4 px-2">
                            <h3 className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-[0.2em]">Saldo de Contas</h3>
                            <Link to="/accounts" className="text-[10px] font-bold text-primary hover:text-primary/80 uppercase hover:underline">Ver Detalhes</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {loadingAccounts ? (
                                [1, 2, 3].map((i) => (
                                    <div key={i} className="glass-card p-5 rounded-2xl h-32 animate-pulse bg-slate-100 dark:bg-slate-800/50"></div>
                                ))
                            ) : accounts && accounts.length > 0 ? (
                                accounts.map((acc) => <AccountCard key={acc.id} account={acc} />)
                            ) : (
                                <AddAccountCard />
                            )}
                        </div>
                    </div>

                    {/* Recent Transactions List */}
                    <div className="glassmorphism p-5 rounded-3xl shadow-lg dark:shadow-none">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h3 className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-[0.2em]">Últimas Transações</h3>
                            <Link to="/transactions" className="text-[10px] font-bold text-slate-700 dark:text-slate-500 uppercase hover:text-primary transition-colors">Ver Tudo</Link>
                        </div>
                        <div className="space-y-1">
                            {loadingTransactions ? (
                                [1, 2, 3].map(i => (
                                    <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800/50 rounded-xl animate-pulse"></div>
                                ))
                            ) : recentTransactions && recentTransactions.length > 0 ? (
                                recentTransactions.map((t) => <RecentTransactionRow key={t.id} transaction={t} />)
                            ) : (
                                <p className="text-sm text-slate-600 dark:text-slate-400 text-center py-6">Nenhuma transação recente.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* My Cards Widget - Stitch reference */}
                    <div className="flex flex-col gap-3 py-4 overflow-hidden">
                        <div className="flex items-center justify-between px-2 mb-0">
                            <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-[0.2em]">Meus Cartões</h3>
                            <div className="flex items-center gap-3">
                                {displayCards.length > 1 && (
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedCardIndex((i) => (i <= 0 ? displayCards.length - 1 : i - 1))}
                                            className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-accent-blue dark:hover:text-accent-blue transition-all shadow-sm border border-slate-100 dark:border-slate-700"
                                            aria-label="Cartão anterior"
                                        >
                                            <ChevronLeft size={14} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedCardIndex((i) => (i >= displayCards.length - 1 ? 0 : i + 1))}
                                            className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-accent-blue dark:hover:text-accent-blue transition-all shadow-sm border border-slate-100 dark:border-slate-700"
                                            aria-label="Próximo cartão"
                                        >
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>
                                )}
                                <Link to="/cards" className="text-[10px] font-bold text-slate-500 dark:text-slate-400 hover:text-accent-blue dark:hover:text-accent-blue transition-colors uppercase">
                                    Ver todos
                                </Link>
                                <Link to="/cards/new" className="p-1 rounded-lg text-slate-500 dark:text-slate-400 hover:text-accent-blue hover:bg-accent-blue/10 transition-colors" aria-label="Novo cartão">
                                    <Plus size={14} />
                                </Link>
                            </div>
                        </div>

                        {loadingCards ? (
                            <div className="w-full max-w-[320px] mx-auto card-ratio bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse min-h-[140px]"></div>
                        ) : displayCards.length > 0 ? (
                            <div className="relative flex flex-col items-center pt-2 px-2 h-[220px] sm:h-[250px] lg:h-[280px] overflow-hidden">
                                <div className="relative w-full max-w-[320px] flex flex-col items-center">
                                    {displayCards.map((card, index) => {
                                        const isSelected = index === selectedCardIndex;
                                        const cardAccount = accounts?.find((a) => a.id === card.account_id);
                                        return (
                                            <button
                                                key={card.id}
                                                type="button"
                                                onClick={() => !isSelected && setSelectedCardIndex(index)}
                                                className={cn(
                                                    "w-full card-ratio rounded-2xl overflow-hidden shadow-md text-left transition-[transform,opacity,box-shadow,border-color] duration-500 ease-out",
                                                    index > 0 && displayCards.length > 1 && "-mt-[175px]",
                                                    isSelected
                                                        ? "z-30 scale-100 opacity-100 border-2 border-primary dark:border-primary cursor-default shadow-2xl"
                                                        : "z-10 scale-90 opacity-80 cursor-pointer hover:opacity-100 hover:scale-[0.92] border border-white/10 dark:border-white/10"
                                                )}
                                            >
                                                <CardPreview
                                                    card={card}
                                                    account={cardAccount ?? null}
                                                    userName={user?.fullName}
                                                    className="absolute inset-0 w-full h-full"
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full max-w-[320px] mx-auto card-ratio min-h-[140px] rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-600 dark:text-slate-400">
                                <CreditCard size={28} className="mb-2 opacity-50" />
                                <span className="text-xs">Nenhum cartão</span>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-[0.2em] px-2">Ações Rápidas</h3>
                        <div className="grid grid-cols-3 gap-2">
                            <QuickActionCard
                                to="/new-income"
                                icon={Plus}
                                label="Receita"
                                iconBgClass="bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white"
                            />
                            <QuickActionCard
                                to="/new-expense"
                                icon={Minus}
                                label="Despesa"
                                iconBgClass="bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white"
                            />
                            <QuickActionCard
                                to="/invoices"
                                icon={FileText}
                                label="Faturas"
                                iconBgClass="bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white"
                            />
                        </div>
                    </div>

                    {/* Financial Tip */}
                    <div className="mt-auto glass-card border-none bg-gradient-to-br from-indigo-500/10 to-primary/5 p-6 rounded-3xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                                <Lightbulb size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-white text-sm">Dica Financeira</h4>
                                <p className="text-[10px] text-slate-600 dark:text-slate-400">Personalizado para você</p>
                            </div>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                            Você economizou {financialTip.savingsPercent}% a mais em <b>{financialTip.category}</b> esta semana. Continue assim para bater sua meta mensal!
                        </p>
                        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/50 flex justify-between items-center">
                            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Meta de Economia</span>
                            <span className="text-sm font-bold text-slate-800 dark:text-white">{financialTip.goalPercent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-indigo-500 w-[82%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
