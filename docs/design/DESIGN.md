# Design System — FinTrack (Bandeira Finance)

Este documento consolida todas as regras de design utilizadas na aplicação `apps/web`. Baseado em Stitch Fidelity, Tailwind CSS e componentes shadcn/ui.

---

## 1. Stack e Ferramentas

- **Tailwind CSS** — utility-first
- **shadcn/ui** — componentes base (Radix, Tailwind, TypeScript)
- **Lucide React** — ícones principais
- **Material Symbols Outlined** — ícones secundários (ex.: `paid`)
- **clsx + tailwind-merge** — utilitário `cn()` para merge de classes
- **Dark mode** — `class` strategy (`dark:` prefix)

---

## 2. Tipografia

| Uso | Fonte | Pesos | Classe Tailwind |
|-----|-------|-------|-----------------|
| **Headings / Display** | Outfit | 400, 500, 600, 700 | `font-display` |
| **Body** | Inter | 300, 400, 500, 600, 700 | `font-sans` / `font-body` |

**Fontes carregadas em** `index.html`:
```html
Inter:wght@300;400;500;600;700
Outfit:wght@400;500;600;700
Material+Symbols+Outlined
```

**Padrões de tamanho:**
- Títulos de página: `text-3xl font-display font-bold`
- Labels de seção: `text-[10px] font-bold uppercase tracking-[0.2em]` ou `tracking-wider`
- Texto secundário: `text-sm` ou `text-xs`
- Texto de destaque numérico: `text-xl` ou `text-2xl font-display font-bold`

---

## 3. Cores

### 3.1 Base e Background

| Token | Valor | Uso |
|-------|-------|-----|
| `background` | `#0f172a` (Slate 900) | fundo principal em dark |
| `surface` | `#1e293b` (Slate 800) | superfícies elevadas |
| `border` | `#334155` (Slate 700) | bordas |
| `primary` | `#0ea5e9` (Sky 500) | cor de destaque principal |
| `primary-foreground` | `#ffffff` | texto em fundo primary |

### 3.2 Cores Semânticas

| Token | Cor | Uso |
|-------|-----|-----|
| `success` | Emerald `#10b981` | receitas, positivo, disponível |
| `danger` | Rose `#f43f5e` | despesas, erros, destrutivo |
| `warning` | Amber `#f59e0b` | alertas, faturas |

### 3.3 Cores por Contexto

- **Receita / Positivo**: `emerald-500`, `bg-emerald-500/10`, `text-emerald-500`
- **Despesa / Negativo**: `rose-500`, `bg-rose-500/10`, `text-rose-500`
- **Faturas / Neutro-destaque**: `amber-500`
- **Dica / Info**: `indigo-500`, `sky-500`

### 3.4 Modo Claro vs Escuro

- **Texto principal**: `text-slate-900 dark:text-white` ou `text-slate-800 dark:text-slate-200`
- **Texto secundário**: `text-slate-600 dark:text-slate-400` ou `text-slate-500 dark:text-slate-400`
- **Body base**: `color: #1e293b` (claro) / `color: #cbd5e1` (dark, slate-300)

### 3.5 Marcas de Bancos (Tailwind)

```js
bank: {
  nubank: '#820ad1', itau: '#ec7000', bradesco: '#cc092f',
  santander: '#ec0000', bb: '#ffc629', inter: '#ff7a00',
  c6: '#6366f1', caixa: '#0066b3', default: '#0ea5e9'
}
```

---

## 4. Efeitos e Utilitários CSS

### 4.1 Glassmorphism

```css
.glassmorphism {
  @apply bg-white/40 dark:bg-slate-900/40 backdrop-blur-md 
         border border-white/20 dark:border-slate-700/30;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
}
.dark .glassmorphism { box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2); }
```

### 4.2 Glass Card (hover)

```css
.glass-card {
  @apply glassmorphism hover:bg-white/50 dark:hover:bg-slate-900/50 
         transition-all duration-300;
}
```

### 4.3 Background Mesh

**Modo claro:**
```css
.bg-mesh {
  background-color: #f8fafc;
  background-image:
    radial-gradient(at 0% 0%, hsla(210, 100%, 98%, 1) 0, transparent 50%),
    radial-gradient(at 50% 0%, hsla(210, 100%, 96%, 1) 0, transparent 50%),
    radial-gradient(at 100% 0%, hsla(210, 100%, 94%, 1) 0, transparent 50%);
}
```

