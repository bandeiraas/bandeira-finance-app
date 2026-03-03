const fs = require('fs');

let tests = fs.readFileSync('apps/api/src/services/__tests__/CardService.test.ts', 'utf8');

// The error is complaining that due_day and closing_day are missing from the mock CreateCardDTO

tests = tests.replace(/brand: 'mastercard',\n                last_four: '9999',\n                expiry: '12\/30',\n                card_name: 'Cartão Básico',\n                credit_limit: 500,\n            }/,
`brand: 'mastercard',
                last_four: '9999',
                expiry: '12/30',
                card_name: 'Cartão Básico',
                credit_limit: 500,
                due_day: 10,
                closing_day: 5,
            }`);

tests = tests.replace(/brand: 'visa',\n                last_four: '4321',\n                expiry: '10\/29',\n                card_name: 'Cartão Falho',\n                credit_limit: 1000,\n            }/,
`brand: 'visa',
                last_four: '4321',
                expiry: '10/29',
                card_name: 'Cartão Falho',
                credit_limit: 1000,
                due_day: 10,
                closing_day: 5,
            }`);

fs.writeFileSync('apps/api/src/services/__tests__/CardService.test.ts', tests);
console.log('Fixed Test missing fields');
