import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@lib/utils";
import {
  ArrowRight,
  LayoutDashboard,
  Wallet,
  CreditCard,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Landmark,
  Bell,
  Plus,
  Info,
  UtensilsCrossed,
  Banknote,
  Settings,
  Car,
  Home,
  Lock,
  RefreshCw,
  ShoppingCart,
  Coffee,
  PieChart,
  Download,
  Lightbulb,
} from "lucide-react";
import { Logo } from "@components/ui/Logo";

const TABS = [
  { id: "inicio" as const, label: "Início", icon: LayoutDashboard },
  { id: "orcamento" as const, label: "Orçamento", icon: Wallet },
  { id: "cartoes" as const, label: "Cartões", icon: CreditCard },
  { id: "investimentos" as const, label: "Investimentos", icon: TrendingUp },
  { id: "relatorios" as const, label: "Relatórios", icon: BarChart3 },
] as const;

type TabId = (typeof TABS)[number]["id"];

/**
 * Onboarding - Ver Demonstração
 * Stitch: projects/16202502933435493036
 * Screen ID: 3116463382aa4ef4a8be071d06b6e644
 */
export default function OnboardingDemo() {
  const [activeTab, setActiveTab] = useState<TabId>("inicio");

  return (
    <div className="font-sans text-slate-700 dark:text-slate-300 min-h-screen flex flex-col relative overflow-x-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] dark:bg-[linear-gradient(180deg,#0f172a_0%,#020617_100%)]">
      {/* Mesh gradient background */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(at 0% 0%, rgba(14, 165, 233, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(30, 41, 59, 0.1) 0px, transparent 50%)",
        }}
      >
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-100/40 dark:bg-primary/10 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-slate-100/60 dark:bg-slate-800/40 blur-[80px] rounded-full mix-blend-multiply" />
      </div>

      {/* Nav */}
      <nav className="w-full flex justify-between items-center px-6 py-5 max-w-7xl mx-auto z-20 relative">
        <Link to="/" className="shrink-0">
          <Logo size="sm" />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
          <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Produtos
          </a>
          <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Soluções
          </a>
          <a href="#features" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Preços
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-slate-900 dark:text-white hidden sm:block hover:opacity-80 transition-opacity"
          >
            Voltar
          </Link>
          <Link
            to="/register"
            className="text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg shadow-slate-900/10 dark:shadow-white/10"
          >
            Começar Agora
          </Link>
        </div>
      </nav>

      <main className="flex-grow flex flex-col justify-center relative z-10 px-4 py-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-12 mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/30 text-xs font-semibold text-primary uppercase tracking-wider shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Demonstração Interativa
            </div>
            <h1 className="font-display font-bold text-4xl text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-8 max-w-3xl">
              Explore a interface completa do{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
                FinFlow
              </span>
            </h1>
            <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 hide-scrollbar" id="main-tabs">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    "px-5 py-3 rounded-xl border font-semibold text-sm transition-all duration-300 flex items-center gap-2",
                    activeTab === id
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-900/10 dark:shadow-white/10 scale-[1.02] border-transparent"
                      : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600"
                  )}
                >
                  <Icon size={20} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Left panel - Descriptions */}
          <div className="lg:col-span-4 space-y-6">
            <div className="min-h-[200px] transition-all duration-300">
              {activeTab === "inicio" && (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Conheça o Dashboard</h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    Tenha uma visão holística da sua vida financeira. O painel inicial consolida saldos, despesas
                    recentes e gráficos de fluxo de caixa em uma única tela intuitiva.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                      Resumo de saldo e gastos do mês
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                      Gráfico de fluxo de caixa interativo
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                      Acesso rápido a novas transações
                    </li>
                  </ul>
                </div>
              )}
              {activeTab === "orcamento" && (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Gestão de Orçamento</h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    Defina limites para categorias como alimentação, transporte e lazer. Acompanhe em tempo real e
                    receba alertas antes de estourar a meta.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                      Metas por categoria customizáveis
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                      Barras de progresso visual
                    </li>
                  </ul>
                </div>
              )}
              {activeTab === "cartoes" && (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Controle de Cartões</h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    Centralize todas as suas faturas. Visualize limite disponível, data de fechamento e últimas
                    compras em um único lugar.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                      Gestão de múltiplos cartões
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                      Detalhamento de fatura em tempo real
                    </li>
                  </ul>
                </div>
              )}
              {activeTab === "investimentos" && (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Carteira de Investimentos</h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    Monitore a rentabilidade dos seus ativos. Acompanhe evolução patrimonial com gráficos de
                    alocação e previsão de dividendos.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                      Rentabilidade diária e mensal
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                      Gráfico de alocação de carteira
                    </li>
                  </ul>
                </div>
              )}
              {activeTab === "relatorios" && (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Relatórios Inteligentes</h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    Insights automáticos sobre sua saúde financeira. Análise de padrões de consumo e sugestões de
                    economia.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                      Dicas personalizadas de economia
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                      Comparativo Ganhos vs. Gastos
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link
                to="/register"
                className="w-full px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/10 flex items-center justify-center gap-2 group"
              >
                Experimentar Grátis
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">
                Teste grátis por 14 dias. Não requer cartão.
              </p>
            </div>
          </div>

          {/* Right panel - Mock browser */}
          <div className="lg:col-span-8 relative h-[650px]">
            <div className="absolute inset-0 bg-slate-200/20 dark:bg-slate-800/30 rounded-[2.5rem] transform rotate-1" />
            <div className="relative w-full h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.15)] dark:shadow-slate-900/50 flex flex-col z-10 transition-all duration-500">
              {/* Browser chrome */}
              <div className="h-10 bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 flex items-center px-4 justify-between shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-grow mx-12 flex justify-center">
                  <div className="w-full max-w-xs h-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-md flex items-center px-3 gap-2 shadow-sm">
                    <Lock size={10} className="text-slate-400 shrink-0" />
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate w-full text-center">
                      app.finflow.com.br/dashboard
                    </span>
                  </div>
                </div>
                <div className="w-12 flex justify-end">
                  <RefreshCw size={14} className="text-slate-300 dark:text-slate-500" />
                </div>
              </div>

              {/* Screen content */}
              <div className="flex-grow overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 hide-scrollbar">
                {activeTab === "inicio" && <ScreenInicio />}
                {activeTab === "orcamento" && <ScreenOrcamento />}
                {activeTab === "cartoes" && <ScreenCartoes />}
                {activeTab === "investimentos" && <ScreenInvestimentos />}
                {activeTab === "relatorios" && <ScreenRelatorios />}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-8 z-20 animate-bounce hidden md:block pointer-events-none">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Economia mensal</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">+ R$ 1.240,00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center text-slate-400 dark:text-slate-500 text-sm relative z-10">
        <p>© 2026 FinFlow. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

function ScreenInicio() {
  return (
    <div className="p-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Olá, Guilherme 👋</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Aqui está o resumo da sua saúde financeira hoje.</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            <Bell size={20} />
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg shadow-slate-900/10"
          >
            <Plus size={16} /> Nova Transação
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-default group">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Saldo Disponível</p>
            <Landmark size={20} className="text-slate-300 dark:text-slate-500 group-hover:text-primary transition-colors" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">R$ 12.450,80</p>
          <div className="mt-4 flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/30 w-fit px-2 py-1 rounded-full">
            <TrendingUp size={12} /> +4.5%
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-default group">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gastos no Mês</p>
            <CreditCard size={20} className="text-slate-300 dark:text-slate-500 group-hover:text-rose-500 transition-colors" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">R$ 4.120,00</p>
          <div className="mt-4 flex items-center gap-1 text-rose-500 text-xs font-bold bg-rose-50 dark:bg-rose-900/30 w-fit px-2 py-1 rounded-full">
            <TrendingUp size={12} className="rotate-180" /> -12% vs meta
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-default group">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Investido</p>
            <Wallet size={20} className="text-slate-300 dark:text-slate-500 group-hover:text-purple-500 transition-colors" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">R$ 84.900,00</p>
          <div className="mt-4 flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-bold bg-slate-100 dark:bg-slate-700 w-fit px-2 py-1 rounded-full">
            Rendimento: 1.2% a.m.
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Fluxo de Caixa
            <span title="Entradas e Saídas">
              <Info size={14} className="text-slate-300 dark:text-slate-500" />
            </span>
          </h3>
          <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
            <button type="button" className="px-3 py-1 bg-white dark:bg-slate-800 shadow-sm rounded-md text-xs font-bold text-slate-900 dark:text-white">
              7 Dias
            </button>
            <button type="button" className="px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
              30 Dias
            </button>
          </div>
        </div>
        <div className="h-48 flex items-end justify-between gap-3 px-2">
          {[30, 45, 25, 70, 55, 40, 85].map((h, i) => (
            <div
              key={i}
              className={cn(
                "w-full rounded-t-lg relative group transition-colors",
                i === 3 ? "bg-slate-900 dark:bg-slate-600 h-[70%]" : i === 6 ? "bg-primary h-[85%]" : "bg-slate-100 dark:bg-slate-700",
                i === 3 || i === 6 ? "shadow-lg" : "hover:bg-slate-200 dark:hover:bg-slate-600"
              )}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase">
          <span>Seg</span>
          <span>Ter</span>
          <span>Qua</span>
          <span>Qui</span>
          <span>Sex</span>
          <span>Sab</span>
          <span>Dom</span>
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
            <UtensilsCrossed size={16} />
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white">iFood</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Hoje, 12:30</p>
          </div>
          <p className="text-sm font-bold text-rose-500">- R$ 45,90</p>
        </div>
        <div className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Banknote size={16} />
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white">Salário</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Ontem</p>
          </div>
          <p className="text-sm font-bold text-emerald-600">+ R$ 5.200,00</p>
        </div>
      </div>
    </div>
  );
}

function ScreenOrcamento() {
  return (
    <div className="p-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Planejamento Mensal</h2>
        <button
          type="button"
          className="text-sm font-semibold text-primary bg-blue-50 dark:bg-primary/20 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-blue-100 dark:hover:bg-primary/30 transition-colors"
        >
          <Settings size={14} /> Ajustar metas
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm text-center">
          <p className="text-xs text-slate-400 uppercase font-semibold">Gasto Total</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">R$ 4.450</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm text-center">
          <p className="text-xs text-slate-400 uppercase font-semibold">Disponível</p>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">R$ 2.050</p>
        </div>
      </div>
      <div className="space-y-6">
        {[
          { label: "Alimentação", icon: UtensilsCrossed, color: "orange", pct: 80, val: "1.200 / 1.500" },
          { label: "Transporte", icon: Car, color: "purple", pct: 75, val: "450 / 600" },
          { label: "Moradia", icon: Home, color: "emerald", pct: 100, val: "2.800 / 2.800" },
        ].map(({ label, icon: Icon, color, pct, val }) => (
          <div
            key={label}
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    color === "orange" && "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
                    color === "purple" && "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
                    color === "emerald" && "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                  )}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">{label}</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{pct}% consumido</span>
                </div>
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700 px-2 py-1 rounded">
                R$ {val}
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full",
                  color === "orange" && "bg-orange-500",
                  color === "purple" && "bg-purple-500",
                  color === "emerald" && "bg-emerald-500"
                )}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenCartoes() {
  return (
    <div className="p-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Meus Cartões</h2>
        <button
          type="button"
          className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="flex overflow-x-auto pb-4 gap-6 mb-8 hide-scrollbar snap-x">
        <div className="w-72 flex-shrink-0 h-44 bg-slate-900 dark:bg-slate-800 rounded-2xl p-6 relative overflow-hidden text-white shadow-xl shadow-slate-900/20 snap-center transition-transform hover:scale-[1.02] cursor-pointer">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="flex justify-between items-start mb-8">
            <span className="text-sm opacity-60 font-medium">FinFlow Black</span>
            <CreditCard size={20} className="opacity-60" />
          </div>
          <p className="text-lg font-mono tracking-widest mb-4">**** **** **** 8821</p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] opacity-40 uppercase">Titular</p>
              <p className="text-sm font-bold uppercase">G R SILVA</p>
            </div>
            <div className="w-10 h-6 bg-white/20 rounded-md" />
          </div>
        </div>
        <div className="w-72 flex-shrink-0 h-44 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 relative overflow-hidden text-white shadow-xl shadow-purple-900/20 snap-center transition-transform hover:scale-[1.02] cursor-pointer opacity-80 hover:opacity-100">
          <div className="absolute -left-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="flex justify-between items-start mb-8">
            <span className="text-sm opacity-60 font-medium">NuBank Platinum</span>
            <CreditCard size={20} className="opacity-60" />
          </div>
          <p className="text-lg font-mono tracking-widest mb-4">**** **** **** 4092</p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] opacity-40 uppercase">Titular</p>
              <p className="text-sm font-bold uppercase">G R SILVA</p>
            </div>
            <div className="flex gap-1">
              <div className="w-6 h-6 rounded-full bg-red-500/80" />
              <div className="w-6 h-6 rounded-full bg-yellow-500/80 -ml-3" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <div className="font-bold text-slate-900 dark:text-white">Fatura Atual</div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">R$ 2.450,12</div>
        </div>
        <div className="p-2">
          {[
            { name: "Amazon.com", time: "Ontem", val: "150,00", icon: ShoppingCart },
            { name: "Starbucks Coffee", time: "Hoje", val: "18,50", icon: Coffee },
            { name: "Uber Trip", time: "Hoje", val: "24,90", icon: Car },
          ].map(({ name, time, val, icon: Icon }) => (
            <div
              key={name}
              className="flex justify-between items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:bg-white dark:group-hover:bg-slate-600 border border-transparent group-hover:border-slate-200 dark:group-hover:border-slate-500 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-all">
                  <Icon size={16} />
                </div>
                <div>
                  <span className="text-sm font-bold block text-slate-900 dark:text-white">{name}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">{time}</span>
                </div>
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-white">R$ {val}</span>
            </div>
          ))}
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700 text-center">
          <button type="button" className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            Ver fatura completa
          </button>
        </div>
      </div>
    </div>
  );
}

function ScreenInvestimentos() {
  return (
    <div className="p-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Carteira de Investimentos</h2>
        <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 p-1 rounded-lg shadow-sm">
          <button type="button" className="px-3 py-1.5 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-sm">
            Resumo
          </button>
          <button type="button" className="px-3 py-1.5 rounded-md text-slate-500 dark:text-slate-400 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Ativos
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 p-8 rounded-2xl text-white shadow-xl shadow-slate-900/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10">
            <p className="text-slate-400 text-sm mb-1 font-medium">Patrimônio Total</p>
            <h3 className="text-4xl font-bold mb-6 tracking-tight">R$ 84.900,00</h3>
            <div className="flex gap-8 border-t border-white/10 pt-6">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Rentabilidade Hoje</p>
                <p className="text-emerald-400 font-bold text-lg flex items-center gap-1">
                  <TrendingUp size={16} /> + R$ 420,00
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">No Mês</p>
                <p className="text-emerald-400 font-bold text-lg flex items-center gap-1">
                  <TrendingUp size={16} /> + 1.84%
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
          <p className="text-sm font-bold text-slate-900 dark:text-white mb-6 flex justify-between">
            Alocação
            <PieChart size={16} className="text-slate-300 dark:text-slate-500" />
          </p>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full border-[12px] border-slate-900 dark:border-slate-600 relative shadow-inner">
              <div className="absolute inset-0 border-[12px] border-primary border-l-transparent border-b-transparent border-r-transparent rounded-full rotate-45" />
            </div>
            <div className="space-y-3 flex-grow">
              {[
                { color: "bg-slate-900 dark:bg-slate-600", label: "Renda Fixa", pct: "70%" },
                { color: "bg-primary", label: "Ações", pct: "20%" },
                { color: "bg-slate-200 dark:bg-slate-500", label: "Outros", pct: "10%" },
              ].map(({ color, label, pct }) => (
                <div key={label} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", color)} />
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{label}</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">{pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col justify-center hover:shadow-md transition-all group cursor-default">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Banknote size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Próximos Proventos</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">Previsão</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">R$ 380,50</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium bg-slate-50 dark:bg-slate-700 py-1 px-2 rounded w-fit">
            Expectativa para 15/Mai
          </p>
        </div>
      </div>
    </div>
  );
}

function ScreenRelatorios() {
  return (
    <div className="p-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Relatórios e Insights</h2>
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <Download size={16} /> Exportar PDF
        </button>
      </div>
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 flex gap-4 hover:shadow-md transition-shadow cursor-default">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800/50 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0 shadow-sm">
            <Lightbulb size={24} />
          </div>
          <div>
            <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">Dica de Economia</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              Detectamos que seus gastos com assinaturas de streaming aumentaram 30% nos últimos 3 meses. Desative os
              planos que você não usa para economizar até{" "}
              <span className="font-bold underline">R$ 80,00 mensais</span>.
            </p>
            <button type="button" className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 uppercase tracking-wide">
              Rever Assinaturas
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-slate-900 dark:text-white">Entradas vs Saídas</h4>
              <BarChart3 size={16} className="text-slate-300 dark:text-slate-500" />
            </div>
            <div className="flex items-end gap-3 h-32 px-2">
              {[60, 80, 45, 75].map((h, i) => (
                <div key={i} className="flex-grow flex flex-col justify-end gap-1 group">
                  <div className="bg-slate-900 dark:bg-slate-600 rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity" style={{ height: `${h}%` }} />
                  <div className="bg-slate-200 dark:bg-slate-600 rounded-b-sm" style={{ height: `${100 - h}%` }} />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-4 text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-slate-900 dark:bg-slate-600" /> Entradas
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-slate-200 dark:bg-slate-500" /> Saídas
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <h4 className="font-bold text-slate-900 dark:text-white mb-4 z-10 relative">Evolução Patrimonial</h4>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-50 dark:from-blue-900/20 to-transparent" />
            <div className="relative h-24 flex items-center justify-center z-10">
              <svg className="w-full h-full text-primary drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 100 40">
                <path d="M0 35 Q 20 35, 30 25 T 60 20 T 100 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="absolute right-0 top-0 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full">
                +12%
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">Crescimento constante nos últimos 6 meses</p>
          </div>
        </div>
      </div>
    </div>
  );
}
