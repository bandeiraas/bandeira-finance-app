import { getBankConfig } from "../shared/constants/banks";

interface BankIconProps {
    name: string;
    size?: "md" | "lg";
    bankHex?: string;
    className?: string;
}

export function BankIcon({ name, size = "md", bankHex, className = "" }: BankIconProps) {
    const config = getBankConfig(name);
    const isLg = size === "lg";
    const hex = bankHex ?? config.hex;

    return (
        <div
            className={`
                ${isLg ? "w-12 h-12 rounded-2xl text-2xl" : "w-10 h-10 rounded-xl text-xs"}
                flex items-center justify-center shrink-0 shadow-lg font-display font-bold
                ${config.italic ? "italic" : "uppercase"}
                ${config.text === "black" ? "text-slate-900" : "text-white"}
                ${className}
            `.trim()}
            style={{
                backgroundColor: hex,
                boxShadow: `0 10px 40px ${hex}40`
            }}
        >
            {config.label}
        </div>
    );
}
