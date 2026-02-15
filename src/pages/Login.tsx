import { Button } from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { Rocket, Mail, Lock, ArrowRight, TrendingUp } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    return (
        <div className="flex min-h-screen flex-row font-body bg-white text-slate-700">
            {/* Left Side - Dark Gradient & Content */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 text-white">
                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/20 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600/20 blur-3xl rounded-full"></div>

                {/* Content */}
                <div className="flex items-center gap-3 relative z-10">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 shrink-0">
                        <Rocket size={24} fill="currentColor" />
                    </div>
                    <span className="font-display font-bold text-2xl tracking-tight">FinTrack</span>
                </div>

                <div className="relative z-10 max-w-md space-y-6">
                    <h1 className="font-display font-bold text-5xl leading-tight">
                        Gerencie suas finanças com inteligência.
                    </h1>
                    <p className="text-slate-300 text-lg font-light leading-relaxed">
                        Acompanhe seus gastos, planeje orçamentos e alcance seus objetivos financeiros em uma única plataforma segura e intuitiva.
                    </p>

                    <div className="mt-8 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                        <div className="p-2 bg-primary/20 rounded-lg text-primary">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Crescimento constante</h3>
                            <p className="text-sm text-slate-300 mt-1">Mais de 50.000 usuários confiam no FinTrack para multiplicar seu patrimônio.</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm text-slate-400">
                    © 2026 FinTrack Inc. Todos os direitos reservados.
                </div>
            </div>

            {/* Right Side - Login Form (White Background) */}
            <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 relative z-10">
                <div className="w-full max-w-md space-y-8">
                    <div className="lg:hidden flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shrink-0">
                            <Rocket size={20} fill="currentColor" />
                        </div>
                        <span className="font-display font-bold text-xl text-slate-900">FinTrack</span>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-3xl font-display font-bold text-slate-900">Bem-vindo de volta</h2>
                        <p className="text-slate-500">Por favor, insira seus dados para acessar sua conta.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-slate-700">E-mail</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="text-slate-400" size={20} />
                                </div>
                                <input
                                    type="email"
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow text-sm"
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-slate-700">Senha</label>
                                <Link to="/forgot-password" className="text-sm font-medium text-slate-900 hover:text-primary transition-colors">
                                    Esqueci minha senha
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="text-slate-400" size={20} />
                                </div>
                                <input
                                    type="password"
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-shadow text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all transform hover:-translate-y-0.5">
                            Entrar
                            <ArrowRight size={20} />
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-slate-500">ou continue com</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <button type="button" className="w-full flex justify-center items-center gap-3 px-4 py-3 border border-slate-200 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                            {/* Google Icon SVG */}
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Entrar com Google
                        </button>
                    </div>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        Não tem uma conta?
                        <Link to="/register" className="font-bold text-slate-900 hover:text-primary transition-colors ml-1">Criar conta</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