**Modo escuro:**
```css
.dark .bg-mesh {
  background-color: #0f172a;
  background-image:
    radial-gradient(at 0% 0%, hsla(222, 47%, 12%, 1) 0, transparent 50%),
    radial-gradient(at 100% 0%, hsla(222, 47%, 8%, 1) 0, transparent 50%);
}
```

### 4.4 Esconder Scrollbar

```css
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
```

---

## 5. Border Radius (Tailwind extend)

| Token | Valor |
|-------|-------|
| `rounded-lg` | 12px |
| `rounded-xl` | 20px |
| `rounded-2xl` | 28px |
| `rounded-3xl` | 36px |

**Padrão de uso:**
- Cards, modais, seções: `rounded-2xl` ou `rounded-3xl`
- Botões, inputs: `rounded-xl` ou `rounded-lg`
- Badges, pills: `rounded-full` ou `rounded-lg`

---

## 6. Layout

### 6.1 Container Principal

- `flex h-screen bg-mesh font-body overflow-hidden transition-colors duration-300`
- `body`: `antialiased font-sans min-h-screen selection:bg-primary/30`

### 6.2 Sidebar (Desktop)

- **Classe**: `glassmorphism rounded-3xl m-4`
- **Largura**: `w-20` (colapsada) / `lg:w-64` (expandida)
- **Posição**: flutuante, não colada às bordas
- **Itens de navegação**: `rounded-xl`, estado ativo com `bg-white/60 dark:bg-slate-800/60`
- **Ícone ativo**: `text-primary` + `drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]`

### 6.3 Navegação Mobile ("Glass Island")

- **Posição**: `fixed bottom-6 left-1/2 -translate-x-1/2`
- **Largura**: `w-[90%] max-w-sm`
- **Estilo**: `glassmorphism rounded-3xl px-6 py-3 shadow-lg dark:shadow-sky-900/40`
- **FAB central**: `w-14 h-14 bg-gradient-to-tr from-sky-500 to-violet-600 rounded-full`, `ring-4 ring-slate-300/80 dark:ring-slate-900`
- **Menu do FAB**: links para Receita (emerald) e Despesa (rose) com hover `scale-105`

### 6.4 Header Mobile

- `sm:hidden`, `glassmorphism m-4 rounded-2xl`
- Logo + toggle de tema

### 6.5 Área de Conteúdo

- `flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 hide-scrollbar pb-28 sm:pb-8` (pb para nav mobile)
- Texto: `text-slate-900 dark:text-slate-300`

### 6.6 Elementos Decorativos de Fundo

```jsx
<div className="fixed top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/10 dark:bg-primary/20 blur-3xl rounded-full pointer-events-none z-0" />
<div className="fixed bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-500/5 dark:bg-purple-600/10 blur-3xl rounded-full pointer-events-none z-0" />
```

---

## 7. Componentes de UI

### 7.1 Button

**Variantes**: `primary` | `secondary` | `ghost` | `danger`  
**Tamanhos**: `sm` | `md` | `lg`

- Base: `rounded-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary`
- `primary`: `bg-primary text-primary-foreground hover:bg-primary/90`
- `secondary`: `bg-surface text-text-primary hover:bg-surface/80`
- `ghost`: `hover:bg-surface hover:text-text-primary`
- `danger`: `bg-danger text-white hover:bg-danger/90`

### 7.2 Card

- Base: `rounded-lg border border-border bg-surface text-text-primary shadow-sm`
- **CardHeader**: `flex flex-col space-y-1.5 p-6`
- **CardTitle**: `text-2xl font-semibold leading-none tracking-tight text-white`
- **CardContent**: `p-6 pt-0`

### 7.3 Input

- `h-10 rounded-lg border border-border bg-background`
- `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`
- `placeholder:text-text-secondary` / `text-text-primary`
- Modo auth (Login/Register): `pl-10/11 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900`

### 7.4 Modais

- Overlay: `fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-300`
- Container: `max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700 max-h-[90vh]`

---

## 8. Páginas Específicas

### 8.1 Login

