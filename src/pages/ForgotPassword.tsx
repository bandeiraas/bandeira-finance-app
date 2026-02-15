import { useState } from "react";
import { Link } from "react-router-dom";
import { KeyRound, Mail, ArrowRight, ArrowLeft, Send } from "lucide-react";


export default function ForgotPassword() {
    const [step, setStep] = useState<1 | 2>(1);
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 font-body text-slate-700 bg-[linear-gradient(135deg,#f8fafc_0%,#e2e8f0_100%)] dark:bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_100%)] relative overflow-hidden">
            {/* Background Blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-sky-500/10 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600/10 blur-3xl rounded-full"></div>
            </div>

            <div className="w-full max-w-md relative z-10 transition-all duration-500 ease-in-out">
                {step === 1 ? (
                    <>
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-12 h-12 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-slate-900 shrink-0 mb-4 shadow-lg shadow-slate-900/20">
                                <KeyRound size={24} />
                            </div>
                            <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white">Recuperar Acesso</h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-2 text-center max-w-xs">
                                Insira seu e-mail cadastrado para continuarmos com a recuperação da sua conta
                            </p>
                        </div>

                        <div className="glass-card rounded-3xl p-8 sm:p-10 w-full backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-white/40 dark:border-slate-700/40 shadow-xl">
                            <div className="mb-6 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                                <span>Passo 1 de 2</span>
                                <div className="flex gap-1.5">
                                    <div className="h-1.5 w-8 rounded-full bg-slate-900 dark:bg-white"></div>
                                    <div className="h-1.5 w-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">
                                        E-mail
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <Mail size={20} className="text-slate-400 group-focus-within:text-slate-600 dark:text-slate-500 dark:group-focus-within:text-slate-300 transition-colors" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="seu@email.com"
                                            className="block w-full pl-11 pr-3 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:border-transparent focus:bg-white dark:focus:bg-slate-800 transition-all sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-slate-900/10 text-sm font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    Continuar
                                    <ArrowRight size={18} />
                                </button>
                            </form>

                            <div className="mt-8 flex flex-col items-center gap-4">
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-slate-900 dark:text-white hover:text-sky-500 dark:hover:text-sky-400 transition-colors flex items-center gap-1"
                                >
                                    <ArrowLeft size={18} />
                                    Voltar para Login
                                </Link>
                                <div className="w-full border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
                                    <p className="text-center text-xs text-slate-400">
                                        Problemas?{" "}
                                        <a
                                            href="#"
                                            className="font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors underline decoration-slate-300 dark:decoration-slate-600 underline-offset-2"
                                        >
                                            Contatar Suporte
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="glass-card rounded-3xl p-8 sm:p-10 w-full text-center backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-white/40 dark:border-slate-700/40 shadow-xl animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-900 dark:text-white mx-auto mb-6 shadow-sm">
                            <Send size={36} className="text-sky-500" />
                        </div>
                        <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white mb-3">Verifique seu e-mail</h1>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                            Enviamos um link de recuperação para <strong>{email}</strong>. Por favor, verifique sua caixa de entrada e siga as instruções.
                        </p>

                        <div className="space-y-4">
                            <Link
                                to="/login"
                                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-slate-900/10 text-sm font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Voltar ao Login
                            </Link>
                            <div className="pt-2">
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Não recebeu o e-mail?{" "}
                                    <button
                                        type="button"
                                        className="font-bold text-slate-900 dark:text-white hover:text-sky-500 dark:hover:text-sky-400 transition-colors focus:outline-none"
                                        onClick={() => console.log("Resend email logic")}
                                    >
                                        Reenviar
                                    </button>
                                </p>
                            </div>
                        </div>

                        <p className="text-center text-sm text-slate-400 mt-8">
                            Precisa de ajuda? <a className="font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors" href="#">Contate o suporte</a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
