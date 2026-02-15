import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, CreditCard, Receipt, User, Bell, Rocket, Sun, Moon, Plus, TrendingUp } from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";

export default function Layout() {
    const location = useLocation();
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
        { icon: CreditCard, label: "Meus Cartões", path: "/cards" },
        { icon: Receipt, label: "Extrato", path: "/transactions" },
        { icon: Bell, label: "Alertas", path: "/alerts" },
    ];

    return (
        <div className="flex h-screen bg-mesh text-slate-300 font-body overflow-hidden transition-colors duration-300">
            {/* Floating Glass Sidebar */}
            <aside className="hidden sm:flex w-20 lg:w-64 glassmorphism flex-col m-4 rounded-3xl border-r-0 z-20">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-10 overflow-hidden">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-900 shrink-0 shadow-lg shadow-white/10">
                            <Rocket size={24} fill="currentColor" />
                        </div>
                        <span className="font-display font-bold text-xl text-white truncate hidden lg:block">FinTrack</span>
                    </div>

                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={cn(
                                        "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group",
                                        isActive
                                            ? "bg-white/10 text-white shadow-sm border border-white/10"
                                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <item.icon size={22} className={cn(isActive ? "text-primary" : "group-hover:text-primary transition-colors")} />
                                    <span className="font-medium hidden lg:block">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-white/5">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-3 p-3 w-full text-slate-400 hover:bg-white/5 hover:text-white rounded-xl transition-all"
                    >
                        {isDark ? <Sun size={22} /> : <Moon size={22} />}
                        <span className="font-medium hidden lg:block">Mudar Tema</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Mobile Header (Visible only on small screens) */}
                <header className="sm:hidden flex items-center justify-between p-4 glassmorphism m-4 rounded-2xl z-20">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-900">
                            <Rocket size={18} fill="currentColor" />
                        </div>
                        <span className="font-display font-bold text-lg text-white">FinTrack</span>
                    </div>
                    <button onClick={toggleTheme} className="text-slate-400">
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 hide-scrollbar z-10 pb-28 sm:pb-8">
                    <Outlet />
                </div>

                {/* Mobile Bottom Nav - Glass Island Design */}
                <div className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
                    <nav className="glassmorphism rounded-3xl px-6 py-3 flex items-center justify-between shadow-2xl shadow-sky-900/40 border border-white/20">
                        <Link
                            to="/dashboard"
                            className={cn(
                                "p-2 rounded-xl transition-all duration-300",
                                location.pathname === "/dashboard" ? "text-white bg-white/10 shadow-inner ring-1 ring-white/20" : "text-slate-400 hover:text-white"
                            )}
                        >
                            <LayoutDashboard size={22} className={location.pathname === "/dashboard" ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : ""} />
                        </Link>

                        <Link
                            to="/transactions"
                            className={cn(
                                "p-2 rounded-xl transition-all duration-300",
                                location.pathname === "/transactions" ? "text-white bg-white/10 shadow-inner ring-1 ring-white/20" : "text-slate-400 hover:text-white"
                            )}
                        >
                            <Receipt size={22} className={location.pathname === "/transactions" ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : ""} />
                        </Link>

                        {/* Floating Action Button (FAB) with Menu */}
                        <div className="relative -top-6 group">
                            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 mb-2 flex flex-col gap-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto scale-90 group-hover:scale-100 origin-bottom">
                                <Link to="/new-income" className="flex items-center gap-3 px-4 py-2 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-900/40 whitespace-nowrap hover:scale-105 transition-transform">
                                    <span className="font-bold text-xs">Receita</span>
                                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                        <TrendingUp size={14} />
                                    </div>
                                </Link>
                                <Link to="/new-expense" className="flex items-center gap-3 px-4 py-2 bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-900/40 whitespace-nowrap hover:scale-105 transition-transform">
                                    <span className="font-bold text-xs">Despesa</span>
                                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                        <CreditCard size={14} />
                                    </div>
                                </Link>
                            </div>
                            <button className="w-14 h-14 bg-gradient-to-tr from-sky-500 to-violet-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-sky-500/40 hover:shadow-sky-500/60 transition-transform hover:scale-110 active:scale-95 ring-4 ring-slate-900">
                                <Plus size={28} className="group-hover:rotate-45 transition-transform duration-300" />
                            </button>
                        </div>

                        <Link
                            to="/cards"
                            className={cn(
                                "p-2 rounded-xl transition-all duration-300",
                                location.pathname === "/cards" ? "text-white bg-white/10 shadow-inner ring-1 ring-white/20" : "text-slate-400 hover:text-white"
                            )}
                        >
                            <CreditCard size={22} className={location.pathname === "/cards" ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : ""} />
                        </Link>

                        <Link
                            to="/profile"
                            className={cn(
                                "p-2 rounded-xl transition-all duration-300",
                                location.pathname === "/profile" ? "text-white bg-white/10 shadow-inner ring-1 ring-white/20" : "text-slate-400 hover:text-white"
                            )}
                        >
                            <User size={22} className={location.pathname === "/profile" ? "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : ""} />
                        </Link>
                    </nav>
                </div>
            </main>

            {/* Background Decorative Elements */}
            <div className="fixed top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/20 blur-3xl rounded-full pointer-events-none z-0"></div>
            <div className="fixed bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-600/10 blur-3xl rounded-full pointer-events-none z-0"></div>
        </div>
    );
}
