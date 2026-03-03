const fs = require('fs');
const file = 'apps/web/src/features/cards/pages/AddCard.tsx';
let content = fs.readFileSync(file, 'utf8');

// replace useEffects
content = content.replace(/    useEffect\(\(\) => {\n        if \(accounts && accounts.length > 0 && !accountId\) {\n            setAccountId\(accounts\[0\]\.id\);\n        }\n    }, \[accounts, accountId\]\);\n\n    useEffect\(\(\) => {\n        if \(selectedAccount\) {\n            setColorVariationIndex\(2\); \/\/ base da cor do banco ao trocar conta\n        }\n    }, \[accountId, accounts\]\);/, '');

// Add derived state logic
content = content.replace(/    const createCard = useCreateCard\(\);/, `    const createCard = useCreateCard();
    const activeAccountId = accountId || (accounts && accounts.length > 0 ? accounts[0].id : "");`);

// Update references to use activeAccountId
content = content.replace(/const selectedAccount = accounts\?\.find\(\(a\) => a\.id === accountId\);/, `const selectedAccount = accounts?.find((a) => a.id === activeAccountId);`);

content = content.replace(/if \(!accountId\) {/, `if (!activeAccountId) {`);

content = content.replace(/            account_id: accountId,/, `            account_id: activeAccountId,`);

content = content.replace(/                                value={accountId}\n                                onChange={\(e\) => setAccountId\(e\.target\.value\)}/g,
`                                value={activeAccountId}
                                onChange={(e) => {
                                    setAccountId(e.target.value);
                                    setColorVariationIndex(2);
                                }}`);


fs.writeFileSync(file, content);
console.log('Fixed AddCard.tsx');
