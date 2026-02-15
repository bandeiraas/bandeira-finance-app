import { Plus, Minus, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

export default function Transactions() {
    // Mock data for the chart - Updated with explicit classes and rounded-t-2xl for better visual
    const chartData = [
        { day: "Seg", value: 120, height: "40%", className: "bg-indigo-100 dark:bg-indigo-900/20" },
        { day: "Ter", value: 350, height: "65%", className: "bg-indigo-100 dark:bg-indigo-900/20" },
        { day: "Qua", value: 80, height: "30%", className: "bg-indigo-100 dark:bg-indigo-900/20" },
        { day: "Qui", value: 640, height: "85%", className: "bg-indigo-500 dark:bg-indigo-500/80 shadow-lg shadow-indigo-500/20", active: true },
        { day: "Sex", value: 150, height: "45%", className: "bg-indigo-100 dark:bg-indigo-900/20" },
        { day: "Sáb", value: 40, height: "20%", className: "bg-indigo-100 dark:bg-indigo-900/20" },
        { day: "Dom", value: 210, height: "55%", className: "bg-indigo-100 dark:bg-indigo-900/20" },
    ];

    // Helper to get icon styles to avoid dynamic class issues with Tailwind
    const getIconStyles = (color: string) => {
        const styles: Record<string, string> = {
            rose: "bg-rose-100 dark:bg-rose-500/10 text-rose-500",
            indigo: "bg-indigo-100 dark:bg-indigo-500/10 text-indigo-500",
            emerald: "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-500",
            amber: "bg-amber-100 dark:bg-amber-500/10 text-amber-500",
            purple: "bg-purple-100 dark:bg-purple-500/10 text-purple-500",
            blue: "bg-blue-100 dark:bg-blue-500/10 text-blue-500",
        };
        return styles[color] || styles.rose;
    };

    // Helper for category spending widget
    const getCategoryStyles = (color: string) => {
        const iconStyles: Record<string, string> = {
            amber: "bg-amber-100 dark:bg-amber-500/10 text-amber-500",
            indigo: "bg-indigo-100 dark:bg-indigo-500/10 text-indigo-500",
            rose: "bg-rose-100 dark:bg-rose-500/10 text-rose-500",
            emerald: "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-500",
        };
        const barStyles: Record<string, string> = {
            amber: "bg-amber-500",
            indigo: "bg-indigo-500",
            rose: "bg-rose-500",
            emerald: "bg-emerald-500",
        };
        return {
            icon: iconStyles[color] || iconStyles.amber,
            bar: barStyles[color] || barStyles.amber
        };
    };

    // Mock data grouped by date
    const groups = [
        {
            date: "Hoje",
            items: [
                { name: "Supermercado Pão de Açúcar", time: "14:20", amount: "- R$ 342,50", type: "expense", category: "Alimentação", icon: "shopping_bag", color: "rose" },
                { name: "Netflix Assinatura", time: "09:00", amount: "- R$ 55,90", type: "expense", category: "Lazer", icon: "movie", color: "indigo" }
            ]
        },
        {
            date: "Ontem",
            items: [
                { name: "Transferência Recebida", time: "Pix • Jorge Silva", amount: "+ R$ 1.200,00", type: "income", category: "Pix", icon: "payments", color: "emerald" },
                { name: "Posto Ipiranga", time: "18:30", amount: "- R$ 250,00", type: "expense", category: "Transporte", icon: "local_gas_station", color: "amber" }
            ]
        },
        {
            date: "15 Setembro",
            items: [
                { name: "Smart Fit", time: "Mensalidade", amount: "- R$ 119,90", type: "expense", category: "Saúde", icon: "fitness_center", color: "purple" },
                { name: "Amazon Marketplace", time: "Eletrônicos", amount: "- R$ 89,90", type: "expense", category: "Compras", icon: "shopping_cart", color: "blue" }
            ]
        }
    ];

    const categoryData = [
        { name: "Alimentação", color: "amber", icon: "restaurant", percent: "42%" },
        { name: "Lazer", color: "indigo", icon: "movie", percent: "28%" },
        { name: "Transporte", color: "rose", icon: "directions_car", percent: "15%" },
        { name: "Outros", color: "emerald", icon: "shopping_bag", percent: "15%" },
    ];

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">Extrato</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Acompanhe suas transações de Setembro</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 glass-card py-1 px-1 pr-4 rounded-full">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                        <span className="text-sm font-medium hidden md:block text-slate-800 dark:text-white">Alex Silva</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Chart & Transactions */}
                <div className="lg:col-span-8 flex flex-col gap-5">
                    {/* Daily Expenses Chart */}
                    <div className="glassmorphism bg-white/60 dark:bg-slate-900/50 p-6 rounded-3xl relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Gastos Diários</h3>
                            <span className="text-xs font-medium text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-lg">Setembro 2023</span>
                        </div>
                        <div className="h-40 flex items-end gap-2 sm:gap-4 justify-between">
                            {chartData.map((item, index) => (
                                <div key={index} className={cn("w-full rounded-t-2xl relative group transition-all cursor-pointer hover:bg-indigo-200", item.className)} style={{ height: item.height }}>
                                    <div className={cn("absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold transition-opacity", item.active ? "text-indigo-600 dark:text-indigo-400 opacity-100" : "text-slate-500 opacity-0 group-hover:opacity-100")}>
                                        R${item.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                            {chartData.map((item, index) => (
                                <span key={index}>{item.day}</span>
                            ))}
                        </div>
                    </div>

                    {/* Grouped List */}
                    <div className="flex flex-col gap-6">
                        {groups.map((group, i) => (
                            <div key={i}>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">{group.date}</h4>
                                <div className="glassmorphism bg-white/40 dark:bg-slate-900/40 rounded-3xl overflow-hidden">
                                    {group.items.map((item, j) => (
                                        <div key={j} className="flex items-center justify-between p-4 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors border-b border-white/10 dark:border-slate-800/50 last:border-0 cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center text-lg",
                                                    getIconStyles(item.color)
                                                )}>
                                                    <span className="material-symbols-outlined text-xl">
                                                        {item.icon}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.name}</p>
                                                    <p className="text-[10px] text-slate-400">{item.category} • {item.time}</p>
                                                </div>
                                            </div>
                                            <span className={cn(
                                                "text-sm font-bold",
                                                item.type === 'income' ? "text-emerald-500" : "text-rose-500"
                                            )}>
                                                {item.amount}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Widgets */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* My Cards Widget */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Meus Cartões</h3>
                            <div className="flex gap-1">
                                <button className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-accent-blue transition-all">
                                    <ChevronLeft size={12} />
                                </button>
                                <button className="w-5 h-5 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-accent-blue transition-all">
                                    <ChevronRight size={12} />
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2 snap-x hide-scrollbar scroll-smooth">
                            <div className="min-w-full snap-center px-4">
                                <div className="w-full aspect-[1.586/1] rounded-xl overflow-hidden relative shadow-xl group cursor-pointer transition-transform hover:-translate-y-1 max-w-[260px] mx-auto">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#333] to-[#000]"></div>
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                                    <div className="relative z-10 h-full flex flex-col justify-between p-4 text-white">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="font-display font-bold text-[10px] tracking-tight">FinTrack Bank</span>
                                                <div className="px-1.5 py-0.5 bg-white/10 rounded-md text-[6px] font-bold tracking-widest border border-white/20 uppercase w-max">Black Edition</div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="flex -space-x-2 mb-1">
                                                    <div className="w-5 h-5 rounded-full bg-rose-600/90 border border-white/20"></div>
                                                    <div className="w-5 h-5 rounded-full bg-amber-500/90 border border-white/20"></div>
                                                </div>
                                                <span className="text-[6px] font-bold text-white/40 uppercase tracking-tighter">Mastercard</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="w-7 h-5 bg-amber-200/20 rounded border border-amber-200/30 backdrop-blur-sm relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <div className="text-[8px] text-white/50 font-mono tracking-widest mb-0.5">•••• 3796</div>
                                                    <div className="text-[9px] font-semibold tracking-widest uppercase">Alex Silva</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[6px] text-white/40 uppercase mb-0.5 font-semibold">Limite Disponível</div>
                                                    <div className="text-xs font-black text-sky-400 tracking-wide">R$ 15.420,50</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">Ações Rápidas</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <button className="flex flex-col items-center justify-center gap-1.5 p-3 glass-card rounded-2xl group w-full">
                                <div className="w-9 h-9 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                                    <Plus size={18} />
                                </div>
                                <span className="text-[8px] font-bold text-slate-700 dark:text-slate-300 text-center leading-tight">Receita</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-1.5 p-3 glass-card rounded-2xl group w-full">
                                <div className="w-9 h-9 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center text-rose-600 dark:text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-sm">
                                    <Minus size={18} />
                                </div>
                                <span className="text-[8px] font-bold text-slate-700 dark:text-slate-300 text-center leading-tight">Despesa</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-1.5 p-3 glass-card rounded-2xl group w-full">
                                <div className="w-9 h-9 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-sm">
                                    <FileText size={18} />
                                </div>
                                <span className="text-[8px] font-bold text-slate-700 dark:text-slate-300 text-center leading-tight">Faturas</span>
                            </button>
                        </div>
                    </div>

                    {/* Expenses by Category */}
                    <div className="glass-card p-6 rounded-3xl mt-2">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Gastos por Categoria</h3>
                        <div className="space-y-4">
                            {categoryData.map((cat, i) => {
                                const styles = getCategoryStyles(cat.color);
                                return (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                            styles.icon
                                        )}>
                                            <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{cat.name}</span>
                                                <span className="text-xs font-bold text-slate-800 dark:text-white">{cat.percent}</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div className={cn("h-full", styles.bar)} style={{ width: cat.percent }}></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
