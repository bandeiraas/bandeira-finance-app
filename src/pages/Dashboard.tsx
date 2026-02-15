import { ArrowDownRight, TrendingUp, TrendingDown, ShoppingBag, Plus, Minus, FileText, Lightbulb, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import UserMenu from "../components/UserMenu";

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Resumo Financeiro</h1>
                    <p className="text-slate-400 text-sm">Sua história financeira de Setembro</p>
                </div>
                <div className="flex items-center gap-3">
                    <UserMenu />
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Chart Section */}
                <div className="lg:col-span-8 flex flex-col gap-5">
                    <div className="glassmorphism bg-slate-900/50 p-8 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/5 blur-3xl rounded-full"></div>

                        <div className="flex flex-col md:flex-row items-center gap-10">
                            {/* SVG Chart */}
                            <div className="relative w-64 h-64 shrink-0">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle className="text-slate-800" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeWidth="8"></circle>
                                    {/* Detailed segments would require complex calculation, using simplified representation */}
                                    <circle className="transition-all duration-1000 origin-center" cx="50" cy="50" fill="transparent" r="45" stroke="#f59e0b" strokeDasharray="283" strokeDashoffset="180" strokeLinecap="round" strokeWidth="9"></circle>
                                    <circle className="transition-all duration-1000 origin-center" cx="50" cy="50" fill="transparent" r="45" stroke="#0ea5e9" strokeDasharray="283" strokeDashoffset="240" strokeLinecap="round" strokeWidth="9"></circle>
                                    <circle className="transition-all duration-1000 origin-center" cx="50" cy="50" fill="transparent" r="45" stroke="#8b5cf6" strokeDasharray="283" strokeDashoffset="260" strokeLinecap="round" strokeWidth="9"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Gasto</span>
                                    <span className="text-2xl font-display font-bold text-white">R$ 5.731</span>
                                    <span className="text-[10px] font-medium text-emerald-500">+4% vs. mês ant.</span>
                                </div>
                            </div>

                            {/* Stats & Categories */}
                            <div className="flex-1 w-full space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <TrendingUp className="text-emerald-500" size={18} />
                                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Receitas</span>
                                        </div>
                                        <p className="text-xl font-display font-bold text-white">R$ 12.450,00</p>
                                    </div>
                                    <div className="p-4 bg-danger/10 rounded-2xl border border-danger/20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <TrendingDown className="text-danger" size={18} />
                                            <span className="text-[10px] font-bold text-danger uppercase tracking-wider">Despesas</span>
                                        </div>
                                        <p className="text-xl font-display font-bold text-white">R$ 5.731,30</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Maiores Gastos por Categoria</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-warning"></div>
                                                <span className="text-sm font-medium text-slate-300">Alimentação</span>
                                            </div>
                                            <span className="text-sm font-bold text-white">R$ 2.400,00</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="bg-warning h-full w-[42%]"></div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                                <span className="text-sm font-medium text-slate-300">Transporte</span>
                                            </div>
                                            <span className="text-sm font-bold text-white">R$ 1.250,00</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="bg-primary h-full w-[22%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Balances */}
                    <div>
                        <div className="flex items-center justify-between mb-4 px-2">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Saldo de Contas</h3>
                            <button className="text-[10px] font-bold text-primary uppercase hover:underline">Ver Detalhes</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            <div className="glass-card p-5 rounded-2xl group hover:border-danger/50 cursor-pointer">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-500/20 font-bold text-white">S</div>
                                    <span className="text-[9px] font-bold px-2 py-0.5 bg-primary/10 text-primary rounded-full">PRINCIPAL</span>
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Santander</p>
                                <p className="text-xl font-bold text-white mt-0.5">R$ 12.450,00</p>
                                <p className="text-[10px] text-slate-400 mt-1">Conta Corrente</p>
                            </div>

                            <div className="glass-card p-5 rounded-2xl group hover:border-warning/50 cursor-pointer">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 font-bold text-white">I</div>
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Itaú</p>
                                <p className="text-xl font-bold text-white mt-0.5">R$ 2.970,50</p>
                                <p className="text-[10px] text-slate-400 mt-1">Reserva Emergência</p>
                            </div>

                            <div className="glass-card p-5 rounded-2xl group hover:border-purple-500/50 cursor-pointer">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 font-bold text-white">N</div>
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Nubank</p>
                                <p className="text-xl font-bold text-white mt-0.5">R$ 4.210,00</p>
                                <p className="text-[10px] text-slate-400 mt-1">Investimentos</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Transactions List */}
                    <div className="glassmorphism bg-slate-900/40 p-5 rounded-3xl">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Últimas Transações</h3>
                            <button className="text-[10px] font-bold text-slate-500 uppercase hover:text-primary transition-colors">Ver Tudo</button>
                        </div>
                        <div className="space-y-1">
                            {[
                                { name: "Supermercado Pão de Açúcar", date: "Hoje, 14:20", amount: "- R$ 342,50", type: "expense", color: "rose", bg: "bg-rose-500/10", text: "text-rose-500" },
                                { name: "Transferência Recebida", date: "Ontem, 09:15", amount: "+ R$ 1.200,00", type: "income", color: "emerald", bg: "bg-emerald-500/10", text: "text-emerald-500" },
                                { name: "Uber Trip", date: "15 Set, 18:45", amount: "- R$ 24,90", type: "expense", color: "amber", bg: "bg-amber-500/10", text: "text-amber-500" }
                            ].map((t, i) => (
                                <div key={i} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/40 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", t.bg, t.text)}>
                                            {t.type === 'expense' ? <ShoppingBag size={18} /> : <ArrowDownRight size={18} />}
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-200">{t.name}</p>
                                            <p className="text-[10px] text-slate-400">{t.date}</p>
                                        </div>
                                    </div>
                                    <span className={cn("text-xs font-bold", t.name.includes("Recebida") ? "text-emerald-500" : "text-danger")}>{t.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* My Cards Widget */}
                    <div className="glass-card p-6 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            <CreditCard size={40} className="text-slate-200 mask-image-b" />
                        </div>
                        <div className="flex justify-between items-center mb-4 relative z-10">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Meus Cartões</h3>
                            <button className="text-primary hover:bg-primary/10 p-1 rounded-lg transition-colors">
                                <Plus size={16} />
                            </button>
                        </div>

                        <div className="relative aspect-[1.586/1] rounded-2xl p-5 text-white shadow-xl bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden mb-4 group-hover:scale-[1.02] transition-transform duration-500">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <span className="text-[9px] font-bold bg-white/20 px-2 py-0.5 rounded-full border border-white/20 backdrop-blur-sm">BLACK EDITION</span>
                                    {/* Mastercard Logo Placeholder */}
                                    <div className="flex -space-x-1.5 opacity-80">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-white/50 font-mono mb-0.5 tracking-widest">•••• 3796</div>
                                    <div className="flex justify-between items-end">
                                        <div className="text-[11px] text-white/80 font-semibold uppercase tracking-wider">Alex Silva</div>
                                        <div className="text-[9px] text-white/50 uppercase tracking-widest">12/29</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Fatura Aberta</span>
                            </div>
                            <span className="text-sm font-bold text-slate-800 dark:text-white">R$ 4.210,50</span>
                        </div>
                        <div className="w-full h-1 bg-slate-100 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[35%]"></div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">Ações Rápidas</h3>
                        <div className="grid grid-cols-3 gap-2">
                            <Link to="/new-income" className="flex flex-col items-center justify-center gap-1.5 p-3 glass-card rounded-2xl group w-full hover:scale-105 transition-transform active:scale-95">
                                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                                    <Plus size={20} />
                                </div>
                                <span className="text-[9px] font-bold text-slate-300 text-center leading-tight">Receita</span>
                            </Link>
                            <Link to="/new-expense" className="flex flex-col items-center justify-center gap-1.5 p-3 glass-card rounded-2xl group w-full hover:scale-105 transition-transform active:scale-95">
                                <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-sm">
                                    <Minus size={20} />
                                </div>
                                <span className="text-[9px] font-bold text-slate-300 text-center leading-tight">Despesa</span>
                            </Link>
                            <Link to="/invoices" className="flex flex-col items-center justify-center gap-1.5 p-3 glass-card rounded-2xl group w-full hover:scale-105 transition-transform active:scale-95">
                                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm">
                                    <FileText size={20} />
                                </div>
                                <span className="text-[9px] font-bold text-slate-300 text-center leading-tight">Faturas</span>
                            </Link>
                        </div>
                    </div>

                    {/* Financial Tip */}
                    <div className="mt-auto glass-card border-none bg-gradient-to-br from-indigo-500/10 to-primary/5 p-6 rounded-3xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                                <Lightbulb size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm">Dica Financeira</h4>
                                <p className="text-[10px] text-slate-400">Personalizado para você</p>
                            </div>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            Você economizou 12% a mais em <b>Alimentação</b> esta semana. Continue assim para bater sua meta mensal!
                        </p>
                        <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center">
                            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Meta de Economia</span>
                            <span className="text-sm font-bold text-white">82%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-indigo-500 w-[82%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
