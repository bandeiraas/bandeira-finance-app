import { useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {

ChevronLeft,
ChevronRight,
Loader2,
FileText,
ArrowRightLeft,
Search,
Filter,
Download,
Zap,
Plus,
Droplets,
Building2,
Wifi,
TrendingUp,
PiggyBank,
LineChart,
SmartphoneNfc,
} from 'lucide-react';
import { useAccounts } from '../features/accounts/hooks/useAccounts';
import { useTransactions } from '../features/transactions/hooks/useTransactions';
import { useCards } from '../features/cards/hooks/useCards';
import { formatCurrency } from '../shared/utils/formatCurrency';
import { ACCOUNT_TYPE_LABELS } from '../shared/constants/accounts';
import { BANK_HEX, getBankKey } from '../shared/constants/banks';
import { BankIcon } from '../components/BankIcon';
import { TransactionIcon } from '../components/TransactionIcon';

const MOCK_BILLS = [
{ name: 'Energia Elétrica', due: '2', date: '26 Out', amount: 245, icon: Zap, color: 'red' },
{ name: 'Saneamento', due: '5', date: '29 Out', amount: 82.4, icon: Droplets, color: 'blue' },
{ name: 'Condomínio', due: '10', date: '03 Nov', amount: 850, icon: Building2, color: 'green' },
{ name: 'Internet Fibra', due: '12', date: '05 Nov', amount: 119.9, icon: Wifi, color: 'slate' },
];

const MOCK_INVESTMENTS = [
{ name: 'CDB Pós-fixado', return: '+1.2%', value: 5430, icon: PiggyBank, color: 'purple' },
{ name: 'Fundo DI', return: '+0.8%', value: 2150, icon: LineChart, color: 'blue' },
];

const CHART_COLOR_CLASSES = ['stroke-blue-500', 'stroke-purple-500'];


export default function AccountDetail() {
const { id } = useParams<{ id: string }>();
const navigate = useNavigate();
const [searchTerm, setSearchTerm] = useState('');

const { data: accounts, isLoading } = useAccounts();
const { data: transactions } = useTransactions(100);
const { data: cards } = useCards();
const account = accounts?.find((a) => a.id === id);

const accountTransactions = useMemo(() => {
    const list = transactions?.filter((t) => t.account_id === id) ?? [];
    if (!searchTerm.trim()) return list;
    const q = searchTerm.toLowerCase();
    return list.filter((t) => (t.description ?? '').toLowerCase().includes(q));
}, [transactions, id, searchTerm]);

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
const monthTransactions = accountTransactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
});
const monthIncome = monthTransactions.filter((t) => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
const monthExpense = monthTransactions.filter((t) => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);

const categoryTotals = monthTransactions
    .filter((t) => t.type === 'expense')
    .reduce<Record<string, number>>((acc, t) => {
        const name = t.categories?.name ?? 'Outros';
        acc[name] = (acc[name] ?? 0) + Number(t.amount);
        return acc;
    }, {});
const totalExpense = monthExpense;
const categoriesWithPercent = Object.entries(categoryTotals)
    .map(([name, total]) => ({ name, total, percentage: totalExpense > 0 ? (total / totalExpense) * 100 : 0 }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);

const primaryCard = cards?.find((c) => c.account_id === id);

const groupedByDate = useMemo(() => {
    const groups: Record<string, typeof accountTransactions> = {};
    accountTransactions.forEach((t) => {
        const d = new Date(t.date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        let label: string;
        if (d.toDateString() === today.toDateString())
            label = `Hoje, ${d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}`;
        else if (d.toDateString() === yesterday.toDateString())
            label = `Ontem, ${d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}`;
        else
            label = d.toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
            });
        if (!groups[label]) groups[label] = [];
        groups[label].push(t);
    });
    return groups;
}, [accountTransactions]);

const totalChartPercent = categoriesWithPercent.reduce((s, c) => s + c.percentage, 0) || 75;

if (isLoading) {
    return (
        <div className='min-h-[400px] flex items-center justify-center'>
            <Loader2 size={32} className='animate-spin text-primary' />
        </div>
    );
}

if (!account) {
    return (
        <div className='space-y-6 animate-fade-in'>
            <button
                onClick={() => navigate(-1)}
                className='flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors'
            >
                <ChevronLeft size={20} />
                Voltar
            </button>
            <div className='text-center py-12'>
                <p className='text-slate-500 dark:text-slate-400'>Conta não encontrada.</p>
                <Link to='/accounts' className='text-primary font-medium hover:underline mt-2 inline-block'>
                    Ver todas as contas
                </Link>
            </div>
        </div>
    );
}

const accountTypeLabel = ACCOUNT_TYPE_LABELS[account.account_type] ?? account.account_type;
const bankKey = getBankKey(account.bank_name);
const bankHex = BANK_HEX[bankKey] ?? BANK_HEX.default;

return (
    <div className='space-y-6 animate-fade-in' style={{ ['--bank-accent']: bankHex } as React.CSSProperties}>
        <header className='mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div className='flex items-center gap-4'>
                <button
                    onClick={() => navigate(-1)}
                    className='w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors'
                >
                    <ChevronLeft size={20} />
                </button>
                <BankIcon name={account.bank_name} size='lg' bankHex={bankHex} />
                <div>
                    <h1 className='text-2xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2'>
                        {account.bank_name}
                        <span className='px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium border border-green-200 dark:border-green-800'>
                            Ativo
                        </span>
                    </h1>
                    <p className='text-slate-500 dark:text-slate-400 text-sm'>
                        Conta {accountTypeLabel} •••• ----
                    </p>
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <button
                    className='flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border-2 text-slate-700 dark:text-slate-300 rounded-xl transition-all shadow-sm hover:shadow-md hover:opacity-90'
                    style={{ borderColor: bankHex }}
                >
                    <FileText size={18} style={{ color: bankHex }} />
                    <span className='font-medium text-sm'>Extrato</span>
                </button>
                <Link
                    to='/new-income'
                    className='flex items-center gap-2 px-4 py-2.5 text-white rounded-xl transition-all shadow-lg hover:opacity-90'
                    style={{ backgroundColor: bankHex, boxShadow: `0 10px 40px ${bankHex}40` }}
                >
                    <ArrowRightLeft size={18} />
                    <span className='font-medium text-sm'>Nova Transferência</span>
                </Link>
            </div>
        </header>

        <div className='flex flex-col xl:flex-row gap-6'>
            <div className='w-full xl:w-1/3 space-y-6'>
                {/* Saldo Disponível */}
                <div className='glassmorphism p-6 rounded-3xl relative overflow-hidden group'>
                    <div
                        className='absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl transition-all duration-500 opacity-20 group-hover:opacity-30'
                        style={{ backgroundColor: bankHex }}
                    />
                    <div className='relative z-10'>
                        <span className='text-slate-500 dark:text-slate-400 text-sm font-medium'>Saldo Disponível</span>
                        <div className='mt-2 flex items-baseline gap-1'>
                            <span className='text-slate-400 text-lg font-medium'>R$</span>
                            <h2 className='text-4xl font-display font-bold text-slate-800 dark:text-white'>
                                {Number(account.balance).toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </h2>
                        </div>
                        <div className='mt-6 p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/20 dark:border-slate-700/50 flex items-center justify-between'>
                            <div>
                                <p className='text-xs text-slate-500 dark:text-slate-400 mb-1'>Entradas (Mês)</p>
                                <p className='font-semibold text-green-600 dark:text-green-400'>+ {formatCurrency(monthIncome)}</p>
                            </div>
                            <div className='h-8 w-px bg-slate-200 dark:bg-slate-700' />
                            <div>
                                <p className='text-xs text-slate-500 dark:text-slate-400 mb-1'>Saídas (Mês)</p>
                                <p className='font-semibold text-red-500 dark:text-red-400'>- {formatCurrency(monthExpense)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Investimentos */}
                <div className='glass-card p-6 rounded-3xl'>
                    <div className='flex items-center justify-between mb-4'>
                        <h3 className='font-display font-semibold text-slate-800 dark:text-white'>Investimentos</h3>
                        <button className='text-sm font-medium hover:opacity-80 transition-opacity' style={{ color: bankHex }}>Ver detalhes</button>
                    </div>
                    <div className='space-y-4'>
                        {MOCK_INVESTMENTS.map((inv, idx) => (
                            <div
                                key={inv.name}
                                className='flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer'
                            >
                                <div className='flex items-center gap-3'>
                                    <div
                                        className='w-10 h-10 rounded-xl flex items-center justify-center text-white'
                                        style={{
                                            backgroundColor: `${bankHex}${idx === 0 ? 'CC' : '99'}`,
                                        }}
                                    >
                                        <inv.icon size={20} />
                                    </div>
                                    <div>
                                        <p className='font-medium text-slate-800 dark:text-white text-sm'>{inv.name}</p>
                                        <p className='text-xs text-green-600 font-medium flex items-center gap-0.5'>
                                            <TrendingUp size={12} /> {inv.return}
                                        </p>
                                    </div>
                                </div>
                                <span className='font-semibold text-slate-700 dark:text-slate-300'>{formatCurrency(inv.value)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Categorias de Gastos */}
                <div className='glass-card p-6 rounded-3xl'>
                    <h3 className='font-display font-semibold text-slate-800 dark:text-white mb-5'>Categorias de Gastos</h3>
                    <div className='flex items-center gap-6'>
                        <div className='relative w-20 h-20 flex-shrink-0'>
                            <svg className='w-full h-full transform -rotate-90' viewBox='0 0 36 36'>
                                <circle className='stroke-slate-100 dark:stroke-slate-800' cx='18' cy='18' fill='none' r='16' strokeWidth={4} />
                                {categoriesWithPercent.length > 0 ? (
                                    categoriesWithPercent.map((cat, i) => {
                                        const prevOffset = categoriesWithPercent
                                            .slice(0, i)
                                            .reduce((s, c) => s + (c.percentage / 100) * 100, 0);
                                        const dashArray = `${(cat.percentage / 100) * 100}, 100`;
                                        const dashOffset = -prevOffset;
                                        const isFirst = i === 0;
                                        return (
                                            <circle
                                                key={cat.name}
                                                className={isFirst ? '' : CHART_COLOR_CLASSES[(i - 1) % CHART_COLOR_CLASSES.length]}
                                                cx='18'
                                                cy='18'
                                                fill='none'
                                                r='16'
                                                strokeDasharray={dashArray}
                                                strokeDashoffset={dashOffset}
                                                strokeWidth={4}
                                                style={isFirst ? { stroke: bankHex } : undefined}
                                            />
                                        );
                                    })
                                ) : (
                                    <circle cx='18' cy='18' fill='none' r='16' strokeDasharray='100, 100' strokeWidth={4} style={{ stroke: bankHex }} />
                                )}
                            </svg>
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <span className='text-[10px] font-bold text-slate-500'>{Math.round(totalChartPercent)}%</span>
                            </div>
                        </div>
                        <div className='flex-1 space-y-2'>
                            {categoriesWithPercent.length > 0 ? (
                                categoriesWithPercent.map((cat, i) => (
                                    <div key={cat.name} className='flex items-center justify-between text-xs'>
                                        <div className='flex items-center gap-1.5'>
                                            <span
                                                className='w-2 h-2 rounded-full'
                                                style={{ backgroundColor: i === 0 ? bankHex : i === 1 ? '#3b82f6' : '#a855f7' }}
                                            />
                                            <span className='text-slate-600 dark:text-slate-400'>{cat.name}</span>
                                        </div>
                                        <span className='font-semibold'>{cat.percentage.toFixed(0)}%</span>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div className='flex items-center justify-between text-xs'>
                                        <div className='flex items-center gap-1.5'>
                                            <span className='w-2 h-2 rounded-full' style={{ backgroundColor: bankHex }} />
                                            <span className='text-slate-600 dark:text-slate-400'>Alimentação</span>
                                        </div>
                                        <span className='font-semibold'>100%</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Próximas Contas */}
                <div className='glass-card p-6 rounded-3xl'>
                    <div className='flex items-center justify-between mb-4'>
                        <h3 className='font-display font-semibold text-slate-800 dark:text-white'>Próximas Contas</h3>
                        <span
                            className='text-[10px] font-bold px-2 py-0.5 rounded-full border'
                            style={{ backgroundColor: `${bankHex}30`, color: bankHex, borderColor: `${bankHex}50` }}
                        >
                            4 PENDENTES
                        </span>
                    </div>
                    <div className='space-y-3'>
                        {MOCK_BILLS.map((bill, i) => (
                            <div
                                key={bill.name}
                                className={`flex items-center justify-between p-2.5 rounded-xl transition-colors ${
                                    i === 0
                                        ? 'bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/50'
                                        : 'hover:bg-white/40 dark:hover:bg-slate-800/40 border border-transparent hover:border-white/20 dark:hover:border-slate-700/50'
                                }`}
                            >
                                <div className='flex items-center gap-3'>
                                    <div
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                            bill.color === 'red'
                                                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                                : bill.color === 'blue'
                                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                : bill.color === 'green'
                                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                        }`}
                                    >
                                        <bill.icon size={16} />
                                    </div>
                                    <div>
                                        <p className='text-xs font-semibold text-slate-800 dark:text-white'>{bill.name}</p>
                                        <p className='text-[10px] text-slate-500'>Vence em {bill.due} dias</p>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='text-xs font-bold text-slate-800 dark:text-white'>{formatCurrency(bill.amount)}</p>
                                    <p className='text-[10px] text-slate-400'>{bill.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cartões Vinculados */}
                <div className='glass-card p-6 rounded-3xl'>
                    <h3 className='font-display font-semibold text-slate-800 dark:text-white mb-4'>Cartões Vinculados</h3>
                    {primaryCard ? (
                        <>
                            <div className='relative w-full aspect-[1.586] rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-5 text-white shadow-xl overflow-hidden mb-3'>
                                <div className='absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl' />
                                <div
                                    className='absolute bottom-0 left-0 w-24 h-24 rounded-full -ml-10 -mb-10 blur-xl opacity-30'
                                    style={{ backgroundColor: bankHex }}
                                />
                                <div className='flex justify-between items-start mb-6'>
                                    <span className='font-display italic font-bold text-xl'>{primaryCard.brand}</span>
                                    <SmartphoneNfc size={24} className='text-white/60' />
                                </div>
                                <div className='mt-auto'>
                                    <p className='text-slate-400 text-xs mb-1'>Limite</p>
                                    <div className='flex justify-between items-end'>
                                        <span className='text-2xl font-bold tracking-tight'>{formatCurrency(Number(primaryCard.credit_limit))}</span>
                                        <div className='flex flex-col items-end'>
                                            <span className='text-xs text-slate-400 font-mono'>•••• {primaryCard.last_four}</span>
                                            <div className='flex -space-x-2 mt-1'>
                                                <div className='w-6 h-6 rounded-full bg-red-500/80' />
                                                <div className='w-6 h-6 rounded-full bg-yellow-500/80' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link
                                to='/cards'
                                className='w-full py-2 text-sm text-slate-500 dark:text-slate-400 transition-colors font-medium flex items-center justify-center gap-1 hover:opacity-80'
                                style={{ color: bankHex }}
                            >
                                Ver todos cartões <ChevronRight size={16} />
                            </Link>
                        </>
                    ) : (
                        <Link
                            to='/cards/new'
                            className='block py-6 text-center text-slate-500 dark:text-slate-400 transition-colors font-medium hover:opacity-80'
                            style={{ color: bankHex } as React.CSSProperties}
                        >
                            <Plus size={18} />
                            Adicionar cartão
                        </Link>
                    )}
                </div>
            </div>

            {/* Últimas Transações */}
            <div className='w-full xl:w-2/3 flex flex-col glassmorphism rounded-3xl overflow-hidden min-h-[600px]'>
                <div className='p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                    <h3 className='font-display font-semibold text-lg text-slate-800 dark:text-white'>Últimas Transações</h3>
                    <div className='flex items-center gap-2'>
                        <div className='relative'>
                            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' size={18} />
                            <input
                                type='text'
                                placeholder='Buscar...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 outline-none w-full sm:w-48 transition-all text-slate-800 dark:text-white'
                                style={{ ['--tw-ring-color' as string]: bankHex }}
                            />
                        </div>
                        <button className='p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors'>
                            <Filter size={18} />
                        </button>
                        <button className='p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors'>
                            <Download size={18} />
                        </button>
                    </div>
                </div>
                <div className='overflow-y-auto flex-1 p-2 space-y-1 hide-scrollbar'>
                    {accountTransactions.length > 0 ? (
                        Object.entries(groupedByDate).map(([label, items]) => (
                            <div key={label}>
                                <div className='sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 z-10'>
                                    {label}
                                </div>
                                {items.map((t) => (
                                    <div
                                        key={t.id}
                                        className='flex items-center justify-between p-4 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-2xl transition-all cursor-pointer group'
                                    >
                                        <div className='flex items-center gap-4'>
                                            <TransactionIcon categoryName={t.categories?.name} type={t.type} variant='detailed' />
                                            <div>
                                                <p className='font-semibold text-slate-800 dark:text-white text-sm'>{t.description ?? 'Transação'}</p>
                                                <p className='text-xs text-slate-500 dark:text-slate-400'>
                                                    {t.categories?.name ?? '—'} •{' '}
                                                    {new Date(t.date).toLocaleTimeString('pt-BR', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <span
                                            className={`font-bold ${
                                                t.type === 'income'
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-slate-800 dark:text-white'
                                            }`}
                                        >
                                            {t.type === 'income' ? '+' : '-'} {formatCurrency(Number(t.amount))}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className='py-16 text-center text-slate-500 dark:text-slate-400 text-sm'>
                            Nenhuma transação nesta conta
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);
}