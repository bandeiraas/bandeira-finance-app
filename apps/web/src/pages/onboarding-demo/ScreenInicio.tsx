import { cn } from "@lib/utils";
import {
  Landmark,
  Bell,
  Plus,
  Info,
  UtensilsCrossed,
  Banknote,
  TrendingUp,
  CreditCard,
  Wallet,
} from "lucide-react";

export function ScreenInicio() {
  return (
    <div className="p-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Olá, Guilherme 👋
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Aqui está o resumo da sua saúde financeira hoje.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            <Bell size={20} />
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg shadow-slate-900/10"
          >
            <Plus size={16} /> Nova Transação
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-default group">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Saldo Disponível
            </p>
            <Landmark
              size={20}
              className="text-slate-300 dark:text-slate-500 group-hover:text-primary transition-colors"
            />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            R$ 12.450,80
          </p>
          <div className="mt-4 flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/30 w-fit px-2 py-1 rounded-full">
            <TrendingUp size={12} /> +4.5%
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-default group">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Gastos no Mês
            </p>
            <CreditCard
              size={20}
              className="text-slate-300 dark:text-slate-500 group-hover:text-rose-500 transition-colors"
            />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            R$ 4.120,00
          </p>
          <div className="mt-4 flex items-center gap-1 text-rose-500 text-xs font-bold bg-rose-50 dark:bg-rose-900/30 w-fit px-2 py-1 rounded-full">
            <TrendingUp size={12} className="rotate-180" /> -12% vs meta
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-default group">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Investido
            </p>
            <Wallet
              size={20}
              className="text-slate-300 dark:text-slate-500 group-hover:text-purple-500 transition-colors"
            />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            R$ 84.900,00
          </p>
          <div className="mt-4 flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-bold bg-slate-100 dark:bg-slate-700 w-fit px-2 py-1 rounded-full">
            Rendimento: 1.2% a.m.
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Fluxo de Caixa
            <span title="Entradas e Saídas">
              <Info size={14} className="text-slate-300 dark:text-slate-500" />
            </span>
          </h3>
          <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
            <button
              type="button"
              className="px-3 py-1 bg-white dark:bg-slate-800 shadow-sm rounded-md text-xs font-bold text-slate-900 dark:text-white"
            >
              7 Dias
            </button>
            <button
              type="button"
              className="px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              30 Dias
            </button>
          </div>
        </div>
        <div className="h-48 flex items-end justify-between gap-3 px-2">
          {[30, 45, 25, 70, 55, 40, 85].map((h, i) => (
            <div
              key={i}
              className={cn(
                "w-full rounded-t-lg relative group transition-colors",
                i === 3
                  ? "bg-slate-900 dark:bg-slate-600 h-[70%]"
                  : i === 6
                    ? "bg-primary h-[85%]"
                    : "bg-slate-100 dark:bg-slate-700",
                i === 3 || i === 6
                  ? "shadow-lg"
                  : "hover:bg-slate-200 dark:hover:bg-slate-600",
              )}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase">
          <span>Seg</span>
          <span>Ter</span>
          <span>Qua</span>
          <span>Qui</span>
          <span>Sex</span>
          <span>Sab</span>
          <span>Dom</span>
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
            <UtensilsCrossed size={16} />
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              iFood
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Hoje, 12:30
            </p>
          </div>
          <p className="text-sm font-bold text-rose-500">- R$ 45,90</p>
        </div>
        <div className="w-full bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Banknote size={16} />
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white">
              Salário
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Ontem
            </p>
          </div>
          <p className="text-sm font-bold text-emerald-600">+ R$ 5.200,00</p>
        </div>
      </div>
    </div>
  );
}
