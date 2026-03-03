const fs = require('fs');
const file = 'apps/web/src/pages/Dashboard.tsx';
let code = fs.readFileSync(file, 'utf8');
code = code.replace(/import \{ useState, useEffect \} from "react";/g, 'import { useState } from "react";');
fs.writeFileSync(file, code);
