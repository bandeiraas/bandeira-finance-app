import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Calendar, ChevronDown, Check, Landmark, PiggyBank, CreditCard, Minus, Tag, Repeat } from "lucide-react";

export default function NewExpense() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState("0,00");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Alimentação");
    const [paymentMethod, setPaymentMethod] = useState("Santander");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would typically save data
        navigate("/dashboard");
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
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Categoria</label>
                        <div className="relative">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pl-10 text-slate-700 dark:text-white focus:border-rose-500 focus:ring-rose-500 appearance-none transition-all cursor-pointer"
                            >
                                <option>Alimentação</option>
                                <option>Saúde</option>
                                <option>Lazer</option>
                                <option>Transporte</option>
                                <option>Moradia</option>
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
                                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pl-10 text-xs text-slate-700 dark:text-white focus:border-rose-500 focus:ring-rose-500 transition-all cursor-pointer"
                                />
                                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Frequência</label>
                            <div className="relative">
                                <select
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

                    {/* Payment Method - Cards */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Forma de Pagamento</label>
                        <div className="grid grid-cols-2 gap-3">
                            {/* Santander */}
                            <label className="cursor-pointer relative group">
                                <input
                                    type="radio"
                                    name="payment_method"
                                    checked={paymentMethod === 'Santander'}
                                    onChange={() => setPaymentMethod('Santander')}
                                    className="peer sr-only"
                                />
                                <div className={`p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 transition-all flex items-center gap-3 ${paymentMethod === 'Santander' ? '!border-rose-500 !bg-rose-50 dark:!bg-rose-900/20' : ''}`}>
                                    <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-sm shrink-0">
                                        <Landmark size={14} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[11px] font-bold text-slate-700 dark:text-white truncate">Santander</p>
                                        <p className="text-[9px] text-slate-400 truncate">Saldo: R$ 12k</p>
                                    </div>
                                </div>
                                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 transition-opacity ${paymentMethod === 'Santander' ? 'opacity-100' : 'opacity-0'}`}></div>
                            </label>

                            {/* Itaú */}
                            <label className="cursor-pointer relative group">
                                <input
                                    type="radio"
                                    name="payment_method"
                                    checked={paymentMethod === 'Itaú'}
                                    onChange={() => setPaymentMethod('Itaú')}
                                    className="peer sr-only"
                                />
                                <div className={`p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 transition-all flex items-center gap-3 ${paymentMethod === 'Itaú' ? '!border-rose-500 !bg-rose-50 dark:!bg-rose-900/20' : ''}`}>
                                    <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-sm shrink-0">
                                        <PiggyBank size={14} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[11px] font-bold text-slate-700 dark:text-white truncate">Itaú</p>
                                        <p className="text-[9px] text-slate-400 truncate">Saldo: R$ 2.9k</p>
                                    </div>
                                </div>
                                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 transition-opacity ${paymentMethod === 'Itaú' ? 'opacity-100' : 'opacity-0'}`}></div>
                            </label>

                            {/* Fintrack Black */}
                            <label className="cursor-pointer relative group">
                                <input
                                    type="radio"
                                    name="payment_method"
                                    checked={paymentMethod === 'Fintrack'}
                                    onChange={() => setPaymentMethod('Fintrack')}
                                    className="peer sr-only"
                                />
                                <div className={`p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 transition-all flex items-center gap-3 ${paymentMethod === 'Fintrack' ? '!border-rose-500 !bg-rose-50 dark:!bg-rose-900/20' : ''}`}>
                                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-sm shrink-0">
                                        <CreditCard size={14} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[11px] font-bold text-slate-700 dark:text-white truncate">Fintrack Black</p>
                                        <p className="text-[9px] text-rose-400 font-semibold truncate">Crédito</p>
                                    </div>
                                </div>
                                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 transition-opacity ${paymentMethod === 'Fintrack' ? 'opacity-100' : 'opacity-0'}`}></div>
                            </label>

                            {/* Nubank */}
                            <label className="cursor-pointer relative group">
                                <input
                                    type="radio"
                                    name="payment_method"
                                    checked={paymentMethod === 'Nubank'}
                                    onChange={() => setPaymentMethod('Nubank')}
                                    className="peer sr-only"
                                />
                                <div className={`p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 transition-all flex items-center gap-3 ${paymentMethod === 'Nubank' ? '!border-rose-500 !bg-rose-50 dark:!bg-rose-900/20' : ''}`}>
                                    <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white shadow-sm shrink-0">
                                        <CreditCard size={14} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[11px] font-bold text-slate-700 dark:text-white truncate">Nubank</p>
                                        <p className="text-[9px] text-rose-400 font-semibold truncate">Crédito</p>
                                    </div>
                                </div>
                                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 transition-opacity ${paymentMethod === 'Nubank' ? 'opacity-100' : 'opacity-0'}`}></div>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                        <button
                            type="submit"
                            className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold shadow-lg shadow-rose-500/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <Check size={20} />
                            Adicionar Despesa
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
