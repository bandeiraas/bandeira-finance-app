# Design System (Stitch Fidelity)

## 1. Typography
- **Headings (Display)**: `Outfit` (sans-serif) - Weights: 400, 500, 600, 700
- **Body**: `Inter` (sans-serif) - Weights: 300, 400, 500, 600, 700

## 2. Colors
### Base
- **Background**: `bg-mesh` (Radial Gradients) - Slate 950 base with localized highlights.
- **Glass**: `bg-slate-900/40` + `backdrop-blur-md`
- **Primary Text**: White (in dark mode) / Slate 800 (light mode)
- **Secondary Text**: Slate 400

### Accents
- **Primary Blue**: `#0ea5e9` (Sky 500/600)
- **Purple**: `#8b5cf6` (Violet 500)
- **Pink/Rose**: `#f43f5e` (Rose 500)
- **Amber**: `#f59e0b` (Amber 500)
- **Emerald**: `#10b981` (Emerald 500)

## 3. Effects & Utilities
### Glassmorphism
```css
.glassmorphism {
    @apply bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-700/30;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
}
```

### Background Mesh
```css
.bg-mesh {
    background-color: #0f172a;
    background-image: 
        radial-gradient(at 0% 0%, hsla(222,47%,12%,1) 0, transparent 50%), 
        radial-gradient(at 100% 0%, hsla(222,47%,8%,1) 0, transparent 50%);
}
```

## 4. Layout
- **Sidebar**: Floating, glassmorphic, rounded corners (`rounded-3xl`), detached from edges on desktop.
- **Mobile Navigation**: "Glass Island" design. Floating bottom bar (`rounded-3xl`), detached from edges with glassmorphism and shadow.
- **Cards**: Glassmorphic, `rounded-2xl` or `rounded-3xl`.
- **Login**: Split layout (Left: Dark Gradient with mesh, Right: White form).

## 5. Components
- **Buttons**: Rounded-xl, minimal borders.
- **Inputs**: Rounded-xl, large padding. Backgrounds: `bg-slate-50` (Light) / `bg-slate-800` (Dark).
- **Modals**: Glassmorphic overlay (`bg-slate-900/20`), Card with `rounded-3xl` and `max-h-[90vh]`.
