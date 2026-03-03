const fs = require('fs');

// Fix AddCard.tsx
let addCard = fs.readFileSync('apps/web/src/features/cards/pages/AddCard.tsx', 'utf8');
addCard = addCard.replace(/import { useState, useEffect } from "react";/, 'import { useState } from "react";');
fs.writeFileSync('apps/web/src/features/cards/pages/AddCard.tsx', addCard);
console.log('Fixed AddCard unused useEffect');

// Fix Dashboard.tsx
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
// We know it is used around the card preview. Let's find it.
dashboard = dashboard.replace(/displayCards\[selectedCardIndex\]/g, `displayCards[validCardIndex]`);

// Wait, Dashboard has an effect, we should see what it looks like before rewriting.
