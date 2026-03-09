## 2024-05-15 - [TransactionService Performance Pattern]
**Learning:** The database schema types financial `amount` fields as `number` so `Number(t.amount)` casts are redundant. Also, the API calculates `totalIncome`, `totalExpenses`, and groups categories using multiple `.filter()` and `.reduce()` iterations. Consolidating this into a single pass reduces complexity from O(k*N) to O(N).
**Action:** Replace sequential array passes with a single `for...of` or `reduce` loop and eliminate redundant `Number()` type casts.

## 2024-06-05 - [Component Level Array Iteration Optimization]
**Learning:** Frontend React components often use multiple sequential `.filter().reduce()` chains to calculate various metrics (e.g., total income, total expense, category breakdowns) over the same data array during rendering. This results in redundant O(k*N) iterations on every render.
**Action:** Consolidate these multiple array aggregations into a single `.reduce()` pass returning an object with all the required computed values, improving render performance to O(N).
