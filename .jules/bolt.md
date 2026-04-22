## 2024-05-15 - [TransactionService Performance Pattern]
**Learning:** The database schema types financial `amount` fields as `number` so `Number(t.amount)` casts are redundant. Also, the API calculates `totalIncome`, `totalExpenses`, and groups categories using multiple `.filter()` and `.reduce()` iterations. Consolidating this into a single pass reduces complexity from O(k*N) to O(N).
**Action:** Replace sequential array passes with a single `for...of` or `reduce` loop and eliminate redundant `Number()` type casts.

## 2025-01-20 - Intl Formatters Performance Bottleneck
**Learning:** Instantiating Intl.*Format objects (like Intl.NumberFormat and Intl.DateTimeFormat) on each function call or in loops causes severe performance bottlenecks, taking significantly more time than reusing an instance.
**Action:** Pre-compute or cache Intl.*Format instances at the module level outside of iterative loops or frequently called formatting functions.

## 2024-05-24 - Optimizing complex string generations in React
**Learning:** Using `array.map` with nested `.slice().reduce()` for generating CSS styles like `conic-gradient` inside render causes O(N^2) recalculations on every render.
**Action:** Always wrap intensive string derivations from arrays in a `useMemo` block and use a single O(N) loop to track running totals instead of recreating them on every iteration. Also, ensure all React hooks are placed before early returns.
