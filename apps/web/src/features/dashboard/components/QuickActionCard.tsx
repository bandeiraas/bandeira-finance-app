import { Link } from "react-router-dom";
import { cn } from "@lib/utils";
import type { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
    to: string;
    icon: LucideIcon;
    label: string;
    iconBgClass: string;
}

export function QuickActionCard({ to, icon: Icon, label, iconBgClass }: QuickActionCardProps) {
    return (
        <Link
            to={to}
            className="flex flex-col items-center justify-center gap-1.5 p-3 glass-card rounded-2xl group w-full hover:scale-105 transition-transform active:scale-95"
        >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm", iconBgClass)}>
                <Icon size={20} />
            </div>
            <span className="text-[9px] font-bold text-slate-700 dark:text-slate-300 text-center leading-tight">
                {label}
            </span>
        </Link>
    );
}
