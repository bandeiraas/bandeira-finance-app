import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@lib/utils";
import { ScreenInicio } from "./onboarding-demo/ScreenInicio";
import { ScreenOrcamento } from "./onboarding-demo/ScreenOrcamento";
import { ScreenCartoes } from "./onboarding-demo/ScreenCartoes";
import { ScreenInvestimentos } from "./onboarding-demo/ScreenInvestimentos";
import { ScreenRelatorios } from "./onboarding-demo/ScreenRelatorios";
import {
  ArrowRight,
  LayoutDashboard,
  Wallet,
  CreditCard,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Lock,
  RefreshCw,
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
          <a
            href="#features"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Produtos
          </a>
          <a
            href="#features"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Soluções
          </a>
          <a
            href="#features"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
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
            <div
              className="flex flex-wrap gap-3 overflow-x-auto pb-2 hide-scrollbar"
              id="main-tabs"
            >
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    "px-5 py-3 rounded-xl border font-semibold text-sm transition-all duration-300 flex items-center gap-2",
                    activeTab === id
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-900/10 dark:shadow-white/10 scale-[1.02] border-transparent"
                      : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600",
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
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Conheça o Dashboard
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    Tenha uma visão holística da sua vida financeira. O painel
                    inicial consolida saldos, despesas recentes e gráficos de
                    fluxo de caixa em uma única tela intuitiva.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2
                        size={18}
                        className="text-primary shrink-0 mt-0.5"
                      />
                      Resumo de saldo e gastos do mês
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2
                        size={18}
                        className="text-primary shrink-0 mt-0.5"
                      />
                      Gráfico de fluxo de caixa interativo
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2
                        size={18}
                        className="text-primary shrink-0 mt-0.5"
                      />
                      Acesso rápido a novas transações
                    </li>
                  </ul>
                </div>
              )}
              {activeTab === "orcamento" && (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Gestão de Orçamento
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    Defina limites para categorias como alimentação, transporte
                    e lazer. Acompanhe em tempo real e receba alertas antes de
                    estourar a meta.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2
                        size={18}
                        className="text-primary shrink-0 mt-0.5"
                      />
                      Metas por categoria customizáveis
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2
                        size={18}
                        className="text-primary shrink-0 mt-0.5"
                      />
                      Barras de progresso visual
                    </li>
                  </ul>
                </div>
              )}
              {activeTab === "cartoes" && (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Controle de Cartões
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    Centralize todas as suas faturas. Visualize limite
                    disponível, data de fechamento e últimas compras em um único
                    lugar.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2
                        size={18}
                        className="text-primary shrink-0 mt-0.5"
                      />
                      Gestão de múltiplos cartões
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2
                        size={18}
                        className="text-primary shrink-0 mt-0.5"
                      />
                      Detalhamento de fatura em tempo real
                    </li>
                  </ul>
                </div>
              )}
              {activeTab === "investimentos" && (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Carteira de Investimentos
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    Monitore a rentabilidade dos seus ativos. Acompanhe evolução
                    patrimonial com gráficos de alocação e previsão de
                    dividendos.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2
                        size={18}
                        className="text-primary shrink-0 mt-0.5"
                      />
                      Rentabilidade diária e mensal
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2
                        size={18}
                        className="text-primary shrink-0 mt-0.5"
                      />
                      Gráfico de alocação de carteira
                    </li>
                  </ul>
                </div>
              )}
              {activeTab === "relatorios" && (
                <div className="animate-in fade-in slide-in-from-bottom-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Relatórios Inteligentes
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    Insights automáticos sobre sua saúde financeira. Análise de
                    padrões de consumo e sugestões de economia.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2
                        size={18}
                        className="text-primary shrink-0 mt-0.5"
                      />
                      Dicas personalizadas de economia
                    </li>
                    <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle2
                        size={18}
                        className="text-primary shrink-0 mt-0.5"
                      />
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
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
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
                  <RefreshCw
                    size={14}
                    className="text-slate-300 dark:text-slate-500"
                  />
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
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Economia mensal
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    + R$ 1.240,00
                  </p>
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
