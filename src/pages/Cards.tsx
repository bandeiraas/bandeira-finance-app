import { Plus, Copy, ShoppingBag, Utensils, ChevronRight, Receipt, CreditCard, Shield } from "lucide-react";

export default function Cards() {
    return (
        <div className="flex flex-col lg:flex-row gap-8 h-full">
            {/* Left Column: Cards Stack & Status */}
            <div className="w-full lg:w-80 flex flex-col gap-6">

                {/* Section Header */}
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">Seus Cartões</h3>

                {/* Card Stack */}
                <div className="relative flex flex-col items-center">
                    <div className="w-full flex flex-col -space-y-40 lg:-space-y-44">
                        {/* Card 1: Black Edition */}
                        <button className="group relative w-full aspect-[1.58/1] rounded-2xl overflow-hidden shadow-2xl z-50 transition-all border-2 border-primary hover:scale-[1.02] duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#333] to-[#000]"></div>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>

                            <div className="relative z-10 h-full flex flex-col justify-between p-5 text-left text-white">
                                <div className="flex justify-between items-start">
                                    <span className="text-[9px] font-bold bg-white/20 px-2 py-0.5 rounded-full border border-white/20 backdrop-blur-sm">BLACK EDITION</span>
                                    <div className="flex -space-x-1.5 opacity-80">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-[10px] text-white/50 font-mono mb-0.5 tracking-widest">•••• 3796</div>
                                        <div className="text-[11px] text-white/80 font-semibold uppercase tracking-wider">Alex Silva</div>
                                    </div>
                                    <div className="flex -space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-[#EB001B]/90"></div>
                                        <div className="w-6 h-6 rounded-full bg-[#F79E1B]/90"></div>
                                    </div>
                                </div>
                            </div>
                        </button>

                        {/* Card 2: Nubank (Background) */}
                        <button className="group relative w-full aspect-[1.58/1] rounded-2xl overflow-hidden shadow-xl z-40 transition-all scale-[0.94] opacity-80 hover:scale-[0.96] hover:opacity-100 hover:z-60 duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#820ad1] to-[#5a0792]"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between p-5 text-left text-white">
                                <div className="flex justify-between items-start">
                                    <div className="font-bold italic tracking-tighter text-sm uppercase">Nubank</div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="text-[10px] text-white/60 font-mono tracking-widest">•••• 4122</div>
                                    <div className="flex -space-x-2">
                                        <div className="w-6 h-6 rounded-full bg-[#EB001B]/90"></div>
                                        <div className="w-6 h-6 rounded-full bg-[#F79E1B]/90"></div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Financial Status Widget */}
                <div className="w-full mt-2 glassmorphism bg-white/30 dark:bg-slate-800/40 p-5 rounded-2xl shadow-lg border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Status Financeiro</h3>
                        <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                            <CreditCard size={14} />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="text-[9px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">Saldo Disponível</p>
                            <p className="text-2xl font-bold text-slate-800 dark:text-white">R$ 15.420,50</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <p className="text-[9px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Gasto do Mês</p>
                                <p className="text-xs font-bold text-slate-800 dark:text-white">R$ 5.731,30</p>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[37%] rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
                            </div>
                            <div className="flex justify-between text-[9px]">
                                <span className="text-slate-400">Limite R$ 20k</span>
                                <span className="font-bold text-primary">37%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* New Card Button */}
                <button className="w-full py-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                    <Plus size={18} />
                    <span className="text-xs font-semibold uppercase tracking-wide">Novo Cartão</span>
                </button>
            </div>

            {/* Right Column: Details & Actions */}
            <div className="flex-1 glassmorphism bg-white/20 dark:bg-slate-900/40 rounded-3xl p-6 lg:p-8 flex flex-col gap-8 shadow-2xl border border-white/10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full text-[10px] font-bold tracking-widest mb-3 shadow-lg">
                            CARTÃO PRINCIPAL
                        </div>
                        <h2 className="text-3xl font-display font-bold text-slate-800 dark:text-white">Crédito e débito físico</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">Gerenciamento completo do Mastercard Black final 3796</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="glass-card flex items-center justify-between px-4 py-2 rounded-xl w-full md:w-64 border border-white/10 bg-slate-800/50">
                            <span className="font-mono text-lg font-medium text-white tracking-wider">•••• 3796</span>
                            <button className="p-2 text-primary hover:bg-primary/20 rounded-lg transition-colors">
                                <Copy size={16} />
                            </button>
                        </div>
                        <button className="text-[10px] font-bold text-primary uppercase tracking-widest text-right px-1 hover:underline">Ver dados completos</button>
                    </div>
                </div>

                {/* Transactions List */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Últimas Transações</h3>
                        <button className="text-[10px] font-bold text-primary hover:underline uppercase tracking-wider">VER TUDO</button>
                    </div>
                    <div className="bg-white/5 dark:bg-slate-800/40 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
                        <div className="flex flex-col">
                            {/* Transaction 1 */}
                            <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-600 dark:text-slate-400 shadow-sm">
                                        <ShoppingBag size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-800 dark:text-white leading-tight">Apple Store</div>
                                        <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-1">Eletrônicos • Hoje, 14:30</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-slate-800 dark:text-white">- R$ 4.999,00</div>
                                    <div className="text-[9px] text-emerald-500 font-bold uppercase tracking-wider mt-0.5">Confirmada</div>
                                </div>
                            </div>
                            {/* Transaction 2 */}
                            <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-600 dark:text-slate-400 shadow-sm">
                                        <Utensils size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-800 dark:text-white leading-tight">Restaurante Fasano</div>
                                        <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-1">Alimentação • Ontem, 20:15</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-slate-800 dark:text-white">- R$ 452,30</div>
                                    <div className="text-[9px] text-emerald-500 font-bold uppercase tracking-wider mt-0.5">Confirmada</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col gap-4 mt-auto">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">Ações Rápidas</h3>
                    <button className="w-full p-6 rounded-2xl flex items-center gap-6 text-left group transition-all duration-300 border border-primary/30 bg-white/5 hover:bg-slate-800/60 shadow-lg hover:shadow-primary/10">
                        <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                            <Receipt size={28} />
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-primary transition-colors">Faturas</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Consultar histórico e pagamentos</div>
                        </div>
                        <ChevronRight size={24} className="text-slate-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </button>
                </div>

                {/* Protection Widget */}
                <div className="mt-4 bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl flex items-start gap-3">
                    <Shield className="text-emerald-500 mt-0.5" size={16} />
                    <div>
                        <h4 className="font-bold text-emerald-500 text-xs uppercase tracking-wider">Proteção ativa</h4>
                        <p className="text-[10px] text-emerald-500/80 mt-1 leading-relaxed">Este cartão possui tecnologia de proteção contra fraudes em tempo real ativada.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
