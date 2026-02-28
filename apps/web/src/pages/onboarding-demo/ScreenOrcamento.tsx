import { cn } from "@lib/utils";
import { Settings, UtensilsCrossed, Car, Home } from "lucide-react";

export function ScreenOrcamento() {
  return (
    <div className="p-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Planejamento Mensal
        </h2>
        <button
          type="button"
          className="text-sm font-semibold text-primary bg-blue-50 dark:bg-primary/20 px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-blue-100 dark:hover:bg-primary/30 transition-colors"
        >
          <Settings size={14} /> Ajustar metas
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm text-center">
          <p className="text-xs text-slate-400 uppercase font-semibold">
            Gasto Total
          </p>
          <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            R$ 4.450
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm text-center">
          <p className="text-xs text-slate-400 uppercase font-semibold">
            Disponível
          </p>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            R$ 2.050
          </p>
        </div>
      </div>
      <div className="space-y-6">
        {[
          {
            label: "Alimentação",
            icon: UtensilsCrossed,
            color: "orange",
            pct: 80,
            val: "1.200 / 1.500",
          },
          {
            label: "Transporte",
            icon: Car,
            color: "purple",
            pct: 75,
            val: "450 / 600",
          },
          {
            label: "Moradia",
            icon: Home,
            color: "emerald",
            pct: 100,
            val: "2.800 / 2.800",
          },
        ].map(({ label, icon: Icon, color, pct, val }) => (
          <div
            key={label}
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    color === "orange" &&
                      "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
                    color === "purple" &&
                      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
                    color === "emerald" &&
                      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
                  )}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    {label}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    {pct}% consumido
                  </span>
                </div>
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700 px-2 py-1 rounded">
                R$ {val}
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full",
                  color === "orange" && "bg-orange-500",
                  color === "purple" && "bg-purple-500",
                  color === "emerald" && "bg-emerald-500",
                )}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
