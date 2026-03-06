import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Plus, Calendar, ChevronDown, Check, Landmark, Briefcase, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useCreateIncome } from "@features/transactions/hooks/useTransactions";
import { useCategories } from "@features/transactions/hooks/useCategories";
import { useAccounts } from "@features/accounts/hooks/useAccounts";
import { parseBRL } from "@shared/utils/parseBRL";
import { cn } from "@lib/utils";

export default function NewIncome() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState("0,00");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [accountId, setAccountId] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState<string | null>(null);

    const { data: categories, isLoading: loadingCategories } = useCategories('income');
    const { data: accounts, isLoading: loadingAccounts } = useAccounts();
    const createIncome = useCreateIncome();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const numericAmount = parseBRL(amount);
        if (numericAmount <= 0) {
            setError("Informe um valor válido.");
            return;
        }
        if (!accountId) {
            setError("Selecione uma conta de destino.");
            return;
        }

        try {
            await createIncome.mutateAsync({
                amount: numericAmount,
                description,
                categoryId: categoryId || (categories?.[0]?.id ?? ''),
                accountId,
                date,
            });
            navigate("/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao adicionar receita.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300">
            {/* Modal Card */}
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700 overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <Plus size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-display font-bold text-slate-800 dark:text-white">Adicionar Receita</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Nova entrada financeira</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto hide-scrollbar">
                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    {/* Amount */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Valor da Receita</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-lg">R$</span>
                            <input
                                type="text"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-3xl font-display font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder-slate-300"
                                placeholder="0,00"
                                disabled={createIncome.isPending}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Descrição</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            placeholder="Ex: Salário, Freelance, Reembolso"
                            disabled={createIncome.isPending}
                        />
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Category */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Categoria</label>
                            <div className="relative">
                                <select
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    disabled={loadingCategories || createIncome.isPending}
                                    className="w-full px-4 py-3 pl-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer disabled:opacity-50"
                                >
                                    {loadingCategories ? (
                                        <option>Carregando...</option>
                                    ) : (
                                        categories?.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))
                                    )}
                                </select>
                                <Briefcase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Data do Recebimento</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    disabled={createIncome.isPending}
                                    className="w-full px-4 py-3 pl-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                                />
                                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Account */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Conta de Destino</label>
                        {loadingAccounts ? (
                            <div className="flex items-center gap-2 p-4 text-slate-400 text-sm">
                                <Loader2 size={16} className="animate-spin" /> Carregando contas...
                            </div>
                        ) : accounts && accounts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-2">
                                {accounts.map((acc) => (
                                    <label
                                        key={acc.id}
                                        className={cn(
                                            "relative flex items-center p-3 border rounded-xl cursor-pointer transition-all",
                                            accountId === acc.id
                                                ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10"
                                                : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name="account"
                                            checked={accountId === acc.id}
                                            onChange={() => setAccountId(acc.id)}
                                            className="peer sr-only"
                                            disabled={createIncome.isPending}
                                        />
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white mr-3 shrink-0"
                                            style={{ backgroundColor: acc.color || '#64748b' }}
                                        >
                                            <Landmark size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-slate-800 dark:text-white">{acc.bank_name}</p>
                                            <p className="text-xs text-slate-500">{acc.account_type}</p>
                                        </div>
                                        <div className={cn(
                                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                            accountId === acc.id ? "border-emerald-500 bg-emerald-500" : "border-slate-300 dark:border-slate-600"
                                        )}>
                                            <Check size={12} className={cn("text-white transition-opacity", accountId === acc.id ? "opacity-100" : "opacity-0")} />
                                        </div>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400 p-4 text-center">Nenhuma conta cadastrada. <a href="/accounts/add" className="text-emerald-500 hover:underline">Adicionar conta</a></p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={createIncome.isPending}
                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-display font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {createIncome.isPending ? (
                            <>
                                <Loader2 size={24} className="animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 size={24} />
                                Adicionar Receita
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
