## 2024-05-15 - [TransactionService Performance Pattern]
**Learning:** The database schema types financial `amount` fields as `number` so `Number(t.amount)` casts are redundant. Also, the API calculates `totalIncome`, `totalExpenses`, and groups categories using multiple `.filter()` and `.reduce()` iterations. Consolidating this into a single pass reduces complexity from O(k*N) to O(N).
**Action:** Replace sequential array passes with a single `for...of` or `reduce` loop and eliminate redundant `Number()` type casts.

## 2024-05-16 - [Intl Object Instantiation Overhead]
**Learning:** Instantiating `Intl.NumberFormat` and `Intl.DateTimeFormat` is extremely slow. Recreating these instances inside utility functions like `formatCurrency` and `formatDate` creates a severe performance bottleneck when iterating over long lists (e.g., transaction tables), taking ~70-90x more time compared to reusing a single instance.
**Action:** Always pre-compute and cache `Intl` instances outside of iterative logic or utility functions instead of re-instantiating them on every function call.
