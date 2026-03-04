import {
    Sparkles,
    Lightbulb,
    Loader2,
    Check
} from "lucide-react";
import { useAlerts, useMarkAlertAsRead, useMarkAllAlertsAsRead } from "@features/alerts/hooks/useAlerts";
import { cn } from "@lib/utils";

export default function Alerts() {
    const { data: alerts, isLoading } = useAlerts();
    const markAsRead = useMarkAlertAsRead();
    const markAllAsRead = useMarkAllAlertsAsRead();

    const handleMarkAsRead = (id: string) => {
        markAsRead.mutate(id);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        );
    }

    const unreadCount = alerts?.filter(a => !a.is_read).length || 0;

    return (
        <div className="flex flex-col h-full space-y-6 overflow-hidden animate-fade-in">
            <header className="flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Notificações Inteligentes</h1>
                    <div className="flex items-center gap-2 mt-1">
                        {unreadCount > 0 && <span className="flex h-2 w-2 rounded-full bg-violet-500 animate-pulse"></span>}
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {unreadCount > 0 ? `${unreadCount} novas notificações` : "Tudo em dia"}
                        </p>
                    </div>
                </div>
                {unreadCount > 0 && (
                    <button
                        onClick={() => markAllAsRead.mutate()}
                        disabled={markAllAsRead.isPending}
                        className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors flex items-center gap-2"
                    >
                        {markAllAsRead.isPending ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                        Marcar tudo como lido
                    </button>
                )}
            </header>

            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
                {/* Main Content Area */}
                <div className="lg:col-span-12 flex flex-col h-full">
                    <div className="glassmorphism p-6 sm:p-8 rounded-3xl h-full flex flex-col lg:flex-row gap-8 lg:gap-10 relative overflow-y-auto hide-scrollbar">

                        {/* Feed Column */}
                        <div className="flex-1 relative z-10 flex flex-col">
                            {/* Critical Takeaways Card (Mock for now, could be derived from critical alerts) */}
                            <div className="mb-8 bg-gradient-to-br from-violet-500/10 to-sky-500/10 border border-violet-500/20 rounded-2xl p-5 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-mesh opacity-10 pointer-events-none"></div>
                                <div className="flex items-start gap-4 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-violet-500 shadow-sm border border-violet-500/20 shrink-0">
                                        <Sparkles size={24} fill="currentColor" className="text-violet-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Resumo da Semana</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            A inteligência financeira está analisando seus dados. Mantenha suas transações atualizadas para receber insights personalizados.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Feed Filters */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Feed de Alertas</h3>
                                <div className="flex gap-2">
                                    <button className="px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold shadow-md transition-transform hover:scale-105">Todos</button>
                                </div>
                            </div>

                            {/* Timeline Feed */}
                            <div className="space-y-6 pl-2 border-l-2 border-slate-200 dark:border-slate-800 ml-3">
                                {alerts && alerts.length > 0 ? (
                                    alerts.map((alert) => {
                                        const isCritical = alert.type === 'critical';
                                        const isWarning = alert.type === 'warning';

                                        return (
                                            <div key={alert.id} className={cn("relative pl-8 transition-opacity", alert.is_read ? "opacity-60" : "opacity-100")}>
                                                <div className={cn(
                                                    "absolute -left-[9px] top-1.5 w-4 h-4 rounded-full ring-4 ring-white dark:ring-slate-900",
                                                    isCritical ? "bg-rose-500" : isWarning ? "bg-amber-500" : "bg-sky-500"
                                                )}></div>
                                                <div className={cn(
                                                    "p-5 rounded-2xl border shadow-sm transition-all group",
                                                    alert.is_read ? "bg-white/60 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800" : "bg-white/80 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:bg-white/90 dark:hover:bg-slate-800 hover:shadow-md"
                                                )}>
                                                    <div className="flex justify-between items-start mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <span className={cn(
                                                                "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
                                                                isCritical ? "bg-rose-900/30 text-rose-400 border-rose-800/50" :
                                                                    isWarning ? "bg-amber-900/30 text-amber-400 border-amber-800/50" :
                                                                        "bg-sky-900/30 text-sky-400 border-sky-800/50"
                                                            )}>
                                                                {alert.type || 'Info'}
                                                            </span>
                                                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                                                {new Date(alert.created_at).toLocaleString()}
                                                            </span>
                                                        </div>
                                                        {!alert.is_read && (
                                                            <button
                                                                onClick={() => handleMarkAsRead(alert.id)}
                                                                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors text-xs flex items-center gap-1"
                                                            >
                                                                <Check size={14} /> Marcar como lido
                                                            </button>
                                                        )}
                                                    </div>
                                                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">{alert.title}</h4>
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                                        {alert.message}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-12 text-slate-500">
                                        Nenhuma notificação encontrada.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar Column (Insights placeholders) */}
                        <div className="w-full lg:w-96 shrink-0 flex flex-col gap-6 relative z-10 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 pt-8 lg:pt-0 lg:pl-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">IA Financial Insights</h3>
                            </div>

                            <div className="space-y-4">
                                {/* Insight 1 - Static Placeholder */}
                                <div className="glass-card p-5 rounded-2xl border-l-4 border-l-violet-500 relative overflow-hidden group opacity-60">
                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500 shrink-0">
                                            <Lightbulb size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Gerando Insights...</h4>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                                                Continue usando o app para gerar padrões de consumo e receber dicas personalizadas.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
