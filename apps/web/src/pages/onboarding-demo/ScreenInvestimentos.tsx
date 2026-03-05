import { cn } from "@lib/utils";
import { TrendingUp, PieChart, Banknote } from "lucide-react";

export function ScreenInvestimentos() {
  return (
    <div className="p-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Carteira de Investimentos
        </h2>
        <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 p-1 rounded-lg shadow-sm">
          <button
            type="button"
            className="px-3 py-1.5 rounded-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-sm"
          >
            Resumo
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-md text-slate-500 dark:text-slate-400 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Ativos
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 p-8 rounded-2xl text-white shadow-xl shadow-slate-900/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10">
            <p className="text-slate-400 text-sm mb-1 font-medium">
              Patrimônio Total
            </p>
            <h3 className="text-4xl font-bold mb-6 tracking-tight">
              R$ 84.900,00
            </h3>
            <div className="flex gap-8 border-t border-white/10 pt-6">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">
                  Rentabilidade Hoje
                </p>
                <p className="text-emerald-400 font-bold text-lg flex items-center gap-1">
                  <TrendingUp size={16} /> + R$ 420,00
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">
                  No Mês
                </p>
                <p className="text-emerald-400 font-bold text-lg flex items-center gap-1">
                  <TrendingUp size={16} /> + 1.84%
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
          <p className="text-sm font-bold text-slate-900 dark:text-white mb-6 flex justify-between">
            Alocação
            <PieChart
              size={16}
              className="text-slate-300 dark:text-slate-500"
            />
          </p>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full border-[12px] border-slate-900 dark:border-slate-600 relative shadow-inner">
              <div className="absolute inset-0 border-[12px] border-primary border-l-transparent border-b-transparent border-r-transparent rounded-full rotate-45" />
            </div>
            <div className="space-y-3 flex-grow">
              {[
                {
                  color: "bg-slate-900 dark:bg-slate-600",
                  label: "Renda Fixa",
                  pct: "70%",
                },
                { color: "bg-primary", label: "Ações", pct: "20%" },
                {
                  color: "bg-slate-200 dark:bg-slate-500",
                  label: "Outros",
                  pct: "10%",
                },
              ].map(({ color, label, pct }) => (
                <div
                  key={label}
                  className="flex justify-between items-center text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", color)} />
                    <span className="text-slate-600 dark:text-slate-300 font-medium">
                      {label}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {pct}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col justify-center hover:shadow-md transition-all group cursor-default">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Banknote size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Próximos Proventos
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                Previsão
              </p>
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            R$ 380,50
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium bg-slate-50 dark:bg-slate-700 py-1 px-2 rounded w-fit">
            Expectativa para 15/Mai
          </p>
        </div>
      </div>
    </div>
  );
}
