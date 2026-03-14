import { Mail, MapPin, Camera, Loader2, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProfile, useUploadAvatar } from "@features/profile/hooks/useProfile";
import { useAuth } from "@features/auth/providers/AuthProvider";
import { useTotalBalance } from "@features/accounts/hooks/useAccounts";
import { useMonthlySummary } from "@features/transactions/hooks/useTransactions";
import { formatCurrency } from "@shared/utils/formatCurrency";
import { cn } from "@lib/utils";
import { useRef } from "react";

export default function Profile() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { data: profile, isLoading: loadingProfile } = useProfile();
    const { data: totalBalance, isLoading: loadingBalance } = useTotalBalance();

    // Get stats for current month
    const currentDate = new Date();
    const { data: summary, isLoading: loadingSummary } = useMonthlySummary(currentDate.getMonth() + 1, currentDate.getFullYear());

    const uploadAvatar = useUploadAvatar();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            await uploadAvatar.mutateAsync(file);
        } catch (error) {
            console.error("Error uploading avatar:", error);
        }
    };

    if (loadingProfile) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        );
    }

    const savings = (summary?.totalIncome || 0) - (summary?.totalExpenses || 0);

    return (
        <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
            {/* Cover & Avatar */}
            <div className="relative">
                <div className="h-48 rounded-3xl bg-gradient-to-r from-primary/20 via-purple-500/20 to-rose-500/20 w-full overflow-hidden border border-white/5 dark:border-slate-800">
                    <div className="absolute inset-0 bg-mesh opacity-50"></div>
                </div>

                <div className="absolute -bottom-16 left-4 md:left-8 flex items-end gap-6">
                    <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <div className="w-32 h-32 rounded-3xl bg-slate-200 dark:bg-slate-900 border-4 border-white dark:border-slate-950 flex items-center justify-center text-slate-700 overflow-hidden relative shadow-xl">
                            {(profile?.avatar_url || user?.avatarUrl) ? (
                                <img src={profile?.avatar_url || user?.avatarUrl || ""} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span className="relative text-4xl font-bold text-slate-400">
                                    {(profile?.full_name || user?.fullName)?.[0] || user?.email?.[0]?.toUpperCase() || "?"}
                                </span>
                            )}
                            {uploadAvatar.isPending && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <Loader2 className="animate-spin text-white" />
                                </div>
                            )}
                        </div>
                        <button
                            className="absolute bottom-2 right-2 p-2 bg-primary rounded-xl text-white shadow-lg hover:scale-110 transition-transform"
                            aria-label="Alterar foto de perfil"
                        >
                            <Camera size={16} />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="mb-4">
                        <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white capitalize">
                            {profile?.full_name || user?.fullName || "Usuário"}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">@{profile?.username || user?.email?.split("@")[0] || "usuario"} • Membro desde {new Date().getFullYear()}</p>
                    </div>
                </div>

                <div className="absolute -bottom-24 md:-bottom-12 right-0 left-0 md:left-auto flex justify-center md:justify-end gap-3 px-4">
                    <button
                        onClick={() => navigate("/profile/edit")}
                        className="px-6 py-2.5 bg-primary hover:bg-sky-400 rounded-xl text-white text-sm font-medium transition-colors shadow-lg shadow-primary/20 flex items-center gap-2"
                    >
                        Editar Perfil
                    </button>
                </div>
            </div>

            <div className="h-24 md:h-16"></div> {/* Spacer for overlapping content */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Info Column */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glassmorphism bg-white/60 dark:bg-slate-900/40 p-6 rounded-3xl space-y-4 border border-white/40 dark:border-slate-700/40">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Informações Pessoais</h3>

                        <div className="space-y-4 text-sm">
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                <Mail size={16} className="text-primary" />
                                <span>{user?.email || "Email não disponível"}</span>
                            </div>
                            {/* Static info for now as profile table doesn't have phone/location yet */}
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 opacity-50">
                                <MapPin size={16} className="text-primary" />
                                <span>Localização não definida</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 opacity-50">
                                <Calendar size={16} className="text-primary" />
                                <span>Entrou em {new Date().toLocaleDateString('pt-BR')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="glassmorphism p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
                        <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest mb-2">Saúde Financeira</h3>
                        <div className="text-3xl font-display font-bold text-slate-800 dark:text-white mb-1">Bom</div>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">Seu saldo está positivo!</p>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-4 overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[75%]"></div>
                        </div>
                    </div>
                </div>

                {/* Stats Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="glass-card p-6 rounded-3xl">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Patrimônio Total</p>
                            {loadingBalance ? (
                                <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 animate-pulse rounded"></div>
                            ) : (
                                <p className="text-2xl font-display font-bold text-slate-800 dark:text-white">{formatCurrency(totalBalance || 0)}</p>
                            )}
                        </div>
                        <div className="glass-card p-6 rounded-3xl">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Economia do Mês</p>
                            {loadingSummary ? (
                                <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 animate-pulse rounded"></div>
                            ) : (
                                <p className={cn(
                                    "text-2xl font-display font-bold",
                                    savings >= 0 ? "text-emerald-500" : "text-rose-500"
                                )}>
                                    {savings >= 0 ? '+' : ''}{formatCurrency(savings)}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="glassmorphism bg-white/40 dark:bg-slate-900/40 p-8 rounded-3xl text-center py-16 border border-dashed border-slate-300 dark:border-slate-700">
                        <p className="text-slate-500">Mais estatísticas (gráficos anuais, metas) em breve...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
