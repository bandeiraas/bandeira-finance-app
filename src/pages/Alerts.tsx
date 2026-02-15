import {
    Sparkles,
    MoreHorizontal,
    Rocket,
    Zap,
    Archive,
    ChevronDown,
    RefreshCw,
    Brain,
    Lightbulb,
    ArrowRight,
    TrendingUp,
    AlertTriangle,
    ChevronRight,
    GraduationCap,
    LineChart
} from "lucide-react";

export default function Alerts() {
    return (
        <div className="flex flex-col h-full space-y-6 overflow-hidden">
            <header className="flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Intelligent Alert Digest</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="flex h-2 w-2 rounded-full bg-violet-500 animate-pulse"></span>
                        <p className="text-slate-400 text-sm">Resumo gerado por IA há 5 minutos</p>
                    </div>
                </div>
            </header>

            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
                {/* Main Content Area */}
                <div className="lg:col-span-12 flex flex-col h-full">
                    <div className="glassmorphism bg-slate-900/50 p-6 sm:p-8 rounded-3xl h-full flex flex-col lg:flex-row gap-8 lg:gap-10 relative overflow-y-auto hide-scrollbar">

                        {/* Feed Column */}
                        <div className="flex-1 relative z-10 flex flex-col">
                            {/* Critical Takeaways Card */}
                            <div className="mb-8 bg-gradient-to-br from-violet-500/10 to-sky-500/10 border border-violet-500/20 rounded-2xl p-5 relative overflow-hidden group">
                                <div className="ai-shimmer absolute inset-0 opacity-30 pointer-events-none"></div>
                                <div className="flex items-start gap-4 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-violet-500 shadow-sm border border-violet-500/20 shrink-0">
                                        <Sparkles size={24} fill="currentColor" className="text-violet-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white mb-1">Takeaways Críticos da Semana</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed">
                                            Detectamos <span className="text-rose-500 font-semibold">1 pagamento urgente</span> hoje e um padrão de <span className="text-amber-500 font-semibold">gasto atípico</span> em eletrônicos. No entanto, seu saldo cresceu 8% devido ao bônus recebido, compensando o desvio.
                                        </p>
                                        <div className="flex flex-wrap gap-4 mt-3">
                                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-violet-400 uppercase tracking-wider">
                                                <AlertTriangle size={14} />
                                                Foco: Dívidas
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-500 uppercase tracking-wider">
                                                <TrendingUp size={14} />
                                                Oportunidade: Reinvestimento
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Feed Filters */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Feed Inteligente</h3>
                                <div className="flex gap-2">
                                    <button className="px-4 py-1.5 rounded-full bg-white text-slate-900 text-xs font-semibold shadow-md transition-transform hover:scale-105">Priority Only</button>
                                    <button className="px-4 py-1.5 rounded-full bg-slate-800/50 text-slate-500 text-xs font-medium border border-white/10 hover:bg-slate-800 transition-colors">Archive</button>
                                </div>
                            </div>

                            {/* Timeline Feed */}
                            <div className="space-y-6 pl-2 border-l-2 border-slate-800 ml-3">

                                {/* Item 1: High Priority - Bill */}
                                <div className="relative pl-8">
                                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-rose-500 ring-4 ring-slate-900 shadow-sm shadow-rose-900/20"></div>
                                    <div className="p-5 bg-slate-800/70 rounded-2xl border border-slate-700 shadow-sm hover:shadow-md transition-all group hover:bg-slate-800">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-900/30 text-rose-400 uppercase tracking-wider border border-rose-800/50">Vencimento</span>
                                                <span className="text-xs text-slate-400">Hoje, 10:00</span>
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
                                                    <LineChart size={12} />
                                                    Priority 98/100
                                                </div>
                                            </div>
                                            <button className="text-slate-500 hover:text-white transition-colors">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>
                                        <h4 className="font-bold text-white text-base mb-1">Fatura do Cartão de Crédito</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-4">
                                            Sua fatura de <strong className="text-slate-200">R$ 1.250,90</strong> vence hoje. A IA recomenda o pagamento imediato para evitar R$ 45,00 em juros estimados.
                                        </p>
                                        <div className="flex flex-wrap gap-2 items-center justify-between border-t border-slate-700/50 pt-4">
                                            <button className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-rose-900/20 flex items-center gap-2 transform hover:-translate-y-0.5">
                                                Pagar Agora <Rocket size={14} />
                                            </button>
                                            <div className="flex items-center gap-2 text-[11px] text-violet-400 font-medium">
                                                <Zap size={14} />
                                                AI Suggestion: Use seu saldo em reserva
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Item 2: Medium Priority - Spending */}
                                <div className="relative pl-8">
                                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-slate-900"></div>
                                    <div className="p-5 bg-slate-800/70 rounded-2xl border border-slate-700 shadow-sm hover:shadow-md transition-all hover:bg-slate-800">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-900/30 text-amber-400 uppercase tracking-wider">Atenção</span>
                                                <span className="text-xs text-slate-400">Ontem, 16:30</span>
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
                                                    <LineChart size={12} />
                                                    Priority 82/100
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-white text-base mb-1">Gasto Anormal Detectado</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-4">
                                            A IA identificou um gasto em <strong className="text-slate-200">Eletrônicos (R$ 450,00)</strong> fora do seu perfil habitual de consumo mensal.
                                        </p>
                                        <div className="flex gap-3">
                                            <button className="text-xs font-bold text-slate-300 bg-slate-700/50 px-4 py-2 rounded-xl hover:bg-slate-700 transition-colors">Validar Transação</button>
                                            <button className="text-xs font-bold text-rose-400 bg-rose-900/20 px-4 py-2 rounded-xl hover:bg-rose-900/30 transition-colors">Contestar</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Item 3: Low Priority - Stacked */}
                                <div className="relative pl-8 opacity-60 hover:opacity-100 transition-opacity">
                                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-600 ring-4 ring-slate-900"></div>
                                    <div className="p-4 bg-slate-800/30 rounded-2xl border border-dashed border-slate-700 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <Archive size={20} className="text-slate-500" />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-semibold text-slate-400 text-sm">2 Notificações de Baixa Prioridade</h4>
                                                    <span className="text-[10px] bg-slate-700 px-1.5 py-0.5 rounded text-slate-400 uppercase font-bold">Priority 15</span>
                                                </div>
                                                <p className="text-xs text-slate-500">Metas atingidas e informativos do sistema</p>
                                            </div>
                                        </div>
                                        <ChevronDown size={20} className="text-slate-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="w-full lg:w-96 shrink-0 flex flex-col gap-6 relative z-10 border-t lg:border-t-0 lg:border-l border-slate-800 pt-8 lg:pt-0 lg:pl-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">IA Financial Insights</h3>
                                <button className="w-8 h-8 rounded-full bg-slate-800 text-violet-400 hover:bg-violet-600 hover:text-white flex items-center justify-center shadow-sm transition-all">
                                    <RefreshCw size={16} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Insight 1 */}
                                <div className="glass-card p-5 rounded-2xl border-l-4 border-l-violet-500 relative overflow-hidden group hover:bg-slate-800/60">
                                    <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Brain size={64} className="text-violet-500" />
                                    </div>
                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500 shrink-0">
                                            <Lightbulb size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm mb-1">Padrão de Economia</h4>
                                            <p className="text-xs text-slate-400 leading-relaxed mb-3">
                                                Notamos uma queda de 15% em gastos com delivery. A IA sugere alocar essa diferença (<strong className="text-violet-400">R$ 240,00</strong>) na sua reserva de emergência.
                                            </p>
                                            <button className="text-[10px] font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all hover:text-violet-300">
                                                Aceitar Sugestão <ArrowRight size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Insight 2 */}
                                <div className="glass-card p-5 rounded-2xl border-l-4 border-l-indigo-500 relative overflow-hidden group hover:bg-slate-800/60">
                                    <div className="absolute right-0 top-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <LineChart size={64} className="text-indigo-500" />
                                    </div>
                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shrink-0">
                                            <GraduationCap size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm mb-1">Otimização de Portfólio</h4>
                                            <p className="text-xs text-slate-400 leading-relaxed mb-3">
                                                Com base na alta da Selic, o título Tesouro Selic 2029 tornou-se 12% mais atrativo que seu CDB atual.
                                            </p>
                                            <a href="#" className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider hover:underline flex items-center gap-1 hover:text-indigo-300">
                                                Ver Análise IA <ChevronRight size={12} />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Insight 3 */}
                                <div className="glass-card p-5 rounded-2xl bg-emerald-900/10 border-l-4 border-l-emerald-500 relative overflow-hidden group hover:bg-emerald-900/20">
                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                            <TrendingUp size={20} />
                                        </div>
                                        <div className="w-full">
                                            <h4 className="font-bold text-white text-sm mb-1">Meta: Viagem Japão</h4>
                                            <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 mb-1">
                                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "65%" }}></div>
                                            </div>
                                            <p className="text-[10px] text-slate-400">Previsão IA: Meta atingida em 4 meses (2 meses antes do previsto).</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-6">
                                <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] transition-transform">
                                    <Brain size={18} className="text-violet-600" />
                                    Perguntar à IA Financeira
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
