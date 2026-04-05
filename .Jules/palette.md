## 2024-03-05 - Add ARIA Roles and States to Interactive Dropdowns

**Learning:** Interactive dropdown menus (like the UserMenu component) frequently omit crucial ARIA roles and state attributes (`aria-expanded`, `aria-haspopup`, `role="menu"`, `role="menuitem"`), rendering them invisible or confusing to screen reader users who cannot visually perceive the menu's state or structure.

**Action:** Always verify that interactive dropdown buttons include `aria-expanded` tied to the state variable and `aria-haspopup="menu"`. Ensure the dropdown container has `role="menu"` and its actionable children have `role="menuitem"` to maintain structural semantics.
## 2024-04-05 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Icon-only buttons (like the Download, Monthly Navigation, or Delete buttons) can create an ambiguous experience for screen reader users if missing an `aria-label`. `title` attributes on hover are not always a sufficient replacement for explicit `aria-label` accessibility, which is the primary hook for assistive technology.
**Action:** Always check `<button>` and interactive elements that lack text contents inside to ensure they have an `aria-label` describing their action.
