import {
    ListFilter,
    ArrowUpDown,
    LineChart,
    CheckCircle,
    CreditCard,
    ChevronDown,
    LayoutDashboard,
    ShoppingBag,
    Smartphone,
    ShoppingCart,
    TrendingUp
} from "lucide-react";


export default function Invoices() {
    return (
        <div className="space-y-6 h-full flex flex-col">
            <header className="flex items-center justify-between mb-8 shrink-0">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">Faturas</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Controle seus gastos e analise tendências mensais</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 glass-card py-1 px-1 pr-4 rounded-full">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                        <span className="text-sm font-medium hidden md:block text-slate-800 dark:text-white">Alex Silva</span>
                    </div>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden flex-1">
                {/* Left Column: History Sidebar */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4 overflow-hidden h-full">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Histórico de Gestão</h3>
                        <div className="flex gap-2">
                            <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <ListFilter size={18} />
                            </button>
                            <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <ArrowUpDown size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3 pb-20">
                        {/* Current Open Invoice */}
                        <div className="glassmorphism p-4 rounded-2xl border-l-4 border-l-sky-500 cursor-pointer relative bg-white/60 dark:bg-slate-800/60 shadow-lg">
                            <div className="absolute top-4 right-4 text-[10px] font-bold text-accent-blue bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full uppercase tracking-wide">Aberta</div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Referência 15 FEV</span>
                                <span className="text-xl font-bold text-slate-800 dark:text-white">R$ 5.820,50</span>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-sm text-slate-500">Todos os Cartões (2)</span>
                                <LineChart size={18} className="text-accent-blue" />
                            </div>
                        </div>

                        {/* Pending Invoice */}
                        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-red-500 cursor-pointer relative opacity-90 hover:opacity-100">
                            <div className="absolute top-4 right-4 text-[10px] font-bold text-red-500 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full uppercase tracking-wide">Pendente</div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Referência 15 JAN</span>
                                <span className="text-lg font-bold text-slate-800 dark:text-white">R$ 3.120,00</span>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-sm text-slate-500">Todos os Cartões (2)</span>
                            </div>
                        </div>

                        {/* Conciliated Invoice */}
                        <div className="glass-card p-4 rounded-2xl border-l-4 border-l-emerald-500 cursor-pointer relative opacity-70 hover:opacity-100">
                            <div className="absolute top-4 right-4 text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full uppercase tracking-wide">Conciliado</div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Referência 15 DEZ</span>
                                <span className="text-lg font-bold text-slate-600 dark:text-slate-300">R$ 7.450,10</span>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-sm text-slate-500">Todos os Cartões (2)</span>
                                <CheckCircle size={18} className="text-emerald-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="w-full lg:w-2/3 glassmorphism rounded-3xl p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto hide-scrollbar h-full">
                    {/* Header Details */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-700/50 pb-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Análise de Fevereiro</h2>
                                <div className="relative group">
                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                                        <CreditCard size={18} />
                                        <span>Todos os Cartões</span>
                                        <ChevronDown size={18} />
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-10">
                                        <a className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-700/50 text-accent-blue font-semibold text-sm border-b border-slate-100 dark:border-slate-700" href="#">
                                            <LayoutDashboard size={18} />
                                            Todos os Cartões
                                        </a>
                                        <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm" href="#">
                                            <CreditCard size={18} />
                                            Mastercard •••• 3796
                                        </a>
                                        <a className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm" href="#">
                                            <CreditCard size={18} />
                                            Visa •••• 1245
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Período Aberto</span>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Consolidado de 08 Jan até 08 Fev</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Acumulado Mensal</span>
                            <span className="text-3xl font-display font-bold text-slate-800 dark:text-white">R$ 5.820,50</span>
                        </div>
                    </div>

                    {/* Chart & Top Transactions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Chart Widget */}
                        <div className="glass-card p-5 rounded-2xl flex flex-col">
                            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Composição de Gastos (Global)</h3>
                            <div className="flex items-center justify-center flex-1 min-h-[180px]">
                                <div className="relative w-40 h-40 rounded-full" style={{ background: 'conic-gradient(#0ea5e9 0% 40%, #6366f1 40% 65%, #10b981 65% 85%, #f59e0b 85% 100%)' }}>
                                    <div className="absolute inset-0 m-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center shadow-inner">
                                        <div className="text-center">
                                            <span className="block text-xs text-slate-400">Total</span>
                                            <span className="block text-sm font-bold text-slate-700 dark:text-slate-200">100%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#0ea5e9]"></div><span className="text-slate-600 dark:text-slate-300">Serviços (40%)</span></div>
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#6366f1]"></div><span className="text-slate-600 dark:text-slate-300">Eletrônicos (25%)</span></div>
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#10b981]"></div><span className="text-slate-600 dark:text-slate-300">Alimentação (20%)</span></div>
                                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#f59e0b]"></div><span className="text-slate-600 dark:text-slate-300">Outros (15%)</span></div>
                            </div>
                        </div>

                        {/* Top Transactions List */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">Top Transações Consolidadas</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between p-3 glass-card rounded-xl border border-slate-100 dark:border-slate-700/30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                            <ShoppingBag size={14} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-slate-800 dark:text-white">Loja de Roupas</div>
                                            <div className="text-[10px] text-slate-500">Visa •••• 1245</div>
                                        </div>
                                    </div>
                                    <span className="font-bold text-sm text-slate-800 dark:text-white">R$ 1.850,00</span>
                                </div>

                                <div className="flex items-center justify-between p-3 glass-card rounded-xl border border-slate-100 dark:border-slate-700/30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                            <Smartphone size={14} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-slate-800 dark:text-white">Apple Store</div>
                                            <div className="text-[10px] text-slate-500">Mastercard •••• 3796</div>
                                        </div>
                                    </div>
                                    <span className="font-bold text-sm text-slate-800 dark:text-white">R$ 1.200,00</span>
                                </div>

                                <div className="flex items-center justify-between p-3 glass-card rounded-xl border border-slate-100 dark:border-slate-700/30">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                            <ShoppingCart size={14} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-slate-800 dark:text-white">Supermercado</div>
                                            <div className="text-[10px] text-slate-500">Mastercard •••• 3796</div>
                                        </div>
                                    </div>
                                    <span className="font-bold text-sm text-slate-800 dark:text-white">R$ 450,15</span>
                                </div>
                                <button className="w-full text-center text-xs font-bold text-accent-blue py-1 hover:underline">EXPLORAR DETALHES</button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom KPIs */}
                    <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700/50 flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-3">
                                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Comparativo Mensal de Gastos</h3>
                                <div className="glass-card p-4 rounded-2xl flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-accent-blue">
                                        <TrendingUp size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="text-xs text-slate-500 font-medium">vs. Média Anterior (Consolidado)</span>
                                            <span className="text-sm font-bold text-red-500">+8.2%</span>
                                        </div>
                                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-accent-blue h-full w-[82%]"></div>
                                        </div>
                                        <p className="text-[10px] text-slate-500 mt-2 italic">Gasto total superou a média histórica em R$ 440,00.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status do Pagamento</h3>
                                <div className="grid grid-cols-3 gap-2 h-full">
                                    <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-xl border border-blue-100 dark:border-blue-800/30 flex flex-col justify-center items-center text-center">
                                        <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 mb-1">Limite Total</span>
                                        <span className="text-sm font-bold text-slate-800 dark:text-white">R$ 25k</span>
                                    </div>
                                    <div className="bg-emerald-50 dark:bg-emerald-900/10 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800/30 flex flex-col justify-center items-center text-center">
                                        <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 mb-1">Disp. Global</span>
                                        <span className="text-sm font-bold text-slate-800 dark:text-white">R$ 19.2k</span>
                                    </div>
                                    <div className="bg-amber-50 dark:bg-amber-900/10 p-3 rounded-xl border border-amber-100 dark:border-amber-800/30 flex flex-col justify-center items-center text-center">
                                        <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 mb-1">Prox. Venc.</span>
                                        <span className="text-sm font-bold text-slate-800 dark:text-white">7 Dias</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800 dark:bg-slate-100 p-4 rounded-xl flex items-center justify-between text-white dark:text-slate-900">
                            <div className="flex items-center gap-3">
                                <LineChart size={20} className="text-accent-blue" />
                                <span className="text-sm font-medium">Análise consolidada: Seu gasto em lazer aumentou 15% neste mês somando ambos os cartões.</span>
                            </div>
                            <button className="text-xs font-bold uppercase tracking-widest text-accent-blue hover:text-white dark:hover:text-black transition-colors">Ver Insights</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
