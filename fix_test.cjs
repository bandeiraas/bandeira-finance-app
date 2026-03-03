const fs = require('fs');

let tests = fs.readFileSync('apps/api/src/services/__tests__/CardService.test.ts', 'utf8');

tests = tests.replace(/brand: 'Mastercard'/g, `brand: 'mastercard'`);
tests = tests.replace(/brand: 'Visa'/g, `brand: 'visa'`);

fs.writeFileSync('apps/api/src/services/__tests__/CardService.test.ts', tests);
console.log('Fixed Test');
