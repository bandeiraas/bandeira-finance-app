import { Mail, Phone, MapPin, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Cover & Avatar */}
            <div className="relative">
                <div className="h-48 rounded-3xl bg-gradient-to-r from-primary/20 via-purple-500/20 to-rose-500/20 w-full overflow-hidden border border-white/5">
                    <div className="absolute inset-0 bg-mesh opacity-50"></div>
                </div>

                <div className="absolute -bottom-16 left-8 flex items-end gap-6">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-3xl bg-slate-900 border-4 border-slate-950 flex items-center justify-center text-slate-700 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black"></div>
                            <span className="relative text-4xl font-bold text-white/20">AS</span>
                        </div>
                        <button className="absolute bottom-2 right-2 p-2 bg-primary rounded-xl text-white shadow-lg hover:scale-110 transition-transform">
                            <Camera size={16} />
                        </button>
                    </div>
                    <div className="mb-4">
                        <h1 className="text-3xl font-display font-bold text-white">Alex Silva</h1>
                        <p className="text-slate-400">@alex.silva • Membro desde 2023</p>
                    </div>
                </div>

                <div className="absolute -bottom-12 right-0 flex gap-3">
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm font-medium transition-colors backdrop-blur-md">
                        Editar Capa
                    </button>
                    <button
                        onClick={() => navigate("/profile/edit")}
                        className="px-4 py-2 bg-primary hover:bg-sky-400 rounded-xl text-white text-sm font-medium transition-colors shadow-lg shadow-primary/20"
                    >
                        Editar Perfil
                    </button>
                </div>
            </div>

            <div className="h-16"></div> {/* Spacer for overlapping content */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Info Column */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glassmorphism bg-slate-900/40 p-6 rounded-3xl space-y-4">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Informações Pessoais</h3>

                        <div className="space-y-4 text-sm">
                            <div className="flex items-center gap-3 text-slate-300">
                                <Mail size={16} className="text-primary" />
                                <span>alex.silva@email.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <Phone size={16} className="text-primary" />
                                <span>+55 (11) 99999-9999</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <MapPin size={16} className="text-primary" />
                                <span>São Paulo, SP</span>
                            </div>
                        </div>
                    </div>

                    <div className="glassmorphism p-6 rounded-3xl bg-gradient-to-br from-emerald-900/20 to-transparent border border-emerald-500/20">
                        <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">Saúde Financeira</h3>
                        <div className="text-3xl font-display font-bold text-white mb-1">98/100</div>
                        <p className="text-xs text-emerald-400">Excelente! Seu perfil é top tier.</p>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[98%]"></div>
                        </div>
                    </div>
                </div>

                {/* Stats Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-card p-6 rounded-3xl">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Economizado</p>
                            <p className="text-2xl font-display font-bold text-white">R$ 48.250,90</p>
                        </div>
                        <div className="glass-card p-6 rounded-3xl">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Metas Atingidas</p>
                            <p className="text-2xl font-display font-bold text-white">12 / 15</p>
                        </div>
                    </div>

                    <div className="glassmorphism bg-slate-900/40 p-8 rounded-3xl text-center py-16">
                        <p className="text-slate-500">Mais estatísticas em breve...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
