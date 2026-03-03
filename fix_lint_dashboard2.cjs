const fs = require('fs');

let dashboard = fs.readFileSync('apps/web/src/pages/Dashboard.tsx', 'utf8');

// Replace unused import
dashboard = dashboard.replace(/import { useState, useEffect } from "react";/, 'import { useState } from "react";');

fs.writeFileSync('apps/web/src/pages/Dashboard.tsx', dashboard);
console.log('Fixed Dashboard unused import');
