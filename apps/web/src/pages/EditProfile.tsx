import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    CheckCircle,
    Save,
    LogOut,
    Camera,
    ChevronLeft,
    Loader2
} from "lucide-react";
import { useAuth } from "@features/auth/providers/AuthProvider";
import { useProfile, useUpdateProfile, useUploadAvatar } from "@features/profile/hooks/useProfile";

export default function EditProfile() {
    const navigate = useNavigate();
    const { signOut } = useAuth();
    const { data: profile, isLoading: loadingProfile } = useProfile();
    const updateProfile = useUpdateProfile();
    const uploadAvatar = useUploadAvatar();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // UI toggle only, we don't update password here yet
    const [formData, setFormData] = useState({
        full_name: "",
        username: "",
        website: "",
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Populate form when profile loads (sync form with fetched data)
    useEffect(() => {
        if (profile) {
            /* eslint-disable react-hooks/set-state-in-effect -- syncing form with async profile fetch */
            setFormData({
                full_name: profile.full_name || "",
                username: profile.username || "",
                website: profile.website || "",
            });
            /* eslint-enable react-hooks/set-state-in-effect */
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            await uploadAvatar.mutateAsync(file);
            setSuccessMessage("Foto de perfil atualizada!");
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (error) {
            console.error("Error uploading avatar:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null);

        try {
            await updateProfile.mutateAsync({
                full_name: formData.full_name,
                username: formData.username,
                website: formData.website,
                updated_at: new Date().toISOString(),
            });
            setSuccessMessage("Perfil atualizado com sucesso!");
            setTimeout(() => {
                navigate("/profile");
            }, 1000);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        navigate("/login");
    };

    if (loadingProfile) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        );
    }

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

                {successMessage && (
                    <div className="mb-6 p-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl flex items-center gap-2">
                        <CheckCircle size={20} />
                        {successMessage}
                    </div>
                )}

                <div className="text-center mb-10 relative z-10">
                    <div className="relative inline-block mb-4 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-lg mx-auto bg-slate-200 dark:bg-slate-800">
                            {profile?.avatar_url ? (
                                <img
                                    src={profile.avatar_url}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-slate-500 dark:text-slate-400">
                                    {formData.full_name?.[0] || "?"}
                                </div>
                            )}
                        </div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white border-2 border-white dark:border-slate-800 shadow-sm transition-transform group-hover:scale-110">
                            {uploadAvatar.isPending ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <p className="text-xs text-slate-400">Clique para alterar a foto</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="group relative">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 group-focus-within:text-sky-500 transition-colors" htmlFor="full_name">
                            Nome Completo
                        </label>
                        <div className="relative flex items-center">
                            <input
                                className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-700 px-0 py-3 text-lg focus:border-sky-500 focus:outline-none transition-colors placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-600"
                                id="full_name"
                                name="full_name"
                                placeholder="Seu nome completo"
                                type="text"
                                value={formData.full_name}
                                onChange={handleChange}
                                disabled={updateProfile.isPending}
                            />
                            {formData.full_name && (
                                <CheckCircle className="text-emerald-500 absolute right-0" size={20} />
                            )}
                        </div>
                    </div>

                    <div className="group relative">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 group-focus-within:text-sky-500 transition-colors" htmlFor="username">
                            Nome de Usuário (@)
                        </label>
                        <div className="relative flex items-center">
                            <input
                                className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-700 px-0 py-3 text-lg focus:border-sky-500 focus:outline-none transition-colors placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-600"
                                id="username"
                                name="username"
                                placeholder="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                disabled={updateProfile.isPending}
                            />
                        </div>
                    </div>

                    <div className="group relative">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 group-focus-within:text-sky-500 transition-colors" htmlFor="website">
                            Website / Link
                        </label>
                        <div className="relative flex items-center">
                            <input
                                className="w-full bg-transparent border-b-2 border-slate-200 dark:border-slate-700 px-0 py-3 text-lg focus:border-sky-500 focus:outline-none transition-colors placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-600"
                                id="website"
                                name="website"
                                placeholder="https://..."
                                type="text"
                                value={formData.website}
                                onChange={handleChange}
                                disabled={updateProfile.isPending}
                            />
                        </div>
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
                            disabled={updateProfile.isPending}
                            className="flex-1 bg-slate-800 dark:bg-white text-white dark:text-slate-900 py-3.5 px-6 rounded-xl font-bold shadow-lg shadow-slate-300 dark:shadow-slate-900/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {updateProfile.isPending ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <Save size={18} />
                            )}
                            Salvar Alterações
                        </button>
                    </div>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50 text-center relative z-10">
                    <button
                        onClick={handleSignOut}
                        className="text-xs font-medium text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 flex items-center justify-center gap-2 mx-auto transition-colors"
                    >
                        <LogOut size={16} />
                        Sair da conta
                    </button>
                </div>
            </div>
        </div>
    );
}
