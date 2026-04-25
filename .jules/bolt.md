## 2024-05-15 - [TransactionService Performance Pattern]
**Learning:** The database schema types financial `amount` fields as `number` so `Number(t.amount)` casts are redundant. Also, the API calculates `totalIncome`, `totalExpenses`, and groups categories using multiple `.filter()` and `.reduce()` iterations. Consolidating this into a single pass reduces complexity from O(k*N) to O(N).
**Action:** Replace sequential array passes with a single `for...of` or `reduce` loop and eliminate redundant `Number()` type casts.

## 2025-01-20 - Intl Formatters Performance Bottleneck
**Learning:** Instantiating Intl.*Format objects (like Intl.NumberFormat and Intl.DateTimeFormat) on each function call or in loops causes severe performance bottlenecks, taking significantly more time than reusing an instance.
**Action:** Pre-compute or cache Intl.*Format instances at the module level outside of iterative loops or frequently called formatting functions.

## 2024-04-25 - React Loop Performance Bug: Implicit Intl.DateTimeFormat
**Learning:** Implicit date formatting via `toLocaleDateString()` acts as a hidden `Intl.DateTimeFormat` instantiation, causing significant bottlenecks inside `useMemo` array iterations.
**Action:** Always extract and export explicitly cached `Intl.DateTimeFormat` instances from utility files and use `.format()` instead when iterating.
