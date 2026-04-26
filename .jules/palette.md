## 2024-04-26 - Add aria-label to icon-only buttons
**Learning:** Found an icon-only button without an `aria-label` attribute in the cards section (copy to clipboard button). This is a common accessibility violation. Adding an `aria-label` ensures screen readers can announce the purpose of the button correctly to users with visual impairments.
**Action:** Consistently review new and existing icon-only buttons (`<button><Icon/></button>`) across the application to ensure they all possess a descriptive `aria-label`.
