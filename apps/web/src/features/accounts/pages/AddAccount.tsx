import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Wallet, Plus, Check, Search, AlertCircle, Loader2 } from "lucide-react";
import { useCreateAccount } from "@features/accounts/hooks/useAccounts";
import { parseBRL } from "@shared/utils/parseBRL";
import { cn } from "@lib/utils";

type Step = 1 | 2;

interface Bank {
    name: string;
    color: string;
    logo: React.ReactNode;
}

const BANKS: Bank[] = [
    { name: "Nubank", color: "bg-[#820ad1]", logo: "Nu" },
    { name: "Itaú", color: "bg-[#ec7000]", logo: <span className="italic">i</span> },
    { name: "Bradesco", color: "bg-[#cc092f]", logo: "B" },
    { name: "Santander", color: "bg-[#ec0000]", logo: "S" },
    { name: "Banco do Brasil", color: "bg-[#fbf404] text-blue-900", logo: "BB" },
    { name: "Inter", color: "bg-[#ff7a00]", logo: "Inter" },
    { name: "C6 Bank", color: "bg-[#111827]", logo: "C6" },
    { name: "Caixa", color: "bg-[#2563eb]", logo: "X" },
];

export default function AddAccount() {
    const navigate = useNavigate();
    const [step, setStep] = useState<Step>(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

    const [balance, setBalance] = useState("0,00");
    const [accountType, setAccountType] = useState("Conta Corrente");
    const [error, setError] = useState<string | null>(null);

    const createAccount = useCreateAccount();

    const filteredBanks = BANKS.filter((bank) =>
        bank.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectBank = (bank: Bank) => {
        setSelectedBank(bank);
        setStep(2);
        setError(null);
    };

    const handleManualSelect = () => {
        setSelectedBank({
            name: "Outro Banco",
            color: "bg-slate-800",
            logo: <Wallet size={20} />,
        });
        setStep(2);
        setError(null);
    };

    const handleManualSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBank) return;
        setError(null);

        try {
            const numericBalance = parseBRL(balance);

            await createAccount.mutateAsync({
                bankName: selectedBank.name === "Outro Banco" ? "Outro" : selectedBank.name,
                accountType,
                balance: numericBalance,
                color: selectedBank.color,
                isPrimary: false,
            });

            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Erro ao criar conta. Tente novamente.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
            <header className="px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
                <div className="flex items-center gap-4 max-w-lg mx-auto w-full">
                    {step === 1 ? (
                        <Link
                            to="/dashboard"
                            className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-400"
                        >
                            <ChevronLeft size={24} />
                        </Link>
                    ) : (
                        <button
                            onClick={() => setStep(1)}
                            className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-400"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}
                    <h1 className="text-lg font-display font-bold text-slate-800 dark:text-white">
                        {step === 1 ? "Adicionar Conta" : "Configurar Conta"}
                    </h1>
                </div>
            </header>

            <div className="flex-1 px-6 py-8">
                <div className="max-w-lg mx-auto space-y-8">
                    {step === 1 ? (
                        <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <div className="relative">
                                <Search
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                    size={20}
                                />
                                <input
                                    type="text"
                                    placeholder="Buscar instituição..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
                                    Instituições Populares
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    {filteredBanks.map((bank) => (
                                        <button
                                            key={bank.name}
                                            onClick={() => handleSelectBank(bank)}
                                            className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all group text-left shadow-sm hover:shadow-md"
                                        >
                                            <div
                                                className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-sm",
                                                    bank.color
                                                )}
                                            >
                                                {typeof bank.logo === "string" ? bank.logo : bank.logo}
                                            </div>
                                            <span className="font-medium text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors">
                                                {bank.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleManualSelect}
                                className="w-full py-4 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-medium hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                            >
                                <Plus size={20} />
                                Outra Instituição
                            </button>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleManualSubmit}
                            className="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300"
                        >
                            <div className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div
                                    className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-sm",
                                        selectedBank?.color
                                    )}
                                >
                                    {typeof selectedBank?.logo === "string"
                                        ? selectedBank?.logo
                                        : selectedBank?.logo}
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Instituição Selecionada
                                    </p>
                                    <p className="text-lg font-bold text-slate-800 dark:text-white">
                                        {selectedBank?.name}
                                    </p>
                                </div>
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                                    <AlertCircle size={16} />
                                    {error}
                                </div>
                            )}

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        Saldo Atual
                                    </label>
                                    <div className="relative group">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-lg">
                                            R$
                                        </span>
                                        <input
                                            type="text"
                                            value={balance}
                                            onChange={(e) => setBalance(e.target.value)}
                                            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-3xl font-display font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-slate-300 shadow-sm"
                                            placeholder="0,00"
                                            disabled={createAccount.isPending}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                        Tipo de Conta
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {["Conta Corrente", "Poupança", "Investimento", "Carteira"].map(
                                            (type) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => setAccountType(type)}
                                                    disabled={createAccount.isPending}
                                                    className={cn(
                                                        "p-3 rounded-xl border text-sm font-medium transition-all",
                                                        accountType === type
                                                            ? "border-primary bg-primary/5 text-primary"
                                                            : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-primary/30"
                                                    )}
                                                >
                                                    {type}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={createAccount.isPending}
                                className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-display font-bold rounded-2xl shadow-lg shadow-primary/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {createAccount.isPending ? (
                                    <>
                                        <Loader2 size={24} className="animate-spin" />
                                        Criando Conta...
                                    </>
                                ) : (
                                    <>
                                        <Check size={24} />
                                        Confirmar Criação
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
