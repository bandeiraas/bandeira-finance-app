import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Calendar, ChevronDown, Check, Landmark, Minus, Tag, Repeat, Loader2, AlertCircle } from "lucide-react";
import { useCreateExpense } from "../features/transactions/hooks/useTransactions";
import { useCategories } from "../features/transactions/hooks/useCategories";
import { useAccounts } from "../features/accounts/hooks/useAccounts";
import { parseBRL } from "../shared/utils/parseBRL";
import { formatCurrency } from "../shared/utils/formatCurrency";

export default function NewExpense() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState("0,00");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [accountId, setAccountId] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState<string | null>(null);

    const { data: categories, isLoading: loadingCategories } = useCategories('expense');
    const { data: accounts, isLoading: loadingAccounts } = useAccounts();
    const createExpense = useCreateExpense();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const numericAmount = parseBRL(amount);
        if (numericAmount <= 0) {
            setError("Informe um valor válido.");
            return;
        }
        if (!accountId) {
            setError("Selecione uma forma de pagamento.");
            return;
        }

        try {
            await createExpense.mutateAsync({
                amount: numericAmount,
                description,
                categoryId: categoryId || (categories?.[0]?.id ?? ''),
                accountId,
                date,
            });
            navigate("/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao adicionar despesa.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300">
            {/* Modal Card */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-white/50 dark:border-slate-700/50 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
                            <Minus size={24} />
                        </div>
                        <h2 className="text-xl font-display font-bold text-slate-800 dark:text-white">Adicionar Despesa</h2>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto hide-scrollbar">
                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    {/* Amount - Centered Huge */}
                    <div className="space-y-2 text-center">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Valor da Despesa</label>
                        <div className="relative inline-block">
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-rose-500 font-bold text-2xl">R$</span>
                            <input
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-transparent border-none text-center text-5xl font-display font-bold text-rose-500 focus:ring-0 p-0 placeholder-rose-300"
                                placeholder="0,00"
                                disabled={createExpense.isPending}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Descrição</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-700 dark:text-white placeholder-slate-400 focus:border-rose-500 focus:ring-rose-500 transition-all"
                            placeholder="Ex: Aluguel, Supermercado..."
                            disabled={createExpense.isPending}
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Categoria</label>
                        <div className="relative">
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                disabled={loadingCategories || createExpense.isPending}
                                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pl-10 text-slate-700 dark:text-white focus:border-rose-500 focus:ring-rose-500 appearance-none transition-all cursor-pointer disabled:opacity-50"
                            >
                                {loadingCategories ? (
                                    <option>Carregando...</option>
                                ) : (
                                    categories?.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))
                                )}
                            </select>
                            <Tag size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Grid: Date & Frequency */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Data</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    disabled={createExpense.isPending}
                                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pl-10 text-xs text-slate-700 dark:text-white focus:border-rose-500 focus:ring-rose-500 transition-all cursor-pointer"
                                />
                                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Frequência</label>
                            <div className="relative">
                                <select
                                    disabled={createExpense.isPending}
                                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pl-10 text-xs text-slate-700 dark:text-white focus:border-rose-500 focus:ring-rose-500 appearance-none transition-all cursor-pointer"
                                >
                                    <option>Única</option>
                                    <option>Mensal</option>
                                    <option>Anual</option>
                                </select>
                                <Repeat size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Payment Method - Dynamic Accounts */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Forma de Pagamento</label>
                        {loadingAccounts ? (
                            <div className="flex items-center gap-2 p-4 text-slate-400 text-sm">
                                <Loader2 size={16} className="animate-spin" /> Carregando contas...
                            </div>
                        ) : accounts && accounts.length > 0 ? (
                            <div className="grid grid-cols-2 gap-3">
                                {accounts.map((acc) => (
                                    <label key={acc.id} className="cursor-pointer relative group">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            checked={accountId === acc.id}
                                            onChange={() => setAccountId(acc.id)}
                                            className="peer sr-only"
                                            disabled={createExpense.isPending}
                                        />
                                        <div className={`p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 transition-all flex items-center gap-3 ${accountId === acc.id ? '!border-rose-500 !bg-rose-50 dark:!bg-rose-900/20' : ''}`}>
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm shrink-0"
                                                style={{ backgroundColor: acc.color || '#64748b' }}
                                            >
                                                <Landmark size={14} />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-[11px] font-bold text-slate-700 dark:text-white truncate">{acc.bank_name}</p>
                                                <p className="text-[9px] text-slate-400 truncate">Saldo: {formatCurrency(Number(acc.balance))}</p>
                                            </div>
                                        </div>
                                        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 transition-opacity ${accountId === acc.id ? 'opacity-100' : 'opacity-0'}`}></div>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400 p-4 text-center">Nenhuma conta cadastrada. <a href="/accounts/add" className="text-rose-500 hover:underline">Adicionar conta</a></p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                        <button
                            type="submit"
                            disabled={createExpense.isPending}
                            className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold shadow-lg shadow-rose-500/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {createExpense.isPending ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <Check size={20} />
                                    Adicionar Despesa
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
