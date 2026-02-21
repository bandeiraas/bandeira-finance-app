import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Loader2, AlertCircle, Palette, Info, SmartphoneNfc } from "lucide-react";
import { useCreateCard } from "@features/cards/hooks/useCards";
import { useAuth } from "@features/auth/providers/AuthProvider";
import UserMenu from "@components/UserMenu";
import { cn } from "@lib/utils";

const CARD_STYLES = [
    { id: "black", label: "Preto", class: "from-[#1a1a1a] via-[#333] to-[#000]" },
    { id: "purple", label: "Roxo", class: "from-indigo-600 to-purple-700" },
    { id: "green", label: "Verde", class: "from-emerald-500 to-teal-700" },
    { id: "pink", label: "Rosa", class: "from-pink-500 to-rose-600" },
] as const;

const BRANDS = [
    { id: "Mastercard", type: "mastercard" as const },
    { id: "Visa", type: "visa" as const },
    { id: "Amex", type: "amex" as const },
];

export default function AddCard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [cardStyle, setCardStyle] = useState<(typeof CARD_STYLES)[number]["id"]>("black");
    const [brand, setBrand] = useState("Mastercard");
    const [lastFour, setLastFour] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cardName, setCardName] = useState("");
    const [creditLimit, setCreditLimit] = useState(5000);
    const [error, setError] = useState<string | null>(null);

    const createCard = useCreateCard();
    const styleClass = CARD_STYLES.find((s) => s.id === cardStyle)?.class ?? CARD_STYLES[0].class;

    const formatExpiry = (val: string) => {
        const v = val.replace(/\D/g, "").slice(0, 4);
        if (v.length >= 2) return `${v.slice(0, 2)}/${v.slice(2)}`;
        return v;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (creditLimit <= 0) {
            setError("O limite do cartão deve ser maior que zero.");
            return;
        }
        if (lastFour.length !== 4 || !/^\d{4}$/.test(lastFour)) {
            setError("Informe os 4 últimos dígitos do cartão.");
            return;
        }
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
            setError("Data de vencimento inválida. Use MM/AA.");
            return;
        }
        if (!cardName.trim()) {
            setError("Informe o nome do cartão.");
            return;
        }

        try {
            await createCard.mutateAsync({
                brand,
                last_four: lastFour,
                expiry,
                card_name: cardName.trim(),
                credit_limit: creditLimit,
            });
            navigate("/cards");
        } catch {
            setError("Erro ao cadastrar cartão. Tente novamente.");
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        to="/cards"
                        className="w-10 h-10 flex items-center justify-center glass-card rounded-xl text-slate-600 dark:text-slate-300"
                    >
                        <ChevronLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">
                            Novo Cartão
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            Personalize sua experiência financeira
                        </p>
                    </div>
                </div>
                <UserMenu />
            </header>

            <div className="flex flex-col xl:flex-row gap-8 flex-1">
                <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-full max-w-md">
                        <div
                            className={cn(
                                "relative aspect-[1.58/1] w-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br p-8 text-white flex flex-col justify-between",
                                styleClass
                            )}
                        >
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <span className="text-xs font-bold bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 inline-block tracking-widest uppercase">
                                        BLACK EDITION
                                    </span>
                                    <p className="text-[10px] text-white/50 font-medium ml-1">Infinite Class</p>
                                </div>
                                <SmartphoneNfc className="text-2xl text-white/60" size={28} />
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-tr from-yellow-500/30 to-yellow-200/30" />
                                    </div>
                                    <span className="font-mono text-xl tracking-[0.2em]">
                                        •••• •••• •••• {lastFour.padEnd(4, "0").slice(0, 4) || "0000"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
                                            Titular do Cartão
                                        </p>
                                        <p className="text-lg font-medium tracking-wide uppercase">
                                            {(cardName || user?.fullName || "Usuário").toUpperCase()}
                                        </p>
                                    </div>
                                    <div className="flex -space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-[#EB001B]/90" />
                                        <div className="w-10 h-10 rounded-full bg-[#F79E1B]/90" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 flex justify-around items-center">
                            <div className="text-center">
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">
                                    Limite Inicial
                                </p>
                                <p className="text-xl font-bold text-slate-800 dark:text-white">
                                    {creditLimit.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    })}
                                </p>
                            </div>
                            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
                            <div className="text-center">
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">
                                    Anuidade
                                </p>
                                <p className="text-xl font-bold text-primary">Grátis</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full xl:w-[450px] space-y-6">
                    <form onSubmit={handleSubmit} className="glassmorphism rounded-3xl p-6 lg:p-8 space-y-8">
                        {error && (
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        <div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                                <Palette size={20} className="text-primary" />
                                Personalizar Design
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 block">
                                        Estilo do Cartão
                                    </label>
                                    <div className="grid grid-cols-4 gap-3">
                                        {CARD_STYLES.map((s) => (
                                            <button
                                                key={s.id}
                                                type="button"
                                                onClick={() => setCardStyle(s.id)}
                                                className={cn(
                                                    "aspect-square rounded-xl bg-gradient-to-br border-2 transition-all",
                                                    s.class,
                                                    cardStyle === s.id
                                                        ? "border-primary shadow-lg"
                                                        : "border-transparent hover:border-slate-300"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            Limite de Crédito
                                        </label>
                                        <span className="text-xs font-bold text-primary">
                                            {creditLimit.toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            })}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min={1000}
                                        max={25000}
                                        step={500}
                                        value={creditLimit}
                                        onChange={(e) => setCreditLimit(Number(e.target.value))}
                                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:dark:border-slate-800 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
                                    />
                                    <div className="flex justify-between mt-2">
                                        <span className="text-[10px] text-slate-400">R$ 1k</span>
                                        <span className="text-[10px] text-slate-400">R$ 25k</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                                <Info size={20} className="text-primary" />
                                Detalhes do Cartão
                            </h3>
                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                                    Bandeira
                                </label>
                                <div className="flex gap-4 items-center">
                                    {BRANDS.map((b) => (
                                        <button
                                            key={b.id}
                                            type="button"
                                            onClick={() => setBrand(b.id)}
                                            className={cn(
                                                "flex-1 p-2 rounded-xl glass-card flex justify-center items-center border-2 transition-all min-h-[44px]",
                                                brand === b.id ? "border-primary" : "border-transparent hover:border-slate-300"
                                            )}
                                        >
                                            {b.type === "mastercard" ? (
                                                <div className="flex -space-x-2">
                                                    <div className="w-8 h-8 rounded-full bg-[#EB001B]/90" />
                                                    <div className="w-8 h-8 rounded-full bg-[#F79E1B]/90" />
                                                </div>
                                            ) : b.type === "visa" ? (
                                                <div className="w-10 h-6 bg-blue-700 rounded-sm flex items-center justify-center italic font-bold text-white text-[10px]">
                                                    VISA
                                                </div>
                                            ) : (
                                                <div className="w-10 h-6 bg-sky-500 rounded-sm flex items-center justify-center italic font-bold text-white text-[8px] leading-tight text-center">
                                                    AMEX
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">
                                        Nome no Cartão
                                    </label>
                                    <input
                                        type="text"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                        placeholder={user?.fullName?.toUpperCase() || "SEU NOME"}
                                        maxLength={50}
                                        className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">
                                            4 Últimos Dígitos
                                        </label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={4}
                                            value={lastFour}
                                            onChange={(e) =>
                                                setLastFour(e.target.value.replace(/\D/g, "").slice(0, 4))
                                            }
                                            placeholder="0000"
                                            className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white font-mono placeholder-slate-400 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">
                                            Vencimento (MM/AA)
                                        </label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={5}
                                            value={expiry}
                                            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                            placeholder="MM/AA"
                                            className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white font-mono placeholder-slate-400 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                            <button
                                type="submit"
                                disabled={createCard.isPending}
                                className="w-full bg-slate-800 dark:bg-white text-white dark:text-slate-900 py-4 rounded-2xl font-bold text-sm tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {createCard.isPending ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Cadastrando...
                                    </>
                                ) : (
                                    "CADASTRAR CARTÃO"
                                )}
                            </button>
                            <p className="text-[10px] text-center text-slate-400 mt-4 px-8">
                                Ao cadastrar, você declara que as informações acima são verdadeiras e pertencem a
                                você.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
