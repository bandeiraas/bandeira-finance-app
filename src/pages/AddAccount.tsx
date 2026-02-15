import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type Step = "selection" | "manual" | "sync" | "success";

interface Bank {
    name: string;
    color: string;
    logo: React.ReactNode;
}

const BANKS: Bank[] = [
    { name: "Nubank", color: "bg-[#820ad1]", logo: "Nu" },
    { name: "Itaú", color: "bg-[#ec7000]", logo: <span className="italic">i</span> },
    { name: "Bradesco", color: "bg-[#cc092f]", logo: <span className="material-symbols-outlined text-white text-2xl">account_balance</span> },
    { name: "Santander", color: "bg-[#ec0000]", logo: "S" },
    { name: "Banco do Brasil", color: "bg-[#fadd00] text-[#003da5]", logo: "BB" },
    { name: "Inter", color: "bg-[#ff7a00]", logo: "Inter" },
    { name: "C6 Bank", color: "bg-[#111827]", logo: "C6" },
    { name: "Caixa", color: "bg-[#2563eb]", logo: "X" },
];

export default function AddAccount() {
    const [step, setStep] = useState<Step>("selection");
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

    // Manual Form State
    const [accountName, setAccountName] = useState("");
    const [balance, setBalance] = useState("");
    const [accountType, setAccountType] = useState("checking");

    const handleSelectBank = (bank: Bank) => {
        setSelectedBank(bank);
        setStep("sync");
    };

    const handleManualSelect = () => {
        setSelectedBank(null);
        setStep("manual");
    };

    // Simulate Sync Process
    useEffect(() => {
        if (step === "sync" && selectedBank) {
            const timer = setTimeout(() => {
                setStep("success");
            }, 3000); // 3 seconds fake sync
            return () => clearTimeout(timer);
        }
    }, [step, selectedBank]);

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep("success");
    };

    return (
        <div className="min-h-screen flex flex-col font-body text-slate-700 dark:text-slate-300 bg-[linear-gradient(135deg,#f8fafc_0%,#e2e8f0_100%)] dark:bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_100%)]">
            {/* Sidebar would go here in full layout, but we assume strict page content for now or wrapped in layout */}

            <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto hide-scrollbar items-center">

                {/* Header */}
                <header className="w-full max-w-4xl mx-auto mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">Conectar Conta</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {step === "selection" && "Adicione suas instituições financeiras para sincronizar."}
                            {step === "manual" && "Registro manual de nova conta bancária."}
                            {step === "sync" && "Conexão Segura"}
                            {step === "success" && "Conta adicionada com sucesso!"}
                        </p>
                    </div>
                    <Link to="/dashboard" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-700/30">
                        <span className="material-symbols-outlined">close</span>
                    </Link>
                </header>

                {/* STEP 1: SELECTION */}
                {step === "selection" && (
                    <div className="flex-1 flex flex-col items-center max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Progress Steps */}
                        <div className="w-full mb-12">
                            <div className="relative flex items-center justify-between w-full max-w-lg mx-auto">
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full -z-10"></div>
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/4 h-1 bg-sky-500 rounded-full -z-10"></div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-500/30">1</div>
                                    <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">Selecionar</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-400 flex items-center justify-center font-bold">2</div>
                                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Conectar</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-400 flex items-center justify-center font-bold">3</div>
                                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Finalizar</span>
                                </div>
                            </div>
                        </div>

                        <div className="glassmorphism bg-white/60 dark:bg-slate-900/50 p-8 rounded-3xl w-full shadow-xl">
                            <div className="relative mb-8">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">search</span>
                                <input
                                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-12 pr-4 text-slate-700 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Buscar instituição financeira..."
                                    type="text"
                                />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                                {BANKS.map((bank) => (
                                    <button
                                        key={bank.name}
                                        onClick={() => handleSelectBank(bank)}
                                        className="flex flex-col items-center justify-center gap-3 p-6 glass-card bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50 hover:border-sky-500/50 group transition-all"
                                    >
                                        <div className={`w-12 h-12 ${bank.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                            <span className="font-display font-bold text-lg">{bank.logo}</span>
                                        </div>
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{bank.name}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-center border-t border-slate-200 dark:border-slate-700/50 pt-6">
                                <button
                                    onClick={handleManualSelect}
                                    className="flex items-center gap-2 text-slate-500 hover:text-sky-500 dark:text-slate-400 dark:hover:text-sky-400 transition-colors font-medium"
                                >
                                    <span className="material-symbols-outlined">edit_square</span>
                                    Adicionar conta manualmente
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 2A: MANUAL FORM */}
                {step === "manual" && (
                    <div className="flex-1 flex flex-col items-center max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-right-8 duration-500">
                        <div className="glassmorphism bg-white/60 dark:bg-slate-900/50 p-8 sm:p-10 rounded-3xl w-full shadow-xl">
                            <form onSubmit={handleManualSubmit} className="space-y-8">
                                <div className="space-y-6">
                                    {/* Account Name */}
                                    <div className="relative group">
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 ml-1 mb-2">Nome da conta</label>
                                        <div className="absolute inset-y-0 left-0 pl-4 top-8 flex items-center pointer-events-none">
                                            <span className="material-symbols-outlined text-slate-400">edit</span>
                                        </div>
                                        <input
                                            value={accountName}
                                            onChange={(e) => setAccountName(e.target.value)}
                                            className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-lg font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-0 transition-all shadow-sm"
                                            placeholder="Ex: Minha Conta Corrente"
                                            type="text"
                                            required
                                        />
                                    </div>

                                    {/* Account Type */}
                                    <div className="space-y-3">
                                        <span className="block text-sm font-semibold text-slate-700 dark:text-slate-200 ml-1">Tipo da conta</span>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {[
                                                { id: "checking", label: "Corrente", icon: "account_balance" },
                                                { id: "savings", label: "Poupança", icon: "savings" },
                                                { id: "investment", label: "Investimento", icon: "trending_up" }
                                            ].map((type) => (
                                                <label key={type.id} className="cursor-pointer relative">
                                                    <input
                                                        type="radio"
                                                        name="account-type"
                                                        value={type.id}
                                                        checked={accountType === type.id}
                                                        onChange={(e) => setAccountType(e.target.value)}
                                                        className="peer sr-only"
                                                    />
                                                    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl hover:border-slate-300 dark:hover:border-slate-600 transition-all h-full peer-checked:border-sky-500 peer-checked:bg-blue-50/50 dark:peer-checked:bg-blue-900/20 peer-checked:ring-2 peer-checked:ring-sky-500/20">
                                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${accountType === type.id ? 'bg-sky-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                                                            <span className="material-symbols-outlined text-2xl">{type.icon}</span>
                                                        </div>
                                                        <span className="font-medium text-slate-900 dark:text-white">{type.label}</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Balance */}
                                    <div className="space-y-3">
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 ml-1">Saldo de abertura</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <span className="text-slate-400 font-bold text-lg">R$</span>
                                            </div>
                                            <input
                                                value={balance}
                                                onChange={(e) => setBalance(e.target.value)}
                                                className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl text-2xl font-bold text-slate-900 dark:text-white placeholder-slate-300 focus:outline-none focus:border-sky-500 focus:ring-0 transition-all shadow-sm"
                                                placeholder="0,00"
                                                type="text"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-6 flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setStep("selection")}
                                            className="w-full py-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                        >
                                            Voltar
                                        </button>
                                        <button
                                            type="submit"
                                            className="w-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold text-lg py-4 rounded-2xl shadow-lg shadow-slate-900/20 dark:shadow-white/10 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined">check_circle</span>
                                            Finalizar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* STEP 2B: SYNC SIMULATION */}
                {step === "sync" && selectedBank && (
                    <div className="w-full max-w-xl mx-auto animate-in fade-in zoom-in duration-500">
                        <div className="glassmorphism bg-white/60 dark:bg-slate-900/50 p-8 rounded-3xl relative overflow-hidden shadow-xl border-t border-white/60">
                            {/* Background Blobs for Sync */}
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-sky-500/5 blur-3xl rounded-full"></div>

                            <header className="flex items-center justify-between mb-8 relative z-10">
                                <button onClick={() => setStep("selection")} className="flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors text-sm font-medium">
                                    <span className="material-symbols-outlined text-lg">arrow_back</span> Voltar
                                </button>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-slate-400 text-lg">lock</span>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Conexão Segura</span>
                                </div>
                            </header>

                            <div className="flex flex-col items-center justify-center text-center space-y-8 relative z-10">
                                {/* Connection Animation */}
                                <div className="relative w-full max-w-[280px] h-32 flex items-center justify-center">
                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="w-1/2 h-full bg-sky-500 animate-[pulse_2s_infinite]"></div>
                                    </div>
                                    {/* FinTrack Logo */}
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 z-10">
                                        <div className="w-12 h-12 bg-slate-800 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-slate-900 shrink-0">
                                            <span className="material-symbols-outlined text-2xl">paid</span>
                                        </div>
                                    </div>
                                    {/* Sync Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center z-0">
                                        <div className="w-8 h-8 rounded-full bg-sky-500/10 flex items-center justify-center animate-pulse">
                                            <span className="material-symbols-outlined text-sky-500 text-sm">sync_alt</span>
                                        </div>
                                    </div>
                                    {/* Bank Logo */}
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 z-10">
                                        <div className={`w-12 h-12 ${selectedBank.color} rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg`}>
                                            <span className="font-display font-bold text-lg">{selectedBank.logo}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h2 className="text-2xl font-display font-bold text-slate-800 dark:text-white">Conectando ao {selectedBank.name}...</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                                        Estabelecendo uma conexão segura e criptografada para sincronizar seus dados financeiros.
                                    </p>
                                </div>

                                {/* Permissions List */}
                                <div className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-700/50 text-left">
                                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Permissões Solicitadas</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-xs font-bold">check</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Ler saldo da conta</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">Ver saldo atualizado.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-xs font-bold">check</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Ler histórico de transações</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">Importação dos últimos 90 dias.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-slate-400 text-sm">verified_user</span>
                                <p className="text-[10px] text-slate-400">Criptografia de ponta a ponta.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 3: SUCCESS */}
                {step === "success" && (
                    <div className="w-full max-w-xl mx-auto animate-in fade-in zoom-in duration-500">
                        <div className="glassmorphism bg-white/60 dark:bg-slate-900/50 p-8 sm:p-12 rounded-3xl w-full shadow-xl flex flex-col items-center text-center relative overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-slate-500/10 dark:bg-slate-400/10 rounded-full blur-3xl"></div>

                            <div className="w-20 h-20 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center mb-6 shadow-lg shadow-slate-900/20 z-10">
                                <span className="material-symbols-outlined text-4xl">check</span>
                            </div>

                            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2 z-10">Cadastro Concluído!</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8 z-10">
                                Sua conta foi registrada com sucesso e já está disponível para visualização.
                            </p>

                            {selectedBank && (
                                <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800/80 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 w-full max-w-sm mb-8 z-10">
                                    <div className={`w-12 h-12 rounded-full ${selectedBank.color} flex items-center justify-center shrink-0`}>
                                        <span className="font-display font-bold text-white text-lg">{selectedBank.logo}</span>
                                    </div>
                                    <div className="text-left flex-1">
                                        <p className="font-bold text-slate-800 dark:text-white text-lg">{selectedBank.name}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Conta Corrente</p>
                                    </div>
                                    <div className="h-8 w-8 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-lg">verified</span>
                                    </div>
                                </div>
                            )}

                            <div className="w-full max-w-md z-10 space-y-3">
                                <Link to="/dashboard" className="step-card w-full flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all group hover:border-sky-500/30 hover:-translate-y-1 hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-sky-500 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">dashboard</span>
                                        </div>
                                        <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Ir para o Dashboard</span>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-300 group-hover:text-sky-500 transition-colors">arrow_forward_ios</span>
                                </Link>
                                <button onClick={() => setStep("selection")} className="step-card w-full flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all group hover:border-sky-500/30 hover:-translate-y-1 hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700/30 text-slate-500 dark:text-slate-400 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-700 group-hover:text-slate-700 dark:group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">add</span>
                                        </div>
                                        <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Adicionar Nova Conta</span>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-300 group-hover:text-slate-500 transition-colors">arrow_forward_ios</span>
                                </button>
                            </div>

                            <p className="mt-8 text-xs text-slate-400 dark:text-slate-500 text-center">FinTrack Desktop App v2.4.0</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
