import { useState } from "react";
import { Plus, Minus, FileText, ChevronLeft, ChevronRight, Search, Download, Trash2, ArrowDownRight, ShoppingBag, Loader2, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@lib/utils";
import { useTransactions, useDeleteTransaction, useMonthlySummary } from "@features/transactions/hooks/useTransactions";
import { formatCurrency } from "@shared/utils/formatCurrency";

export default function Transactions() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState<'all' | 'income' | 'expense'>('all');

    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const { data: transactions, isLoading } = useTransactions(50);
    const { data: summary } = useMonthlySummary(month, year);
    const deleteTransaction = useDeleteTransaction();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    const handleDelete = async (id: string) => {
        if (confirm("Tem certeza que deseja excluir esta transação?")) {
            await deleteTransaction.mutateAsync(id);
        }
    };

    // Client-side filtering
    const filteredTransactions = transactions?.filter(t => {
        const matchesSearch = (t.description || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'all' || t.type === selectedType;
        // Optionally filter by month if needed, but for now showing all fetched
        return matchesSearch && matchesType;
    });

    const getIconStyles = (type: string) => {
        if (type === 'income') return "bg-emerald-500/10 text-emerald-500";
        if (type === 'expense') return "bg-rose-500/10 text-rose-500";
        return "bg-slate-100 text-slate-500";
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">Transações</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Gerencie suas entradas e saídas</p>
                </div>
                <div className="flex items-center gap-3">
                    <button aria-label="Exportar" className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <Download size={20} />
                    </button>
                    <Link to="/new-income" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-colors flex items-center gap-2 text-sm shadow-lg shadow-emerald-500/20">
                        <Plus size={18} />
                        Receita
                    </Link>
                    <Link to="/new-expense" className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold transition-colors flex items-center gap-2 text-sm shadow-lg shadow-rose-500/20">
                        <Minus size={18} />
                        Despesa
                    </Link>
                </div>
            </header>

            {/* Month Navigation & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 flex items-center justify-between bg-white dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <button onClick={handlePrevMonth} aria-label="Mês anterior" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <ChevronLeft size={20} className="text-slate-400" />
                    </button>
                    <div className="text-center">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mês Atual</span>
                        <p className="text-lg font-bold text-slate-800 dark:text-white capitalize">
                            {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                    <button onClick={handleNextMonth} aria-label="Próximo mês" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <ChevronRight size={20} className="text-slate-400" />
                    </button>
                </div>

                <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Entradas</p>
                            <p className="text-xl font-display font-bold text-slate-800 dark:text-white">{formatCurrency(summary?.totalIncome || 0)}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    <div className="bg-rose-500/5 border border-rose-500/10 p-4 rounded-2xl flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1">Saídas</p>
                            <p className="text-xl font-display font-bold text-slate-800 dark:text-white">{formatCurrency(summary?.totalExpenses || 0)}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                            <TrendingDown size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar transações..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
                <div className="flex gap-2 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                    {(['all', 'income', 'expense'] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                                selectedType === type
                                    ? "bg-primary text-white shadow-md"
                                    : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                            )}
                        >
                            {type === 'all' ? 'Todas' : type === 'income' ? 'Receitas' : 'Despesas'}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                {isLoading ? (
                    <div className="p-8 text-center space-y-4">
                        <Loader2 className="animate-spin mx-auto text-primary" size={32} />
                        <p className="text-slate-400">Carregando transações...</p>
                    </div>
                ) : filteredTransactions && filteredTransactions.length > 0 ? (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredTransactions.map((t) => (
                            <div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105", getIconStyles(t.type))}>
                                        {t.type === 'expense' ? <ShoppingBag size={20} /> : <ArrowDownRight size={20} />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800 dark:text-white">{t.description}</p>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <span>{new Date(t.date).toLocaleDateString('pt-BR')}</span>
                                            <span>•</span>
                                            <span>{t.categories?.name || "Sem categoria"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className={cn("font-bold font-display whitespace-nowrap", t.type === 'income' ? "text-emerald-500" : "text-rose-500")}>
                                        {t.type === 'expense' ? '- ' : '+ '}{formatCurrency(Number(t.amount))}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(t.id)}
                                        className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                        title="Excluir"
                                        aria-label="Excluir transação"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <FileText size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700 dark:text-white mb-2">Nenhuma transação encontrada</h3>
                        <p className="text-slate-500 max-w-xs mx-auto mb-6">Não encontramos nenhuma transação com os filtros selecionados.</p>
                        <div className="flex justify-center gap-3">
                            <Link to="/new-income" className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-colors text-sm">
                                Adicionar Receita
                            </Link>
                            <Link to="/new-expense" className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold transition-colors text-sm">
                                Adicionar Despesa
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
