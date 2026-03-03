import type { LucideIcon } from "lucide-react";

export const ACCOUNT_TYPE_LABELS: Record<string, string> = {
    corrente: "Corrente",
    poupanca: "Poupança",
    investimento: "Investimentos",
    carteira: "Carteira",
};

export const BAR_HEIGHTS = [30, 45, 40, 65, 55, 85, 95] as const;

export const BANK_KEYS = ["nubank", "itau", "bradesco", "santander", "bb", "inter", "c6", "caixa"] as const;

export const BANK_HEX: Record<string, string> = {
    nubank: "#820ad1",
    itau: "#ec7000",
    bradesco: "#cc092f",
    santander: "#ec0000",
    bb: "#ffc629",
    inter: "#ff7a00",
    c6: "#6366f1",
    caixa: "#0066b3",
    default: "#0ea5e9",
};

export function getBankKey(bankName: string): (typeof BANK_KEYS)[number] | "default" {
    const lower = bankName.toLowerCase().trim();
    if (lower.includes("nubank")) return "nubank";
    if (lower.includes("itaú") || lower.includes("itau")) return "itau";
    if (lower.includes("bradesco")) return "bradesco";
    if (lower.includes("santander")) return "santander";
    if (lower.includes("banco do brasil") || lower.includes("bb ")) return "bb";
    if (lower.includes("inter")) return "inter";
    if (lower.includes("c6")) return "c6";
    if (lower.includes("caixa")) return "caixa";
    return "default";
}

export const BANK_COLORS_DETAIL: Record<string, { bg: string; label: string; italic?: boolean }> = {
    nubank: { bg: "bg-bank-nubank shadow-bank-nubank/40", label: "Nu" },
    itaú: { bg: "bg-bank-itau shadow-bank-itau/40", label: "i", italic: true },
    itau: { bg: "bg-bank-itau shadow-bank-itau/40", label: "i", italic: true },
    bradesco: { bg: "bg-bank-bradesco shadow-bank-bradesco/40", label: "Br" },
    santander: { bg: "bg-bank-santander shadow-bank-santander/40", label: "Sa" },
    "banco do brasil": { bg: "bg-bank-bb shadow-bank-bb/40", label: "BB" },
    inter: { bg: "bg-bank-inter shadow-bank-inter/40", label: "In" },
    "c6 bank": { bg: "bg-bank-c6 shadow-bank-c6/40", label: "C6" },
    c6: { bg: "bg-bank-c6 shadow-bank-c6/40", label: "C6" },
    caixa: { bg: "bg-bank-caixa shadow-bank-caixa/40", label: "Ca" },
};

export const BANK_COLORS: Record<string, { bg: string; text: "white" | "black"; label: string; cardStyle?: string }> = {
    nubank: { bg: "bg-[#820ad1] shadow-[#820ad1]/30", text: "white", label: "Nu", cardStyle: "purple" },
    itaú: { bg: "bg-orange-500 shadow-orange-500/30", text: "white", label: "It", cardStyle: "pink" },
    itau: { bg: "bg-orange-500 shadow-orange-500/30", text: "white", label: "It", cardStyle: "pink" },
    bradesco: { bg: "bg-red-600 shadow-red-500/30", text: "white", label: "Br", cardStyle: "pink" },
    santander: { bg: "bg-red-600 shadow-red-500/30", text: "white", label: "Sa", cardStyle: "pink" },
    "banco do brasil": { bg: "bg-yellow-400 shadow-yellow-400/30", text: "black", label: "BB", cardStyle: "green" },
    bb: { bg: "bg-yellow-400 shadow-yellow-400/30", text: "black", label: "BB", cardStyle: "green" },
    inter: { bg: "bg-orange-500 shadow-orange-500/30", text: "white", label: "In", cardStyle: "pink" },
    "c6 bank": { bg: "bg-slate-900 shadow-slate-900/30", text: "white", label: "C6", cardStyle: "purple" },
    c6: { bg: "bg-slate-900 shadow-slate-900/30", text: "white", label: "C6", cardStyle: "purple" },
    caixa: { bg: "bg-blue-600 shadow-blue-500/30", text: "white", label: "Ca", cardStyle: "black" },
    default: { bg: "bg-slate-600 shadow-slate-500/30", text: "white", label: "??", cardStyle: "black" },
};

export function getSuggestedCardStyle(bankKey: string): string {
    return BANK_COLORS[bankKey]?.cardStyle ?? BANK_COLORS.default.cardStyle ?? "black";
}

/** Gera 4 variações da cor do banco (mais clara → mais escura) para a bolha de sugestão. */
export function getBankColorVariations(hex: string): [string, string, string, string] {
    const h = hex.replace(/^#/, "");
    if (h.length !== 6) return [hex, hex, hex, hex];
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    const toHex = (x: number) =>
        Math.round(Math.min(255, Math.max(0, x)))
            .toString(16)
            .padStart(2, "0");
    const adjust = (amount: number) =>
        `#${toHex(r + amount)}${toHex(g + amount)}${toHex(b + amount)}`;
    return [adjust(50), adjust(20), hex, adjust(-40)];
}

/** Escurece um hex para usar como fim do gradiente do cartão. */
export function darkenHex(hex: string, percent: number): string {
    const h = hex.replace(/^#/, "");
    if (h.length !== 6) return hex;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    const factor = 1 - percent / 100;
    const toHex = (x: number) =>
        Math.round(Math.min(255, Math.max(0, x * factor)))
            .toString(16)
            .padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export type MockBill = {
    name: string;
    due: string;
    date: string;
    amount: number;
    icon: LucideIcon;
    color: "red" | "blue" | "green" | "slate";
};

export type MockInvestment = {
    name: string;
    return: string;
    value: number;
    icon: LucideIcon;
    color: string;
};
