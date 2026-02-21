import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Settings, LogOut, UserPen } from "lucide-react";
import { cn } from "@lib/utils";
import { useAuth } from "@features/auth/providers/AuthProvider";

export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { user, signOut } = useAuth();

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    const displayName = user?.fullName || user?.email?.split("@")[0] || "Usuário";
    const avatarUrl = user?.avatarUrl;
    const initials = (user?.fullName?.split(" ").map((n) => n[0]).join("").slice(0, 2) || user?.email?.[0] || "?").toUpperCase();

    const handleLogout = async () => {
        await signOut();
        setIsOpen(false);
        navigate("/login");
    };

    return (
        <div className="relative group" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 glass-card py-1 px-1 pr-4 rounded-full cursor-pointer transition-all hover:bg-white/40 dark:hover:bg-slate-800/40"
            >
                {avatarUrl ? (
                    <img
                        alt="Profile avatar"
                        className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 object-cover"
                        src={avatarUrl}
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 text-xs font-bold shrink-0">
                        {initials}
                    </div>
                )}
                <span className="text-sm font-medium hidden md:block text-slate-800 dark:text-white truncate max-w-[120px]">{displayName}</span>
                <ChevronDown size={16} className={cn("text-slate-500 dark:text-slate-400 transition-transform duration-300", isOpen && "rotate-180")} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 z-[60] animate-in fade-in zoom-in-95 duration-200">
                    <Link
                        to="/profile/edit"
                        className="flex items-center gap-3 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 transition-colors group/item"
                        onClick={() => setIsOpen(false)}
                    >
                        <UserPen size={18} className="text-slate-400 group-hover/item:text-sky-500 transition-colors" />
                        <span className="text-sm font-medium">Editar Perfil</span>
                    </Link>

                    <Link
                        to="/settings"
                        className="flex items-center gap-3 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 transition-colors group/item"
                        onClick={() => setIsOpen(false)}
                    >
                        <Settings size={18} className="text-slate-400 group-hover/item:text-sky-500 transition-colors" />
                        <span className="text-sm font-medium">Configurações</span>
                    </Link>

                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-1 mx-2"></div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-2.5 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl text-rose-500 dark:text-rose-400 transition-colors group/item"
                    >
                        <LogOut size={18} className="group-hover/item:text-rose-600 dark:group-hover/item:text-rose-300 transition-colors" />
                        <span className="text-sm font-medium">Sair</span>
                    </button>
                </div>
            )}
        </div>
    );
}
