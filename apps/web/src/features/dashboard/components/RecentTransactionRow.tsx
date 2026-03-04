import { cn } from "@lib/utils";
import { formatCurrency } from "@shared/utils/formatCurrency";
import { TransactionIcon } from "@features/accounts/components";
import type { Transaction } from "@bandeira/shared";

interface RecentTransactionRowProps {
    transaction: Transaction;
}

export function RecentTransactionRow({ transaction }: RecentTransactionRowProps) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors">
            <div className="flex items-center gap-3">
                <TransactionIcon
                    categoryName={transaction.categories?.name}
                    type={transaction.type}
                    variant="default"
                />
                <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {transaction.description}
                    </p>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400">
                        {new Date(transaction.date).toLocaleDateString("pt-BR")}
                    </p>
                </div>
            </div>
            <span
                className={cn("text-sm font-bold", transaction.type === "income" ? "text-emerald-500" : "text-rose-500")}
            >
                {transaction.type === "expense" ? "- " : "+ "}
                {formatCurrency(Number(transaction.amount))}
            </span>
        </div>
    );
}
