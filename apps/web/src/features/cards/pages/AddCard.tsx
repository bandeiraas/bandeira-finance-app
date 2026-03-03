import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronDown, Loader2, AlertCircle, PlusCircle, SmartphoneNfc, Sparkles } from "lucide-react";
import { useCreateCard } from "@features/cards/hooks/useCards";
import { useAccounts } from "@features/accounts/hooks/useAccounts";
import { useAuth } from "@features/auth/providers/AuthProvider";
import {
    getBankKey,
    getBankColorVariations,
    darkenHex,
    BANK_HEX,
    BANK_COLORS,
} from "@features/accounts/constants";
import UserMenu from "@components/UserMenu";
import { CardBrandLogo } from "@features/cards/components/CardBrandLogo";
import { CARD_BRANDS } from "@features/cards/constants";
import { ACCOUNT_TYPE_LABELS } from "@features/accounts/constants";
import { cn } from "@lib/utils";

export default function AddCard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { data: accounts, isLoading: accountsLoading } = useAccounts();

    const [accountId, setAccountId] = useState<string>("");
    const [colorVariationIndex, setColorVariationIndex] = useState(2); // 0–3, 2 = base da cor do banco
    const [brand, setBrand] = useState("mastercard");

    // Derived state for the active account to avoid `useEffect` rendering loops
    const activeAccountId = accountId || (accounts && accounts.length > 0 ? accounts[0].id : "");
    const [lastFour, setLastFour] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cardName, setCardName] = useState("");
    const [creditLimit, setCreditLimit] = useState(5000);
    const [closingDay, setClosingDay] = useState(5);
    const [dueDay, setDueDay] = useState(10);
    const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
    const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createCard = useCreateCard();
    const selectedAccount = accounts?.find((a) => a.id === activeAccountId);
    const bankKey = selectedAccount ? getBankKey(selectedAccount.bank_name) : "default";
    const bankHex = BANK_HEX[bankKey] ?? BANK_HEX.default;
    const bankConfig = BANK_COLORS[bankKey] ?? BANK_COLORS.default;
    const colorVariations = getBankColorVariations(bankHex);
    const selectedColor = colorVariations[colorVariationIndex];
    const cardGradientStyle = {
        background: `linear-gradient(to bottom right, ${selectedColor}, ${darkenHex(selectedColor, 25)})`,
    };

    const formatExpiry = (val: string) => {
        const v = val.replace(/\D/g, "").slice(0, 4);
        if (v.length >= 2) return `${v.slice(0, 2)}/${v.slice(2)}`;
        return v;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!activeAccountId) {
            setError("Selecione uma conta bancária.");
            return;
        }
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
                card_color: selectedColor,
                account_id: activeAccountId,
                due_day: dueDay,
                closing_day: closingDay,
            });
            navigate("/cards");
        } catch {
            setError("Erro ao cadastrar cartão. Tente novamente.");
        }
    };

    const hasAccounts = accounts && accounts.length > 0;

    if (accountsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        );
    }

    if (!hasAccounts) {
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
                <div className="glassmorphism rounded-3xl p-12 text-center max-w-md mx-auto">
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Para cadastrar um cartão, você precisa ter pelo menos uma conta bancária.
                    </p>
                    <Link
                        to="/accounts/add"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition-opacity"
                    >
                        Cadastrar conta agora
                    </Link>
                </div>
            </div>
        );
    }

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
                <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] pt-24">
                    <div className="w-full max-w-md relative -mt-24 group">
                        {/* Bolha Sugestão de Estilo – aparece só no hover do cartão */}
                        <div className="absolute -top-20 left-1/2 w-[90%] z-20 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 animate-float">
                            <div className="p-3 rounded-2xl shadow-xl border border-white/40 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shrink-0"
                                        style={{ backgroundColor: selectedColor }}
                                    >
                                        <Sparkles size={14} className="text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                                            Sugestão de Estilo ({selectedAccount?.bank_name ?? "Banco"})
                                        </p>
                                        <div className="flex items-center gap-2">
                                            {colorVariations.map((hex, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => setColorVariationIndex(i)}
                                                    className={cn(
                                                        "w-8 h-8 rounded-full border-2 transition-all shrink-0",
                                                        colorVariationIndex === i
                                                            ? "border-primary shadow-lg ring-2 ring-primary/30 ring-offset-2 dark:ring-offset-slate-900"
                                                            : "border-transparent hover:border-slate-300"
                                                    )}
                                                    style={{ backgroundColor: hex }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/80 dark:bg-slate-800/80 rotate-45 border-r border-b border-white/40 dark:border-slate-700/50" />
                        </div>

                        {/* Preview do Cartão – mesmas proporções do CardPreview */}
                        <div
                            className="relative aspect-[1.58/1] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl p-5 text-white flex flex-col justify-between"
                            style={cardGradientStyle}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                                    <div
                                        className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold"
                                        style={{
                                            backgroundColor: bankHex,
                                            color: bankConfig.text === "black" ? "#0f172a" : "#fff",
                                        }}
                                    >
                                        {bankConfig.label}
                                    </div>
                                    <span className="font-semibold text-[10px] uppercase tracking-wide">
                                        {selectedAccount?.bank_name ?? "Banco"}
                                    </span>
                                </div>
                                <SmartphoneNfc size={18} className="opacity-60" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] text-white/60 uppercase tracking-wider">
                                    Limite Inicial{" "}
                                    {creditLimit.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    })}
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-6 rounded bg-white/10 border border-white/20" />
                                    <span className="font-mono text-sm tracking-[0.15em]">
                                        •••• {lastFour.padEnd(4, "0").slice(0, 4) || "0000"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[9px] text-white/50 uppercase tracking-wider mb-0.5">
                                            Titular
                                        </p>
                                        <p className="text-xs font-medium uppercase tracking-wide">
                                            {(cardName || user?.fullName || "Nome").toUpperCase()}
                                        </p>
                                    </div>
                                    <CardBrandLogo slug={brand} size="md" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full xl:w-[450px]">
                    <form
                        onSubmit={handleSubmit}
                        className="glassmorphism rounded-3xl p-6 lg:p-8 space-y-10 overflow-y-auto max-h-[85vh] hide-scrollbar"
                    >
                        {error && (
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        {/* Seção 1: Conta Bancária */}
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                                Selecione sua Conta Bancária
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                                    className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-left hover:border-primary/50 transition-colors"
                                >
                                    {selectedAccount ? (
                                        <>
                                            {(() => {
                                                const bankKey = getBankKey(selectedAccount.bank_name);
                                                const config = BANK_COLORS[bankKey] ?? BANK_COLORS.default;
                                                const hex = BANK_HEX[bankKey] ?? BANK_HEX.default;
                                                return (
                                                    <div
                                                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-lg"
                                                        style={{
                                                            backgroundColor: hex,
                                                            color: config.text === "black" ? "#0f172a" : "#fff",
                                                        }}
                                                    >
                                                        {config.label}
                                                    </div>
                                                );
                                            })()}
                                            <div className="flex-1">
                                                <p className="font-semibold text-slate-800 dark:text-white">
                                                    {selectedAccount.bank_name}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {ACCOUNT_TYPE_LABELS[selectedAccount.account_type]} •{" "}
                                                    {Number(selectedAccount.balance || 0).toLocaleString("pt-BR", {
                                                        style: "currency",
                                                        currency: "BRL",
                                                    })}
                                                </p>
                                            </div>
                                            <ChevronDown size={20} className="text-slate-400" />
                                        </>
                                    ) : (
                                        <span className="text-slate-500">Selecione uma conta</span>
                                    )}
                                </button>
                                {accountDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl z-20 max-h-48 overflow-y-auto">
                                        {accounts?.map((a) => {
                                            const bankKey = getBankKey(a.bank_name);
                                            const config = BANK_COLORS[bankKey] ?? BANK_COLORS.default;
                                            const hex = BANK_HEX[bankKey] ?? BANK_HEX.default;
                                            return (
                                            <button
                                                key={a.id}
                                                type="button"
                                                onClick={() => {
                                                    setAccountId(a.id);
                                                    setColorVariationIndex(2); // base da cor do banco ao trocar conta
                                                    setAccountDropdownOpen(false);
                                                }}
                                                className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-left"
                                            >
                                                <div
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-lg"
                                                    style={{
                                                        backgroundColor: hex,
                                                        color: config.text === "black" ? "#0f172a" : "#fff",
                                                    }}
                                                >
                                                    {config.label}
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{a.bank_name}</p>
                                                    <p className="text-xs text-slate-500">
                                                        {ACCOUNT_TYPE_LABELS[a.account_type]} •{" "}
                                                        {Number(a.balance || 0).toLocaleString("pt-BR", {
                                                            style: "currency",
                                                            currency: "BRL",
                                                        })}
                                                    </p>
                                                </div>
                                            </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                            <Link
                                to="/accounts/add"
                                className="mt-3 w-full p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2 text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
                            >
                                <PlusCircle size={20} />
                                <span className="text-xs font-bold uppercase tracking-widest">
                                    Nova Conta
                                </span>
                            </Link>
                        </div>

                        {/* Seção 2: Detalhes do Cartão */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                                Detalhes do Cartão
                            </h3>

                            <div>
                                <div className="flex justify-between items-center mb-2">
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
                                <div className="flex justify-between mt-1">
                                    <span className="text-[10px] text-slate-400">R$ 1k</span>
                                    <span className="text-[10px] text-slate-400">R$ 25k</span>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                                    Bandeira
                                </label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
                                        className="w-full flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-left"
                                    >
                                        <CardBrandLogo slug={brand} />
                                        <span className="text-slate-800 dark:text-white font-medium">
                                            {CARD_BRANDS.find((b) => b.slug === brand)?.label ?? brand}
                                        </span>
                                        <ChevronDown size={20} className="text-slate-400" />
                                    </button>
                                    {brandDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl z-20 max-h-64 overflow-y-auto">
                                            {CARD_BRANDS.map((b) => (
                                                <button
                                                    key={b.slug}
                                                    type="button"
                                                    onClick={() => {
                                                        setBrand(b.slug);
                                                        setBrandDropdownOpen(false);
                                                    }}
                                                    className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-left"
                                                >
                                                    <CardBrandLogo slug={b.slug} size="sm" />
                                                    <span>{b.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

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

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block"
                                        title="Até que dia as compras entram na fatura atual"
                                    >
                                        Dia de Fechamento
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={31}
                                        value={closingDay}
                                        onChange={(e) => setClosingDay(Number(e.target.value) || 5)}
                                        placeholder="5"
                                        className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block"
                                        title="Data limite para pagamento da fatura"
                                    >
                                        Dia de Vencimento
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={31}
                                        value={dueDay}
                                        onChange={(e) => setDueDay(Number(e.target.value) || 10)}
                                        placeholder="10"
                                        className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                                    />
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
                                Ao cadastrar, você declara que as informações acima são verdadeiras e o cartão
                                está vinculado à conta selecionada.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
