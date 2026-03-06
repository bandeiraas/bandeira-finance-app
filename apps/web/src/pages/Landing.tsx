import { Link } from "react-router-dom";
import {
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  TrendingUp,
  Shield,
  Brain,
} from "lucide-react";
import { Logo } from "@components/ui/Logo";

export default function Landing() {
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
        <Logo size="sm" className="shrink-0" />
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
            to="/login"
            className="text-sm font-medium text-slate-900 dark:text-white hidden sm:block hover:opacity-80 transition-opacity"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg shadow-slate-900/10 dark:shadow-white/10"
          >
            Começar
          </Link>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-4 pt-10 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/30 text-xs font-semibold text-primary uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Gestão Inteligente v2.0
          </div>

          <h1 className="font-display font-bold text-5xl md:text-7xl text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Controle financeiro <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
              simplificado ao extremo.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Reunimos todas as suas contas, investimentos e metas em um único
            painel minimalista alimentado por inteligência artificial.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/10 hover:-translate-y-1 flex items-center justify-center gap-2 group"
            >
              Criar conta grátis
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              to="/demo"
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <PlayCircle size={20} className="text-slate-900 dark:text-white" />
              Ver demonstração
            </Link>
          </div>

          <div className="pt-8 flex items-center justify-center gap-2 text-sm text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              Sem cartão de crédito
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className="flex items-center gap-1">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              14 dias grátis
            </span>
          </div>
        </div>

        <div className="w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mb-16" />

        {/* Features */}
        <section
          id="features"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto w-full px-4"
        >
          <div className="flex flex-col items-center text-center group cursor-default">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/30 dark:to-sky-800/30 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 border border-white dark:border-slate-700/50">
              <TrendingUp size={32} className="text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
              Crescimento Real
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              Analise a evolução do seu patrimônio com gráficos limpos e
              projeções automáticas baseadas no seu histórico.
            </p>
          </div>

          <div className="flex flex-col items-center text-center group cursor-default">
            <div className="w-20 h-20 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center mb-6 shadow-lg shadow-slate-900/20 dark:shadow-white/20 group-hover:scale-110 transition-transform duration-300 border border-slate-800 dark:border-slate-200">
              <Shield size={32} className="text-white dark:text-slate-900" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
              Segurança Total
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              Criptografia de ponta a ponta e conformidade bancária para
              garantir que seus dados permaneçam seus.
            </p>
          </div>

          <div className="flex flex-col items-center text-center group cursor-default">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/30 dark:to-sky-800/30 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 border border-white dark:border-slate-700/50">
              <Brain size={32} className="text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
              Inteligência Artificial
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              Insights personalizados sobre seus gastos e sugestões de economia
              geradas por nossa IA exclusiva.
            </p>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 text-center text-slate-400 dark:text-slate-500 text-sm relative z-10">
        <p>© 2026 FinFlow. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
