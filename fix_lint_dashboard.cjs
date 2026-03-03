const fs = require('fs');

let dashboard = fs.readFileSync('apps/web/src/pages/Dashboard.tsx', 'utf8');

// Replace the effect setting state synchronously with a derived state check or render-time clamp
dashboard = dashboard.replace(
`    useEffect(() => {
        const max = Math.max(0, displayCards.length - 1);
        if (selectedCardIndex > max) setSelectedCardIndex(0);
    }, [displayCards.length, selectedCardIndex]);`,
`    const maxIndex = Math.max(0, displayCards.length - 1);
    const validCardIndex = selectedCardIndex > maxIndex ? 0 : selectedCardIndex;`
);

// We need to change any reference to selectedCardIndex to validCardIndex
// Wait, selectedCardIndex is only used here:
// const isSelected = index === validCardIndex;
dashboard = dashboard.replace(/const isSelected = index === selectedCardIndex;/g, `const isSelected = index === validCardIndex;`);

fs.writeFileSync('apps/web/src/pages/Dashboard.tsx', dashboard);
console.log('Fixed Dashboard.tsx sync effect state update');
