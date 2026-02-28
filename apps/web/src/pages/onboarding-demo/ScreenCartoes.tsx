import { Plus, CreditCard, ShoppingCart, Coffee, Car } from "lucide-react";

export function ScreenCartoes() {
  return (
    <div className="p-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Meus Cartões
        </h2>
        <button
          type="button"
          className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      <div className="flex overflow-x-auto pb-4 gap-6 mb-8 hide-scrollbar snap-x">
        <div className="w-72 flex-shrink-0 h-44 bg-slate-900 dark:bg-slate-800 rounded-2xl p-6 relative overflow-hidden text-white shadow-xl shadow-slate-900/20 snap-center transition-transform hover:scale-[1.02] cursor-pointer">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="flex justify-between items-start mb-8">
            <span className="text-sm opacity-60 font-medium">
              FinFlow Black
            </span>
            <CreditCard size={20} className="opacity-60" />
          </div>
          <p className="text-lg font-mono tracking-widest mb-4">
            **** **** **** 8821
          </p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] opacity-40 uppercase">Titular</p>
              <p className="text-sm font-bold uppercase">G R SILVA</p>
            </div>
            <div className="w-10 h-6 bg-white/20 rounded-md" />
          </div>
        </div>
        <div className="w-72 flex-shrink-0 h-44 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 relative overflow-hidden text-white shadow-xl shadow-purple-900/20 snap-center transition-transform hover:scale-[1.02] cursor-pointer opacity-80 hover:opacity-100">
          <div className="absolute -left-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="flex justify-between items-start mb-8">
            <span className="text-sm opacity-60 font-medium">
              NuBank Platinum
            </span>
            <CreditCard size={20} className="opacity-60" />
          </div>
          <p className="text-lg font-mono tracking-widest mb-4">
            **** **** **** 4092
          </p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] opacity-40 uppercase">Titular</p>
              <p className="text-sm font-bold uppercase">G R SILVA</p>
            </div>
            <div className="flex gap-1">
              <div className="w-6 h-6 rounded-full bg-red-500/80" />
              <div className="w-6 h-6 rounded-full bg-yellow-500/80 -ml-3" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <div className="font-bold text-slate-900 dark:text-white">
            Fatura Atual
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            R$ 2.450,12
          </div>
        </div>
        <div className="p-2">
          {[
            {
              name: "Amazon.com",
              time: "Ontem",
              val: "150,00",
              icon: ShoppingCart,
            },
            {
              name: "Starbucks Coffee",
              time: "Hoje",
              val: "18,50",
              icon: Coffee,
            },
            { name: "Uber Trip", time: "Hoje", val: "24,90", icon: Car },
          ].map(({ name, time, val, icon: Icon }) => (
            <div
              key={name}
              className="flex justify-between items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:bg-white dark:group-hover:bg-slate-600 border border-transparent group-hover:border-slate-200 dark:group-hover:border-slate-500 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-all">
                  <Icon size={16} />
                </div>
                <div>
                  <span className="text-sm font-bold block text-slate-900 dark:text-white">
                    {name}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {time}
                  </span>
                </div>
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                R$ {val}
              </span>
            </div>
          ))}
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700 text-center">
          <button
            type="button"
            className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Ver fatura completa
          </button>
        </div>
      </div>
    </div>
  );
}
