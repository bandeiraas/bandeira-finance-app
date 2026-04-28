import React, { useMemo } from 'react';

export function test() {
    const transactions = [{type: 'income', amount: 10, categories: {name: 'A'}}, {type: 'expense', amount: 20, categories: {name: 'B'}}, {type: 'expense', amount: 30, categories: {name: 'A'}}];

    const { monthIncome, monthExpense, categoryTotals } = useMemo(() => {
        let income = 0;
        let expense = 0;
        const catTotals: Record<string, number> = {};

        for (const t of transactions) {
            if (t.type === 'income') {
                income += Number(t.amount);
            } else if (t.type === 'expense') {
                expense += Number(t.amount);
                const name = t.categories?.name ?? 'Outros';
                catTotals[name] = (catTotals[name] ?? 0) + Number(t.amount);
            }
        }
        return { monthIncome: income, monthExpense: expense, categoryTotals: catTotals };
    }, [transactions]);

    console.log(monthIncome, monthExpense, categoryTotals);
}
test();
