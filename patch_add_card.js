import fs from 'fs';
const file = '/app/apps/web/src/features/cards/pages/AddCard.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
`    useEffect(() => {
        if (accounts && accounts.length > 0 && !accountId) {
            setAccountId(accounts[0].id);
        }
    }, [accounts, accountId]);

    useEffect(() => {
        if (selectedAccount) {
            setColorVariationIndex(2); // base da cor do banco ao trocar conta
        }
    }, [accountId, accounts]);`,
`    if (accounts && accounts.length > 0 && !accountId) {
        setAccountId(accounts[0].id);
    }`
);
fs.writeFileSync(file, content);
