import { cn } from "@lib/utils";
import { BANK_COLORS } from "../constants";

interface AccountIconProps {
    name: string;
}

export function AccountIcon({ name }: AccountIconProps) {
    const lower = name.toLowerCase().trim();
    const key = Object.keys(BANK_COLORS).find((k) => lower.includes(k));
    const config = key ? BANK_COLORS[key] : { bg: "bg-slate-600 shadow-slate-500/30", text: "white" as const, label: name.slice(0, 2).toUpperCase() };
    const { bg, text, label } = config;

    return (
        <div
            className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg font-display font-bold text-xs uppercase", bg, text === "black" ? "text-slate-900" : "text-white")}
        >
            {label}
        </div>
    );
}
