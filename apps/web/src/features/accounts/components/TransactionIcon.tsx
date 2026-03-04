import { Banknote, ShoppingCart, Zap, Car, UtensilsCrossed, ArrowRightLeft, ShoppingBag } from "lucide-react";

interface TransactionIconProps {
    categoryName?: string | null;
    type: string;
    /** "default" = Accounts list (w-11), "detail" = AccountDetail (w-12, group-hover) */
    variant?: "default" | "detail";
}

export function TransactionIcon({ categoryName, type, variant = "default" }: TransactionIconProps) {
    const cat = (categoryName ?? "").toLowerCase();
    const isIncome = type === "income";
    const isDetail = variant === "detail";
    const sizeClass = isDetail ? "w-12 h-12 rounded-2xl" : "w-11 h-11 rounded-xl";

    if (isIncome) {
        if (isDetail) {
            return (
                <div className={`${sizeClass} bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400`}>
                    <ArrowRightLeft size={22} className="-rotate-90" />
                </div>
            );
        }
        return (
            <div className={`${sizeClass} bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm`}>
                <Banknote size={22} />
            </div>
        );
    }

    const detailExpenseClass = "bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-[var(--bank-accent)] group-hover:text-white transition-colors";

    if (cat.includes("aliment") || cat.includes("supermercado") || (isDetail && cat.includes("compras"))) {
        if (isDetail) return <div className={`${sizeClass} ${detailExpenseClass}`}><ShoppingBag size={22} /></div>;
        return (
            <div className={`${sizeClass} bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center shadow-sm`}>
                <ShoppingCart size={22} />
            </div>
        );
    }
    if (cat.includes("energia") || cat.includes("conta")) {
        if (isDetail) return <div className={`${sizeClass} ${detailExpenseClass}`}><Zap size={22} /></div>;
        return (
            <div className={`${sizeClass} bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm`}>
                <Zap size={22} />
            </div>
        );
    }
    if (cat.includes("transporte") || cat.includes("uber") || cat.includes("carro")) {
        if (isDetail) return <div className={`${sizeClass} ${detailExpenseClass}`}><Zap size={22} /></div>;
        return (
            <div className={`${sizeClass} bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-sm`}>
                <Car size={22} />
            </div>
        );
    }
    if (cat.includes("lazer") || cat.includes("restaurant")) {
        if (isDetail) return <div className={`${sizeClass} ${detailExpenseClass}`}><ShoppingBag size={22} /></div>;
        return (
            <div className={`${sizeClass} bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shadow-sm`}>
                <UtensilsCrossed size={22} />
            </div>
        );
    }

    if (isDetail) return <div className={`${sizeClass} ${detailExpenseClass}`}><ShoppingBag size={22} /></div>;
    return (
        <div className={`${sizeClass} bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shadow-sm`}>
            <Banknote size={22} />
        </div>
    );
}
