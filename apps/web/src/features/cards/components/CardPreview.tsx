import { SmartphoneNfc } from "lucide-react";
import { getBankKey, getBankColorVariations, darkenHex, BANK_HEX, BANK_COLORS } from "@features/accounts/constants";
import { CardBrandLogo } from "./CardBrandLogo";
import { formatCurrency } from "@shared/utils/formatCurrency";
import { cn } from "@lib/utils";
import type { Card } from "@bandeira/shared";
import type { Account } from "@bandeira/shared";

type CardPreviewProps = {
    card: Card;
    account: Account | null | undefined;
    userName?: string | null;
    variationIndex?: number;
    className?: string;
    as?: "div" | "button";
    onClick?: () => void;
    children?: React.ReactNode;
};

/** Preview do cartão igual ao AddCard: banco, bandeira, limite, dígitos, titular. Gradiente da cor do banco. */
export function CardPreview({
    card,
    account,
    userName,
    variationIndex = 2,
    className,
    as: Wrapper = "div",
    onClick,
    children,
}: CardPreviewProps) {
    const bankKey = account ? getBankKey(account.bank_name) : "default";
    const bankHex = BANK_HEX[bankKey] ?? BANK_HEX.default;
    const bankConfig = BANK_COLORS[bankKey] ?? BANK_COLORS.default;
    const colorVariations = getBankColorVariations(bankHex);
    const selectedColor = card.card_color ?? colorVariations[Math.min(variationIndex ?? 2, 3)];
    const gradientStyle = {
        background: `linear-gradient(to bottom right, ${selectedColor}, ${darkenHex(selectedColor, 25)})`,
    };

    return (
        <Wrapper
            onClick={onClick}
            className={cn(
                "relative aspect-[1.58/1] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl p-5 text-white flex flex-col justify-between text-left",
                Wrapper === "button" && "cursor-pointer",
                className
            )}
            style={gradientStyle}
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
                        {account?.bank_name ?? "Banco"}
                    </span>
                </div>
                <SmartphoneNfc size={18} className="opacity-60" />
            </div>
            <div className="space-y-2">
                <p className="text-[10px] text-white/60 uppercase tracking-wider">
                    Limite {formatCurrency(Number(card.credit_limit || 0))}
                </p>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-6 rounded bg-white/10 border border-white/20" />
                    <span className="font-mono text-sm tracking-[0.15em]">•••• {card.last_four || "0000"}</span>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[9px] text-white/50 uppercase tracking-wider mb-0.5">Titular</p>
                        <p className="text-xs font-medium uppercase tracking-wide">
                            {(card.card_name || userName || "Nome").toUpperCase()}
                        </p>
                    </div>
                    <CardBrandLogo slug={card.brand || "mastercard"} size="md" />
                </div>
            </div>
            {children}
        </Wrapper>
    );
}
