import { Link } from "react-router-dom";
import { Rocket, TrendingUp, ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function Landing() {
    return (
        <div className="flex min-h-screen flex-row font-body bg-slate-900 text-slate-700 overflow-hidden">
            {/* Background Gradients (Global) */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 z-0"></div>
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/20 blur-3xl rounded-full z-0 pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600/20 blur-3xl rounded-full z-0 pointer-events-none animate-pulse delay-1000"></div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col justify-between min-h-screen">

                {/* Header / Nav */}
                <nav className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 shrink-0 shadow-lg shadow-white/10">
                            <Rocket size={24} fill="currentColor" />
                        </div>
                        <span className="font-display font-bold text-2xl tracking-tight text-white">FinTrack</span>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/login" className="text-slate-300 hover:text-white font-medium transition-colors">Entrar</Link>
                        <Link to="/register" className="bg-white text-slate-900 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg shadow-white/10">
                            Criar Conta
                        </Link>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mt-12 lg:mt-0 flex-1">

                    {/* Text Content */}
                    <div className="flex-1 space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            Gestão Inteligente v2.0
                        </div>
                        <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-tight text-white">
                            Seu dinheiro, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">sob controle.</span>
                        </h1>
                        <p className="text-slate-400 text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            Acompanhe gastos, planeje metas e multiplique seu patrimônio com a plataforma financeira mais intuitiva do mercado.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link to="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-xl shadow-primary/20">
                                Começar Agora
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all backdrop-blur-md">
                                Fazer Login
                            </Link>
                        </div>

                        <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-slate-500 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-emerald-500" />
                                <span>Sem cartão necessário</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={16} className="text-emerald-500" />
                                <span>Plano Gratuito disponível</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Visual / Features */}
                    <div className="flex-1 w-full max-w-md lg:max-w-full">
                        <div className="relative">
                            {/* Decorative Blobs behind cards */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/10 to-blue-500/10 blur-3xl rounded-full"></div>

                            {/* Cards Grid */}
                            <div className="grid gap-6 relative z-10">
                                {/* Card 1 */}
                                <div className="glassmorphism bg-white/5 border-white/10 p-6 rounded-3xl flex items-center gap-4 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                        <TrendingUp size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">Crescimento Real</h3>
                                        <p className="text-slate-400 text-sm">Organize suas receitas e despesas</p>
                                    </div>
                                </div>

                                {/* Card 2 (Offset) */}
                                <div className="glassmorphism bg-white/5 border-white/10 p-6 rounded-3xl flex items-center gap-4 ml-8 sm:ml-12 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">Segurança Total</h3>
                                        <p className="text-slate-400 text-sm">Seus dados criptografados</p>
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="glassmorphism bg-white/5 border-white/10 p-6 rounded-3xl flex items-center gap-4 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                                        <Zap size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">Automação IA</h3>
                                        <p className="text-slate-400 text-sm">Insights automáticos inteligentes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="py-6 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm gap-4">
                    <p>© 2026 FinTrack Inc. Todos os direitos reservados.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Termos</a>
                        <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                        <a href="#" className="hover:text-white transition-colors">Ajuda</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
