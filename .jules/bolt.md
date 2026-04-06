## 2024-05-15 - [TransactionService Performance Pattern]
**Learning:** The database schema types financial `amount` fields as `number` so `Number(t.amount)` casts are redundant. Also, the API calculates `totalIncome`, `totalExpenses`, and groups categories using multiple `.filter()` and `.reduce()` iterations. Consolidating this into a single pass reduces complexity from O(k*N) to O(N).
**Action:** Replace sequential array passes with a single `for...of` or `reduce` loop and eliminate redundant `Number()` type casts.

## 2024-11-20 - Global caching of Intl instances
**Learning:** V8 engine heavily penalizes frequent instantiations of `Intl.NumberFormat` and `Intl.DateTimeFormat`. In applications like Bandeira that format large lists of currency values or dates on the client side, instantiating these inside mapping functions or tight loops causes noticeable UI thread blocking.
**Action:** Always extract and cache `Intl` formatter instances globally or via React's `useMemo` at the top level of modules, reusing them for all `.format()` calls.
