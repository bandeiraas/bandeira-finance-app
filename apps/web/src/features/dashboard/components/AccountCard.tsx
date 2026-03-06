import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { formatCurrency } from "@shared/utils/formatCurrency";
import { AccountIcon } from "@features/accounts/components";
import type { Account } from "@bandeira/shared";

interface AccountCardProps {
    account: Account;
}

export function AccountCard({ account }: AccountCardProps) {
    return (
        <Link
            to={`/accounts/${account.id}`}
            className="glass-card p-5 rounded-2xl group hover:border-primary/50 cursor-pointer transition-all hover:-translate-y-1 block"
        >
            <div className="flex justify-between items-start mb-4">
                <AccountIcon name={account.bank_name} />
                {account.is_primary && (
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                        PRINCIPAL
                    </span>
                )}
            </div>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">
                {account.bank_name}
            </p>
            <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                {formatCurrency(Number(account.balance))}
            </p>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-1">{account.account_type}</p>
        </Link>
    );
}

export function AddAccountCard() {
    return (
        <Link
            to="/accounts/add"
            className="glass-card p-5 rounded-2xl flex flex-col items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/5 transition-all h-32 border-dashed"
        >
            <Plus size={24} className="mb-2" />
            <span className="text-xs font-bold">Adicionar Conta</span>
        </Link>
    );
}
