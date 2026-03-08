## 2024-03-05 - Add ARIA Roles and States to Interactive Dropdowns

**Learning:** Interactive dropdown menus (like the UserMenu component) frequently omit crucial ARIA roles and state attributes (`aria-expanded`, `aria-haspopup`, `role="menu"`, `role="menuitem"`), rendering them invisible or confusing to screen reader users who cannot visually perceive the menu's state or structure.

**Action:** Always verify that interactive dropdown buttons include `aria-expanded` tied to the state variable and `aria-haspopup="menu"`. Ensure the dropdown container has `role="menu"` and its actionable children have `role="menuitem"` to maintain structural semantics.

## 2024-03-08 - Icon-only Navigation and Screen Readers

**Learning:** Responsive designs often hide text labels on smaller screens to save space (e.g., using `hidden lg:block` alongside an icon). However, if the element doesn't have an `aria-label`, it becomes an unlabelled button to screen readers on mobile devices, leading to a confusing and inaccessible experience.

**Action:** Always verify that navigation elements and interactive buttons have fallback `aria-label` and `title` attributes, even if they have visible text on larger screens. Additionally, floating action buttons (FABs) that open menus should include `aria-haspopup="menu"` and `aria-expanded`.
