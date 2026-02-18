import { Bell, Shield, Globe, Moon, CreditCard, HelpCircle, LogOut } from "lucide-react";
import { cn } from "../lib/utils";

interface SettingItem {
    icon: React.ElementType;
    label: string;
    desc: string;
    active?: boolean;
    danger?: boolean;
    onClick?: () => void;
}

import { useAuth } from "../features/auth/providers/AuthProvider";

export default function Settings() {
    const { signOut } = useAuth();
    const sections: { title: string; items: SettingItem[] }[] = [
        {
            title: "Conta",
            items: [
                { icon: UserIcon, label: "Dados Pessoais", desc: "Nome, e-mail e telefone" },
                { icon: Shield, label: "Segurança", desc: "Senha e autenticação de 2 fatores" },
                { icon: CreditCard, label: "Meus Cartões", desc: "Gerenciar cartões salvos" },
            ]
        },
        {
            title: "Preferências",
            items: [
                { icon: Bell, label: "Notificações", desc: "E-mail, push e SMS" },
                { icon: Moon, label: "Aparência", desc: "Tema escuro, claro ou sistema", active: true },
                { icon: Globe, label: "Idioma", desc: "Português (Brasil)" },
            ]
        },
        {
            title: "Outros",
            items: [
                { icon: HelpCircle, label: "Ajuda e Suporte", desc: "Fale conosco" },
                { icon: LogOut, label: "Sair da Conta", desc: "Encerrar sessão atual", danger: true, onClick: () => signOut() },
            ]
        }
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-display font-bold text-white">Configurações</h1>
                <p className="text-slate-400 text-sm">Gerencie suas preferências e segurança.</p>
            </header>

            <div className="space-y-8">
                {sections.map((section, i) => (
                    <div key={i} className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">{section.title}</h3>
                        <div className="glassmorphism bg-slate-900/40 rounded-3xl overflow-hidden border border-white/5">
                            {section.items.map((item, j) => (
                                <button
                                    key={j}
                                    onClick={item.onClick}
                                    className="w-full text-left p-4 flex items-center gap-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group"
                                >
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                        item.danger ? "bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white" : "bg-slate-800 text-slate-400 group-hover:text-white group-hover:bg-slate-700"
                                    )}>
                                        <item.icon size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className={cn("font-medium", item.danger ? "text-rose-500" : "text-white")}>{item.label}</p>
                                        <p className="text-xs text-slate-500">{item.desc}</p>
                                    </div>
                                    {item.active && (
                                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">Ativo</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function UserIcon({ size, className }: { size?: number, className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    )
}
