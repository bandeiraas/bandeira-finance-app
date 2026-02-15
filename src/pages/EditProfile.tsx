import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    CheckCircle,
    Verified,
    Eye,
    EyeOff,
    Save,
    LogOut,
    Camera,
    ChevronLeft
} from "lucide-react";

export default function EditProfile() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "Alex",
        lastName: "Silva",
        email: "alex.silva@email.com",
        password: "password123"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Saving profile:", formData);
        navigate("/profile");
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
            {/* Header / Back Link */}
            <div className="flex items-center gap-4">
                <Link to="/profile" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-500">
                    <ChevronLeft />
                </Link>
                <div>
                    <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white">Editar Perfil</h1>
                    <p className="text-slate-500 dark:text-slate-400">Atualize suas informações pessoais</p>
                </div>
            </div>

            <div className="glassmorphism p-10 lg:p-14 rounded-[40px] shadow-xl relative overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/40 dark:border-slate-700/40">
                {/* Background Blobs */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="text-center mb-10 relative z-10">
                    <div className="relative inline-block mb-4 group cursor-pointer">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-lg mx-auto">
                            {/* Placeholder Avatar */}
                            {/* In a real app, this src would probably come from state/context/auth */}
                            <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-3xl font-bold text-slate-500 dark:text-slate-400">
                                {formData.firstName[0]}{formData.lastName[0]}
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white border-2 border-white dark:border-slate-800 shadow-sm transition-transform group-hover:scale-110">
                            <Camera size={14} />
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group relative">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 group-focus-within:text-sky-500 transition-colors" htmlFor="firstName">
                                Nome
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-700 px-0 py-3 text-lg focus:border-sky-500 focus:outline-none transition-colors placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-600"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Seu nome"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                {formData.firstName && (
                                    <CheckCircle className="text-emerald-500 absolute right-0" size={20} />
                                )}
                            </div>
                        </div>
                        <div className="group relative">
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 group-focus-within:text-sky-500 transition-colors" htmlFor="lastName">
                                Sobrenome
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-700 px-0 py-3 text-lg focus:border-sky-500 focus:outline-none transition-colors placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-600"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Seu sobrenome"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                {formData.lastName && (
                                    <CheckCircle className="text-emerald-500 absolute right-0" size={20} />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="group relative">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 group-focus-within:text-sky-500 transition-colors" htmlFor="email">
                            Email
                        </label>
                        <div className="relative flex items-center">
                            <input
                                className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-700 px-0 py-3 text-lg focus:border-sky-500 focus:outline-none transition-colors placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-600"
                                id="email"
                                name="email"
                                placeholder="seu.email@exemplo.com"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <Verified className="text-emerald-500 absolute right-0" size={20} />
                        </div>
                    </div>

                    <div className="group relative">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 group-focus-within:text-sky-500 transition-colors" htmlFor="password">
                            Senha Atual
                        </label>
                        <div className="relative flex items-center">
                            <input
                                className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-700 px-0 py-3 text-lg focus:border-sky-500 focus:outline-none transition-colors placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-600 pr-10"
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-0"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <p className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Última alteração há 3 meses
                        </p>
                    </div>

                    <div className="pt-6 flex items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="px-6 py-3 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white font-medium transition-colors text-sm"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-slate-800 dark:bg-white text-white dark:text-slate-900 py-3.5 px-6 rounded-xl font-bold shadow-lg shadow-slate-300 dark:shadow-slate-900/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <Save size={18} />
                            Salvar Alterações
                        </button>
                    </div>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50 text-center relative z-10">
                    <button className="text-xs font-medium text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 flex items-center justify-center gap-2 mx-auto transition-colors">
                        <LogOut size={16} />
                        Sair da conta
                    </button>
                </div>
            </div>
        </div>
    );
}
