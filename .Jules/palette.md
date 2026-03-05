## 2024-03-05 - Add ARIA Roles and States to Interactive Dropdowns

**Learning:** Interactive dropdown menus (like the UserMenu component) frequently omit crucial ARIA roles and state attributes (`aria-expanded`, `aria-haspopup`, `role="menu"`, `role="menuitem"`), rendering them invisible or confusing to screen reader users who cannot visually perceive the menu's state or structure.

**Action:** Always verify that interactive dropdown buttons include `aria-expanded` tied to the state variable and `aria-haspopup="menu"`. Ensure the dropdown container has `role="menu"` and its actionable children have `role="menuitem"` to maintain structural semantics.
