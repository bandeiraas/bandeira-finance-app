import fs from 'fs';
const file = '/app/apps/web/src/pages/Dashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
`    useEffect(() => {
        const max = Math.max(0, displayCards.length - 1);
        if (selectedCardIndex > max) setSelectedCardIndex(0);
    }, [displayCards.length, selectedCardIndex]);`,
`    if (selectedCardIndex > Math.max(0, displayCards.length - 1)) {
        setSelectedCardIndex(0);
    }`
);
fs.writeFileSync(file, content);
