## 2024-05-15 - [TransactionService Performance Pattern]
**Learning:** The database schema types financial `amount` fields as `number` so `Number(t.amount)` casts are redundant. Also, the API calculates `totalIncome`, `totalExpenses`, and groups categories using multiple `.filter()` and `.reduce()` iterations. Consolidating this into a single pass reduces complexity from O(k*N) to O(N).
**Action:** Replace sequential array passes with a single `for...of` or `reduce` loop and eliminate redundant `Number()` type casts.

## 2024-05-15 - [Intl Formatters Optimization]
**Learning:** Instantiating `Intl.NumberFormat` or `Intl.DateTimeFormat` on every function call (e.g., in utility files used inside loops or React renders) introduces severe performance bottlenecks.
**Action:** Cache these formatter instances outside the function scope so they are reused across invocations.
