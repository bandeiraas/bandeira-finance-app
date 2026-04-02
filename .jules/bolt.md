## 2024-05-15 - [TransactionService Performance Pattern]
**Learning:** The database schema types financial `amount` fields as `number` so `Number(t.amount)` casts are redundant. Also, the API calculates `totalIncome`, `totalExpenses`, and groups categories using multiple `.filter()` and `.reduce()` iterations. Consolidating this into a single pass reduces complexity from O(k*N) to O(N).
**Action:** Replace sequential array passes with a single `for...of` or `reduce` loop and eliminate redundant `Number()` type casts.

## 2024-05-16 - [Financial Aggregation Performance Pattern]
**Learning:** In frontend components like `AccountDetail.tsx`, aggregating financial data (totals, categorizations) by repeatedly chaining `.filter().reduce()` for each metric causes significant performance overhead (O(k*N)) and unnecessary memory allocations for intermediate arrays.
**Action:** When calculating multiple aggregated fields over a single dataset, consolidate the logic into a single pass using a `for...of` loop or a single `.reduce()` to improve time complexity to O(N).
