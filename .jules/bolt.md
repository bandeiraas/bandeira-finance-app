## 2024-05-15 - [TransactionService Performance Pattern]
**Learning:** The database schema types financial `amount` fields as `number` so `Number(t.amount)` casts are redundant. Also, the API calculates `totalIncome`, `totalExpenses`, and groups categories using multiple `.filter()` and `.reduce()` iterations. Consolidating this into a single pass reduces complexity from O(k*N) to O(N).
**Action:** Replace sequential array passes with a single `for...of` or `reduce` loop and eliminate redundant `Number()` type casts.

## 2025-01-20 - Intl Formatters Performance Bottleneck
**Learning:** Instantiating Intl.*Format objects (like Intl.NumberFormat and Intl.DateTimeFormat) on each function call or in loops causes severe performance bottlenecks, taking significantly more time than reusing an instance.
**Action:** Pre-compute or cache Intl.*Format instances at the module level outside of iterative loops or frequently called formatting functions.

## 2025-01-22 - Conic Gradient String Calculation Optimization
**Learning:** In React components within `apps/web`, dynamically building complex `conic-gradient` strings using inline O(N^2) array methods (`.map()` with nested `.slice().reduce()`) on every render degrades frontend performance, particularly when elements rely heavily on re-renders (like tooltips or live charts).
**Action:** Consolidate the calculation into an O(N) `for...of` loop that maintains a running percentage total, and wrap the entire string generation in a `useMemo` block with proper dependencies to guarantee stable execution.
