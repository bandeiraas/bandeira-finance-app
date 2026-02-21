import { cn } from "@lib/utils";
import { BANK_COLORS_DETAIL } from "../constants";

interface BankIconProps {
    name: string;
    size?: "md" | "lg";
    bankHex?: string;
}

export function BankIcon({ name, size = "md", bankHex }: BankIconProps) {
    const lower = name.toLowerCase().trim();
    const key = Object.keys(BANK_COLORS_DETAIL).find((k) => lower.includes(k));
    const config = key ? BANK_COLORS_DETAIL[key] : { label: name.slice(0, 2).toUpperCase(), italic: false };
    const isLg = size === "lg";
    const hex = bankHex ?? "#64748b";

    return (
        <div
            className={cn(
                isLg ? "w-12 h-12 rounded-2xl text-2xl" : "w-10 h-10 rounded-xl text-xs",
                "flex items-center justify-center text-white shadow-lg font-display font-bold",
                config.italic ? "italic" : "uppercase"
            )}
            style={{ backgroundColor: hex, boxShadow: `0 10px 40px ${hex}40` }}
        >
            {config.label}
        </div>
    );
}
