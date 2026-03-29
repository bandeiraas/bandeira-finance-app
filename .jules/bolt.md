## 2024-05-15 - [TransactionService Performance Pattern]
**Learning:** The database schema types financial `amount` fields as `number` so `Number(t.amount)` casts are redundant. Also, the API calculates `totalIncome`, `totalExpenses`, and groups categories using multiple `.filter()` and `.reduce()` iterations. Consolidating this into a single pass reduces complexity from O(k*N) to O(N).
**Action:** Replace sequential array passes with a single `for...of` or `reduce` loop and eliminate redundant `Number()` type casts.

## 2024-05-24 - Cache Intl formatter instances to improve rendering performance
**Learning:** Instantiating `Intl.NumberFormat` and `Intl.DateTimeFormat` on every function call or render is a severe performance bottleneck. It's approximately 80x slower than reusing a cached instance. Since these formatters are stateless, they can be safely cached outside function scopes.
**Action:** When creating formatting utility functions (e.g. for currency or dates) using the `Intl` API, always define the formatter instances once outside the function and call `.format(value)` on the cached instances inside the function.
