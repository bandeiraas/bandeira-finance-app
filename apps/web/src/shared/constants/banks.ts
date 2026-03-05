export const BANK_KEYS = ["nubank", "itau", "bradesco", "santander", "bb", "inter", "c6", "caixa"] as const;

export type BankKey = (typeof BANK_KEYS)[number] | "default";

export const BANK_HEX: Record<BankKey, string> = {
    nubank: "#820ad1",
    itau: "#ec7000",
    bradesco: "#cc092f",
    santander: "#ec0000",
    bb: "#ffc629",
    inter: "#ff7a00",
    c6: "#6366f1",
    caixa: "#0066b3",
    default: "#64748b",
};

export interface BankConfig {
    bg: string;
    text: "white" | "black";
    label: string;
    italic?: boolean;
    hex: string;
}

export const BANK_CONFIGS: Record<string, BankConfig> = {
    nubank: { bg: "bg-bank-nubank shadow-bank-nubank/30", text: "white", label: "Nu", hex: "#820ad1" },
    itaú: { bg: "bg-bank-itau shadow-bank-itau/30", text: "white", label: "i", italic: true, hex: "#ec7000" },
    itau: { bg: "bg-bank-itau shadow-bank-itau/30", text: "white", label: "i", italic: true, hex: "#ec7000" },
    bradesco: { bg: "bg-bank-bradesco shadow-bank-bradesco/30", text: "white", label: "Br", hex: "#cc092f" },
    santander: { bg: "bg-bank-santander shadow-bank-santander/30", text: "white", label: "Sa", hex: "#ec0000" },
    "banco do brasil": { bg: "bg-bank-bb shadow-bank-bb/30", text: "black", label: "BB", hex: "#ffc629" },
    bb: { bg: "bg-bank-bb shadow-bank-bb/30", text: "black", label: "BB", hex: "#ffc629" },
    inter: { bg: "bg-bank-inter shadow-bank-inter/30", text: "white", label: "In", hex: "#ff7a00" },
    "c6 bank": { bg: "bg-bank-c6 shadow-bank-c6/30", text: "white", label: "C6", hex: "#6366f1" },
    c6: { bg: "bg-bank-c6 shadow-bank-c6/30", text: "white", label: "C6", hex: "#6366f1" },
    caixa: { bg: "bg-bank-caixa shadow-bank-caixa/30", text: "white", label: "Ca", hex: "#0066b3" },
};

export function getBankConfig(bankName: string): BankConfig {
    const lower = bankName.toLowerCase().trim();
    const key = Object.keys(BANK_CONFIGS).find((k) => lower.includes(k));

    if (key) {
        return BANK_CONFIGS[key];
    }

    return {
        bg: "bg-slate-600 shadow-slate-500/30",
        text: "white",
        label: bankName.slice(0, 2).toUpperCase(),
        hex: "#64748b",
        italic: false
    };
}

export function getBankKey(bankName: string): BankKey {
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
