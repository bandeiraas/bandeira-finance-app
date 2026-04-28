export function test() {
    const transactions = [{type: 'income', amount: 10, categories: {name: 'A'}}, {type: 'expense', amount: 20, categories: {name: 'B'}}, {type: 'expense', amount: 30, categories: {name: 'A'}}];

    let income = 0;
    let expense = 0;
    const catTotals: Record<string, number> = {};

    for (const t of transactions) {
        const amount = t.amount;
        if (t.type === 'income') {
            income += amount;
        } else if (t.type === 'expense') {
            expense += amount;
            const name = t.categories?.name ?? 'Outros';
            catTotals[name] = (catTotals[name] ?? 0) + amount;
        }
    }

    console.log(income, expense, catTotals);
}
test();
