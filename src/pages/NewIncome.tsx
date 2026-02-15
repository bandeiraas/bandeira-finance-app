import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Plus, Calendar, ChevronDown, Check, Landmark, PiggyBank, Briefcase, CheckCircle2 } from "lucide-react";

export default function NewIncome() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState("0,00");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Trabalho");
    const [account, setAccount] = useState("Santander");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would typically save data
        navigate("/dashboard");
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
                        />
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Category */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Categoria</label>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-3 pl-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                                >
                                    <option>Trabalho</option>
                                    <option>Presente</option>
                                    <option>Investimento</option>
                                    <option>Outros</option>
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
                                    className="w-full px-4 py-3 pl-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                                />
                                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Account */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Conta de Destino</label>
                        <div className="grid grid-cols-1 gap-2">
                            {/* Santander */}
                            <label className={`relative flex items-center p-3 border rounded-xl cursor-pointer transition-all ${account === 'Santander' ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
                                <input
                                    type="radio"
                                    name="account"
                                    checked={account === 'Santander'}
                                    onChange={() => setAccount('Santander')}
                                    className="peer sr-only"
                                />
                                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white mr-3 shrink-0">
                                    <Landmark size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-800 dark:text-white">Santander</p>
                                    <p className="text-xs text-slate-500">Conta Corrente</p>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${account === 'Santander' ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 dark:border-slate-600'}`}>
                                    <Check size={12} className={`text-white transition-opacity ${account === 'Santander' ? 'opacity-100' : 'opacity-0'}`} />
                                </div>
                            </label>

                            {/* Itaú */}
                            <label className={`relative flex items-center p-3 border rounded-xl cursor-pointer transition-all ${account === 'ITAU' ? 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50' : ''} ${account === 'ITAU' ? '!border-emerald-500 !bg-emerald-50/50 dark:!bg-emerald-900/10' : ''}`}>
                                <input
                                    type="radio"
                                    name="account"
                                    checked={account === 'ITAU'}
                                    onChange={() => setAccount('ITAU')}
                                    className="peer sr-only"
                                />
                                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white mr-3 shrink-0">
                                    <PiggyBank size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-800 dark:text-white">Itaú</p>
                                    <p className="text-xs text-slate-500">Reserva</p>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${account === 'ITAU' ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 dark:border-slate-600'}`}>
                                    <Check size={12} className={`text-white transition-opacity ${account === 'ITAU' ? 'opacity-100' : 'opacity-0'}`} />
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-display font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                    >
                        <CheckCircle2 size={24} />
                        Adicionar Receita
                    </button>
                </form>
            </div>
        </div>
    );
}