- **Layout**: split — esquerda escura, direita branca
- **Lado esquerdo**: `bg-slate-900`, gradientes `from-slate-900 to-slate-800`, blobs `bg-primary/20`, `bg-blue-600/20`
- **Lado direito**: `bg-white`, formulário centralizado
- Inputs: ícone à esquerda (`pl-10`), `rounded-xl`, `border-slate-200`
- Botão submit: `bg-slate-900 hover:bg-slate-800 rounded-xl`
- Erro: `bg-red-50 border border-red-200 text-red-700 rounded-xl`

### 8.2 Landing

- Fundo: `bg-slate-900` com gradientes e blobs animados (`animate-pulse`)
- Hero: `font-display text-5xl sm:text-6xl lg:text-7xl`
- CTA primário: `bg-primary hover:bg-primary/90 rounded-2xl shadow-xl shadow-primary/20`
- Cards de features: `glassmorphism bg-white/5 border-white/10 rounded-3xl` com `rotate-2`, `-rotate-1` etc.

### 8.3 Register

- Fundo: `bg-[linear-gradient(135deg,#f8fafc_0%,#e2e8f0_100%)]`
- Blobs: `bg-sky-500/10`, `bg-blue-600/10`
- Card do form: `bg-white/95 backdrop-blur-[20px] rounded-3xl` com sombra custom

### 8.4 Dashboard / Conteúdo Interno

- Seções com `glassmorphism` ou `glass-card`
- Grid: `grid-cols-1 lg:grid-cols-12`, coluna principal `lg:col-span-8`
- Cards de conta: `glass-card p-5 rounded-2xl` com `hover:-translate-y-1`
- Transações: ícone `rounded-xl` ou `rounded-2xl`, `bg-emerald-500/10` ou `bg-rose-500/10`
- Quick actions: `glass-card rounded-2xl hover:scale-105 active:scale-95`

---

## 9. Estados de Erro

### 9.1 Error Boundary Fallback

- Container: `min-h-screen bg-slate-50 dark:bg-slate-950`
- Card: `bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800`
- Ícone: `w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30`
- Botão: `bg-primary hover:bg-primary/90 rounded-xl`

### 9.2 ApiErrorBanner

- `fixed bottom-4 left-4 right-4 md:right-4 md:max-w-sm z-50`
- `bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl shadow-lg`

### 9.3 Erros de Formulário

- `p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm`

---

## 10. Animações e Transições

- **Fade-in de páginas**: `animate-fade-in`
- **Loading**: `Loader2` com `animate-spin`
- **Hover em cards**: `transition-all duration-300`, `hover:-translate-y-1`
- **Quick actions**: `hover:scale-105 active:scale-95`
- **Dropdown**: `animate-in fade-in zoom-in-95 duration-200`
- **Modais**: `animate-in fade-in duration-300`
- **Transição de tema**: `transition-colors duration-300` no body e layout

---

## 11. Ícones

- **Lucide**: tamanhos comuns `size={18}`, `size={20}`, `size={22}`, `size={24}`
- **Material Symbols**: `material-symbols-outlined text-2xl` (ex.: `paid`)
- Ícones em botões de ação: manter proporção com texto (`size={16}` ou `size={20}`)

---

## 12. Utilitário `cn()`

Sempre usar `cn()` do `lib/utils.ts` (clsx + tailwind-merge) para combinar classes em componentes:

```tsx
className={cn("base-classes", conditional && "conditional-classes", className)}
```

---

## 13. Boas Práticas (shadcn/ui)

- Manter `components/ui/` com componentes base; criar wrappers em `components/` quando precisar de variações
- Não modificar componentes do shadcn diretamente; compor ou estender via `className`
- Preservar atributos ARIA e handlers de teclado
- Manter responsividade nativa dos componentes

---

## 14. Tema e Persistência

- **Chave localStorage**: `fin-track-theme` (`"light"` | `"dark"`)
- **Fallback**: `prefers-color-scheme: dark`
- Script em `index.html` aplica classe `dark` no `<html>` antes do paint para evitar flash

---

## 15. Responsividade

- **Mobile first**: breakpoints `sm`, `md`, `lg`
- Sidebar oculta em mobile: `hidden sm:flex`
- Labels da sidebar ocultos em mobile: `hidden lg:block`
- Navegação inferior só em mobile: `sm:hidden`
- Grid responsivo: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-12`, etc.
