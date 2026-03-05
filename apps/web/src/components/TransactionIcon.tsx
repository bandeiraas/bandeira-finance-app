import {
    Banknote,
    ShoppingCart,
    Zap,
    Car,
    UtensilsCrossed,
    ArrowRightLeft,
    ShoppingBag
} from "lucide-react";

interface TransactionIconProps {
    categoryName?: string | null;
    type: string;
    variant?: "simple" | "detailed";
}

export function TransactionIcon({ categoryName, type, variant = "simple" }: TransactionIconProps) {
    const cat = (categoryName ?? "").toLowerCase();
    const isIncome = type === "income";

    if (variant === "simple") {
        if (isIncome) {
            return (
                <div className="w-11 h-11 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center shadow-sm">
                    <Banknote size={22} />
                </div>
            );
        }

        const iconClass = "w-11 h-11 rounded-xl flex items-center justify-center shadow-sm";

        if (cat.includes("aliment") || cat.includes("supermercado"))
            return (
                <div className={`${iconClass} bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400`}>
                    <ShoppingCart size={22} />
                </div>
            );
        if (cat.includes("energia") || cat.includes("conta"))
            return (
                <div className={`${iconClass} bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400`}>
                    <Zap size={22} />
                </div>
            );
        if (cat.includes("transporte") || cat.includes("uber") || cat.includes("carro"))
            return (
                <div className={`${iconClass} bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400`}>
                    <Car size={22} />
                </div>
            );
        if (cat.includes("lazer") || cat.includes("restaurant"))
            return (
                <div className={`${iconClass} bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400`}>
                    <UtensilsCrossed size={22} />
                </div>
            );

        return (
            <div className={`${iconClass} bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400`}>
                <Banknote size={22} />
            </div>
        );
    } else {
        // detailed variant used in AccountDetail.tsx
        if (isIncome) {
            return (
                <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                    <ArrowRightLeft size={22} className="-rotate-90" />
                </div>
            );
        }

        const iconClass =
            "w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-[var(--bank-accent)] group-hover:text-white transition-colors";

        if (cat.includes("aliment") || cat.includes("supermercado") || cat.includes("compras"))
            return <div className={iconClass}><ShoppingBag size={22} /></div>;
        if (cat.includes("energia") || cat.includes("conta"))
            return <div className={iconClass}><Zap size={22} /></div>;
        if (cat.includes("transporte") || cat.includes("uber") || cat.includes("carro"))
            return <div className={iconClass}><Zap size={22} /></div>;
        if (cat.includes("lazer") || cat.includes("restaurant"))
            return <div className={iconClass}><ShoppingBag size={22} /></div>;

        return <div className={iconClass}><ShoppingBag size={22} /></div>;
    }
}
