import { Download, Lightbulb, BarChart3 } from "lucide-react";

export function ScreenRelatorios() {
  return (
    <div className="p-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Relatórios e Insights
        </h2>
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <Download size={16} /> Exportar PDF
        </button>
      </div>
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 flex gap-4 hover:shadow-md transition-shadow cursor-default">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800/50 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0 shadow-sm">
            <Lightbulb size={24} />
          </div>
          <div>
            <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">
              Dica de Economia
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              Detectamos que seus gastos com assinaturas de streaming aumentaram
              30% nos últimos 3 meses. Desative os planos que você não usa para
              economizar até{" "}
              <span className="font-bold underline">R$ 80,00 mensais</span>.
            </p>
            <button
              type="button"
              className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 uppercase tracking-wide"
            >
              Rever Assinaturas
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-slate-900 dark:text-white">
                Entradas vs Saídas
              </h4>
              <BarChart3
                size={16}
                className="text-slate-300 dark:text-slate-500"
              />
            </div>
            <div className="flex items-end gap-3 h-32 px-2">
              {[60, 80, 45, 75].map((h, i) => (
                <div
                  key={i}
                  className="flex-grow flex flex-col justify-end gap-1 group"
                >
                  <div
                    className="bg-slate-900 dark:bg-slate-600 rounded-t-sm opacity-80 group-hover:opacity-100 transition-opacity"
                    style={{ height: `${h}%` }}
                  />
                  <div
                    className="bg-slate-200 dark:bg-slate-600 rounded-b-sm"
                    style={{ height: `${100 - h}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-4 text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-slate-900 dark:bg-slate-600" />{" "}
                Entradas
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-slate-200 dark:bg-slate-500" />{" "}
                Saídas
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <h4 className="font-bold text-slate-900 dark:text-white mb-4 z-10 relative">
              Evolução Patrimonial
            </h4>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-50 dark:from-blue-900/20 to-transparent" />
            <div className="relative h-24 flex items-center justify-center z-10">
              <svg
                className="w-full h-full text-primary drop-shadow-sm"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 100 40"
              >
                <path
                  d="M0 35 Q 20 35, 30 25 T 60 20 T 100 5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="absolute right-0 top-0 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full">
                +12%
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
              Crescimento constante nos últimos 6 meses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
