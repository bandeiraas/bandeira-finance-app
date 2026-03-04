import { useState } from "react";
import { Plus, Copy, Receipt, CreditCard, Shield, Trash2, Loader2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCards, useDeleteCard } from "@features/cards/hooks/useCards";
import { useAccounts } from "@features/accounts/hooks/useAccounts";
import { CardPreview } from "@features/cards/components/CardPreview";
import { formatCurrency } from "@shared/utils/formatCurrency";
import { cn } from "@lib/utils";
import { useAuth } from "@features/auth/providers/AuthProvider";

export default function Cards() {
    const { user } = useAuth();
    const { data: cards, isLoading } = useCards();
    const { data: accounts } = useAccounts();
    const deleteCard = useDeleteCard();
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);

    const selectedCard = cards && cards.length > 0 ? cards[selectedCardIndex] : null;

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (confirm("Tem certeza que deseja excluir este cartão?")) {
            await deleteCard.mutateAsync(id);
            if (cards && cards.length <= 1) setSelectedCardIndex(0);
            else if (selectedCardIndex >= (cards?.length || 0) - 1) setSelectedCardIndex(Math.max(0, selectedCardIndex - 1));
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could add toast here
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 h-full animate-fade-in">
            {/* Left Column: Cards Stack & Status */}
            <div className="w-full lg:w-80 flex flex-col gap-6">

                {/* Section Header */}
                <h3 className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-[0.2em] px-2">Seus Cartões</h3>

                {/* Card Stack */}
                <div className="relative flex flex-col items-center min-h-[240px]">
                    {cards && cards.length > 0 ? (
                        <div className="w-full flex flex-col -space-y-40 lg:-space-y-44">
                            {cards.map((card, index) => {
                                const isSelected = index === selectedCardIndex;
                                const cardAccount = accounts?.find((a) => a.id === card.account_id);
                                return (
                                    <button
                                        key={card.id}
                                        onClick={() => setSelectedCardIndex(index)}
                                        className={cn(
                                            "group relative w-full aspect-[1.58/1] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 text-left",
                                            isSelected ? "z-50 scale-100 opacity-100 border-2 border-primary" : "z-40 scale-[0.94] opacity-80 hover:scale-[0.96] hover:opacity-100 hover:z-45"
                                        )}
                                    >
                                        <CardPreview
                                            card={card}
                                            account={cardAccount ?? null}
                                            userName={user?.fullName}
                                            className="absolute inset-0 w-full h-full"
                                        >
                                            {isSelected && (
                                                <div
                                                    className="absolute bottom-5 right-5 z-20"
                                                    onClick={(e) => handleDelete(e, card.id)}
                                                >
                                                    <div className="p-1.5 bg-red-500/20 hover:bg-red-500 text-red-100 rounded-full transition-colors cursor-pointer">
                                                        <Trash2 size={12} />
                                                    </div>
                                                </div>
                                            )}
                                        </CardPreview>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="w-full aspect-[1.58/1] rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400">
                            <CreditCard size={32} className="mb-2 opacity-50" />
                            <span className="text-xs">Nenhum cartão cadastrado</span>
                        </div>
                    )}
                </div>

                {/* Financial Status Widget */}
                {selectedCard && (
                    <div className="w-full mt-2 glassmorphism bg-white/30 dark:bg-slate-800/40 p-5 rounded-2xl shadow-lg border border-white/20">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Status Financeiro</h3>
                            <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                                <CreditCard size={14} />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[9px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-1">Limite Total</p>
                                <p className="text-2xl font-bold text-slate-800 dark:text-white">{formatCurrency(selectedCard.credit_limit || 0)}</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <p className="text-[9px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Fatura Atual (Estimada)</p>
                                    <p className="text-xs font-bold text-slate-800 dark:text-white">R$ 0,00</p>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full w-[0%] rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
                                </div>
                                <div className="flex justify-between text-[9px]">
                                    <span className="text-slate-400">Disponível</span>
                                    <span className="font-bold text-primary">100%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* New Card Button */}
                <Link to="/cards/new" className="w-full py-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:bg-white/5 hover:text-primary hover:border-primary/50 transition-all">
                    <Plus size={18} />
                    <span className="text-xs font-semibold uppercase tracking-wide">Novo Cartão</span>
                </Link>
            </div>

            {/* Right Column: Details & Actions */}
            <div className="flex-1 glassmorphism bg-white/20 dark:bg-slate-900/40 rounded-3xl p-6 lg:p-8 flex flex-col gap-8 shadow-2xl border border-white/10">
                {selectedCard ? (
                    <>
                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full text-[10px] font-bold tracking-widest mb-3 shadow-lg">
                                    {selectedCard.brand || 'CARTÃO'}
                                </div>
                                <h2 className="text-3xl font-display font-bold text-slate-800 dark:text-white">{selectedCard.card_name || "Seu Cartão"}</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">
                                    Vencimento em {selectedCard.expiry ? new Date(selectedCard.expiry).toLocaleDateString('pt-BR', { month: '2-digit', year: '2-digit' }) : 'N/A'}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="glass-card flex items-center justify-between px-4 py-2 rounded-xl w-full md:w-64 border border-white/10 bg-slate-800/50">
                                    <span className="font-mono text-lg font-medium text-white tracking-wider">•••• {selectedCard.last_four}</span>
                                    <button onClick={() => copyToClipboard(selectedCard.last_four)} className="p-2 text-primary hover:bg-primary/20 rounded-lg transition-colors">
                                        <Copy size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Transactions List Placeholder */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Últimas Transações</h3>
                                <button className="text-[10px] font-bold text-primary hover:underline uppercase tracking-wider">VER TUDO</button>
                            </div>
                            <div className="bg-white/5 dark:bg-slate-800/40 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm p-8 text-center">
                                <p className="text-slate-500 text-sm">Transações específicas do cartão em breve.</p>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-col gap-4 mt-auto">
                            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">Ações Rápidas</h3>
                            <Link to="/invoices" className="w-full p-6 rounded-2xl flex items-center gap-6 text-left group transition-all duration-300 border border-primary/30 bg-white/5 hover:bg-slate-800/60 shadow-lg hover:shadow-primary/10">
                                <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner">
                                    <Receipt size={28} />
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-primary transition-colors">Faturas</div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Consultar histórico e pagamentos</div>
                                </div>
                                <ChevronRight size={24} className="text-slate-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </Link>
                        </div>

                        {/* Protection Widget */}
                        <div className="mt-4 bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl flex items-start gap-3">
                            <Shield className="text-emerald-500 mt-0.5" size={16} />
                            <div>
                                <h4 className="font-bold text-emerald-500 text-xs uppercase tracking-wider">Proteção ativa</h4>
                                <p className="text-[10px] text-emerald-500/80 mt-1 leading-relaxed">Este cartão possui tecnologia de proteção básica.</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                        <CreditCard size={64} className="mb-4" />
                        <p>Selecione um cartão para ver detalhes</p>
                    </div>
                )}
            </div>
        </div>
    );
}
