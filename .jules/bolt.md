## 2024-05-15 - [TransactionService Performance Pattern]
**Learning:** The database schema types financial `amount` fields as `number` so `Number(t.amount)` casts are redundant. Also, the API calculates `totalIncome`, `totalExpenses`, and groups categories using multiple `.filter()` and `.reduce()` iterations. Consolidating this into a single pass reduces complexity from O(k*N) to O(N).
**Action:** Replace sequential array passes with a single `for...of` or `reduce` loop and eliminate redundant `Number()` type casts.

## 2026-04-05 - Pre-computing Intl formatters
**Learning:** Instantiating `Intl.NumberFormat` and `Intl.DateTimeFormat` inside utility formatting functions that are called repeatedly (e.g., inside loops rendering table rows or dashboard lists) creates a significant performance bottleneck. In benchmark tests, caching the `Intl` formatter instances reduced execution time from ~7000ms to ~80ms for 100,000 iterations.
**Action:** Always pre-compute and cache `Intl` formatter instances outside of iterative array loops or frequently called utility formatting functions to avoid performance degradation.
