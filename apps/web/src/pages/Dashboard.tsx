import { TrendingUp, TrendingDown, Plus, Minus, FileText, Lightbulb, CreditCard, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import UserMenu from "@components/UserMenu";
import { useAuth } from "@features/auth/providers/AuthProvider";
import { useMonthlySummary, useTransactions } from "@features/transactions/hooks/useTransactions";
import { useAccounts } from "@features/accounts/hooks/useAccounts";
import { useCards } from "@features/cards/hooks/useCards";
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

    const primaryCard = cards?.[0];

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
                    {/* My Cards Widget */}
                    <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            <CreditCard size={40} className="text-slate-300 dark:text-slate-200 mask-image-b" />
                        </div>
                        <div className="flex justify-between items-center mb-4 relative z-10">
                            <h3 className="text-[10px] font-bold text-slate-700 dark:text-slate-400 uppercase tracking-[0.2em]">Meus Cartões</h3>
                            <Link to="/cards/new" className="text-primary hover:bg-primary/10 p-1 rounded-lg transition-colors">
                                <Plus size={16} />
                            </Link>
                        </div>

                        {loadingCards ? (
                            <div className="w-full aspect-[1.586/1] bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
                        ) : primaryCard ? (
                            <div className="relative aspect-[1.586/1] rounded-2xl p-5 text-white shadow-xl bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden mb-4 group-hover:scale-[1.02] transition-transform duration-500">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <span className="text-[9px] font-bold bg-white/20 px-2 py-0.5 rounded-full border border-white/20 backdrop-blur-sm">
                                            {primaryCard.brand || 'CARTÃO'}
                                        </span>
                                        <div className="flex -space-x-1.5 opacity-80">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-white/50 font-mono mb-0.5 tracking-widest">
                                            •••• {primaryCard.last_four}
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div className="text-[11px] text-white/80 font-semibold uppercase tracking-wider">
                                                {user?.fullName || "Usuário"}
                                            </div>
                                            <div className="text-[9px] text-white/50 uppercase tracking-widest">
                                                {primaryCard.expiry ? new Date(primaryCard.expiry).toLocaleDateString('pt-BR', { month: '2-digit', year: '2-digit' }) : 'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="aspect-[1.586/1] rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-600 dark:text-slate-400 mb-4">
                                <CreditCard size={32} className="mb-2 opacity-50" />
                                <span className="text-xs">Nenhum cartão</span>
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Limite Disp.</span>
                            </div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                                {primaryCard ? formatCurrency(Number(primaryCard.credit_limit) - 0) : 'R$ 0,00'}
                            </span>
                        </div>
                        <div className="w-full h-1 bg-slate-100 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                            <div
                                className="h-full bg-emerald-500 transition-all duration-500"
                                style={{
                                    width: primaryCard
                                        ? `${Math.min(((Number(primaryCard.credit_limit) - 0) / Number(primaryCard.credit_limit)) * 100, 100)}%`
                                        : '0%'
                                }}
                            ></div>
                        </div>
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
