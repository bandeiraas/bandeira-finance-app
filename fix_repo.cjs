const fs = require('fs');

let repo = fs.readFileSync('apps/api/src/repositories/SupabaseTransactionRepository.ts', 'utf8');

// Replace this.TRANSACTION_SELECT with SupabaseTransactionRepository.TRANSACTION_SELECT
repo = repo.replace(/this\.TRANSACTION_SELECT/g, `SupabaseTransactionRepository.TRANSACTION_SELECT`);

fs.writeFileSync('apps/api/src/repositories/SupabaseTransactionRepository.ts', repo);
console.log('Fixed Repo');
