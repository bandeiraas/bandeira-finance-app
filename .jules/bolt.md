## 2024-05-15 - [TransactionService Performance Pattern]
**Learning:** The database schema types financial `amount` fields as `number` so `Number(t.amount)` casts are redundant. Also, the API calculates `totalIncome`, `totalExpenses`, and groups categories using multiple `.filter()` and `.reduce()` iterations. Consolidating this into a single pass reduces complexity from O(k*N) to O(N).
**Action:** Replace sequential array passes with a single `for...of` or `reduce` loop and eliminate redundant `Number()` type casts.

## 2025-04-04 - Transaction Summary Calculation
**Learning:** Financial summaries like `monthIncome`, `monthExpense`, and `categoryTotals` in AccountDetail were causing performance bottlenecks by iterating the array multiple times with `.filter().reduce()`.
**Action:** Consolidate these multiple loops into a single `for...of` loop to drop the time complexity from O(k*N) to O(N).
