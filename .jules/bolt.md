## 2024-03-03 - Performance Pattern in getMonthlySummary
**Learning:** Found O(k*N) multi-pass array iterations for filtering and calculating totals (e.g., `filter(...).reduce(...)` multiple times) in `apps/api/src/services/TransactionService.ts` and React components.
**Action:** Replace multiple `.filter` and `.reduce` calls with a single `reduce` or `for...of` pass to improve performance from O(3N) to O(N).
