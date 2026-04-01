## 2024-05-15 - [TransactionService Performance Pattern]
**Learning:** The database schema types financial `amount` fields as `number` so `Number(t.amount)` casts are redundant. Also, the API calculates `totalIncome`, `totalExpenses`, and groups categories using multiple `.filter()` and `.reduce()` iterations. Consolidating this into a single pass reduces complexity from O(k*N) to O(N).
**Action:** Replace sequential array passes with a single `for...of` or `reduce` loop and eliminate redundant `Number()` type casts.

## 2024-05-16 - [Intl Formatter Performance Bottleneck]
**Learning:** Recreating `Intl.NumberFormat` and `Intl.DateTimeFormat` instances on every function call is surprisingly expensive and creates a significant performance bottleneck during list rendering and data aggregation.
**Action:** Always pre-compute and cache `Intl.*Format` instances in the module scope and reuse them across function calls instead of re-instantiating them repeatedly.
