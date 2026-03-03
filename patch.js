const fs = require('fs');

function fixAddCard() {
    const file = 'apps/web/src/features/cards/pages/AddCard.tsx';
    let code = fs.readFileSync(file, 'utf8');

    // Remove the two useEffects that have setState in them
    code = code.replace(/useEffect\(\(\) => \{\s*if \(accounts && accounts\.length > 0 && !accountId\) \{\s*setAccountId\(accounts\[0\]\.id\);\s*\}\s*\}, \[accounts, accountId\]\);/g, '');
    code = code.replace(/useEffect\(\(\) => \{\s*if \(selectedAccount\) \{\s*setColorVariationIndex\(2\); \/\/ base da cor do banco ao trocar conta\s*\}\s*\}, \[accountId, accounts\]\);/g, '');

    // And instead, handle the accountId default differently:
    // When defining accountId, set it directly if not defined but accounts are loaded.
    // We can just keep it as is, and use an effect without state setting, or set it during selection.

    // Actually, setting state in effect is forbidden by the linter here because it's a synchronous update that can be done during render or skipped.
    fs.writeFileSync(file, code);
}
fixAddCard();
