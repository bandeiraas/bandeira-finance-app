# Estudo de UX: Dashboard "Meus Cartões" vs Tela /cards

**Branch:** `feature/dashboard-cards-ux-review`  
**Data:** 21/02/2025  
**Objetivo:** Avaliar o widget "Meus Cartões" do Dashboard e propor melhorias para oferecer uma experiência de seleção de cartões similar à tela `/cards`, sem implementação neste momento.

---

## 1. Situação Atual

### 1.1 Dashboard – Widget "Meus Cartões"

**Localização:** `apps/web/src/pages/Dashboard.tsx` (linhas 170–241)

**Estrutura atual:**
- **Posição:** Coluna direita do grid (lg:col-span-4), dentro de um `glass-card`
- **Header:** Título "Meus Cartões" + ícone Plus (link para `/cards/new`)
- **Conteúdo:** Mostra apenas o **primeiro cartão** (`primaryCard = cards?.[0]`)
- **Comportamento:** Estático – não há seleção nem troca entre cartões
- **Informações exibidas:**
  - Card único com: brand, last_four, titular, validade
  - Barra de "Limite Disp." (sempre 100% – valor fixo)
- **Estado vazio:** Placeholder com ícone de cartão e texto "Nenhum cartão"

**Problemas identificados:**
1. Usuários com múltiplos cartões veem apenas o primeiro
2. Não há como alternar entre cartões no próprio Dashboard
3. Para ver outro cartão, o usuário precisa ir até `/cards`
4. Falta link "Ver Detalhes" ou "Ver Cartões" (contraste com "Saldo de Contas" que tem "Ver Detalhes")
5. Barra de limite não reflete uso real (sempre 100% disponível)

---

### 1.2 Tela /cards – Experiência Completa

**Localização:** `apps/web/src/pages/Cards.tsx`

**Estrutura atual:**

| Aspecto | Implementação |
|---------|---------------|
| **Layout** | Duas colunas: pilha de cartões (esq) + detalhes (dir) |
| **Seleção** | Pilha empilhada com `-space-y-40`; cartão selecionado em destaque (scale, z-index, borda primary) |
| **Interação** | Click em qualquer cartão para selecionar |
| **Feedback visual** | `isSelected`: scale-100, opacity-100, border-primary; demais: scale-94, opacity-80 |
| **Cores por cartão** | Alternância: preto/cinza vs roxo (index % 2) |
| **Botão adicionar** | Link "Novo Cartão" em card tracejado |
| **Status financeiro** | Widget com limite total, fatura estimada, barra de uso |
| **Ações rápidas** | Link para Faturas, copy número, delete (apenas no selecionado) |

**Elementos de UX destacados:**
- Pilha empilhada (`-space-y-40`) – sensação de cartões físicos
- Transições suaves (duration-500)
- Estados hover nos cartões não selecionados (scale-96, opacity-100)
- Integração com detalhes do cartão na coluna direita
- Botão de deletar aparece só no cartão selecionado

---

### 1.3 OnboardingDemo – ScreenCartoes (referência)

**Localização:** `apps/web/src/pages/OnboardingDemo.tsx` (ScreenCartoes)

**Padrão alternativo:**
- Scroll horizontal (`overflow-x-auto`, `snap-x`)
- Cartões lado a lado com `gap-6`, `snap-center`
- Hover: `scale-[1.02]`
- Layout mais "carrossel"

---

## 2. Padrões de Referência (Saldo de Contas)

O widget "Saldo de Contas" no mesmo Dashboard oferece:
- Lista de contas em grid (AccountCard)
- Link "Ver Detalhes" para `/accounts`
- AddAccountCard para adicionar conta
- Cada conta é clicável e leva a `/accounts/:id`

**Insight:** O padrão "resumo + link para detalhes" já existe. O widget de cartões está desalinhado: não tem link para `/cards` e não permite preview de múltiplos cartões.

---

## 3. Análise de Opções

### Opção A: Pilha compacta (estilo /cards)

**Descrição:** Adaptar o padrão de pilha empilhada da tela /cards para o widget do Dashboard.

**Implementação sugerida:**
- Mini-pilha com 2–3 cartões visíveis (reduzir `-space-y-40` para algo como `-space-y-24` ou `-space-y-28`)
- Estado de seleção local no widget (ex.: `selectedCardIndex`)
- Ao selecionar, mostrar dados do cartão (limite, barra) atualizados
- Link "Ver todos" para `/cards`

**Prós:**
- Consistência visual com /cards
- Permite alternar entre cartões sem sair do Dashboard
- Sensação de "cartões físicos" preservada

**Contras:**
- Ocupa mais altura na coluna direita
- Em mobile pode ficar apertado
- Pode competir visualmente com Ações Rápidas e Dica Financeira

---

### Opção B: Carrossel horizontal (estilo OnboardingDemo)

**Descrição:** Scroll horizontal com snap, similar ao ScreenCartoes do OnboardingDemo.

**Implementação sugerida:**
- `overflow-x-auto`, `snap-x`, `snap-center`
- Cartões com largura fixa (ex.: `w-48` ou `min-w-[180px]`)
- Indicador de qual cartão está em foco (opcional)
- Link "Ver todos" para `/cards`

**Prós:**
- Funciona bem em mobile (gesto de swipe)
- Menor altura ocupada
- Padrão familiar (carrossel de apps bancários)

**Contras:**
- Difere do padrão da tela /cards (pilha vertical)
- Pode exigir scroll para ver todos os cartões
- Menos "premium" que a pilha empilhada

---

### Opção C: Lista/dropdown minimalista

**Descrição:** Um único card em destaque + dropdown ou lista compacta para trocar.

**Implementação sugerida:**
- Card principal (como hoje) com dados do cartão selecionado
- Select/dropdown ou lista de pills acima: "Cartão 1 •••• 1234 | Cartão 2 •••• 5678"
- Link "Ver todos" para `/cards`

**Prós:**
- Mínima alteração de layout
- Ocupa pouco espaço
- Implementação mais simples

**Contras:**
- Menos visual/impactante
- Dropdown pode parecer "antiquado" em um app moderno
- Perde a identidade visual forte dos cartões

---

### Opção D: Card único + link "Ver todos" (incremental)

**Descrição:** Manter o card único, mas adicionar link explícito para `/cards` e pequenos ajustes.

**Implementação sugerida:**
- Manter exibição do `primaryCard` (ou cartão "principal" configurável)
- Adicionar link "Ver Cartões" ou "Ver todos" (como em "Saldo de Contas")
- Card clicável → navega para `/cards`
- Corrigir barra de limite (integrar com fatura real quando disponível)

**Prós:**
- Mudança mínima, baixo risco
- Alinha com padrão de "Ver Detalhes" das contas
- Rápido de implementar

**Contras:**
- Não resolve a limitação de múltiplos cartões
- UX continua limitada para quem tem vários cartões

---

### Opção E: Híbrido – Mini-pilha colapsável

**Descrição:** Pilha compacta por padrão; ao expandir (chevron ou "Ver mais"), mostra pilha completa ou abre modal/drawer com experiência /cards.

**Implementação sugerida:**
- Estado colapsado: 1–2 cartões visíveis em pilha compacta
- Botão "Ver todos os cartões" expande inline ou abre drawer/modal com a mesma UX de /cards
- Link persistente para `/cards`

**Prós:**
- Equilibra resumo e funcionalidade completa
- Não sobrecarrega o Dashboard quando colapsado
- Oferece experiência rica quando o usuário quer

**Contras:**
- Mais complexo de implementar
- Pode confundir se a expansão for pouco óbvia

---

## 4. Comparativo Resumido

| Critério | Opção A (Pilha) | Opção B (Carrossel) | Opção C (Dropdown) | Opção D (Incremental) | Opção E (Híbrido) |
|----------|-----------------|---------------------|--------------------|------------------------|-------------------|
| Consistência com /cards | Alta | Média | Baixa | Baixa | Alta |
| Espaço no layout | Maior | Médio | Menor | Menor | Variável |
| Complexidade impl. | Média | Média | Baixa | Baixa | Alta |
| UX para múltiplos cartões | Ótima | Boa | Boa | Limitada | Ótima |
| Mobile-friendly | Médio | Alto | Alto | Alto | Médio |

---

## 5. Recomendações

### Recomendação principal: **Opção A (Pilha compacta)**

Motivos:
1. **Consistência:** Alinha a experiência do Dashboard com a tela /cards, reforçando o design system.
2. **Identidade:** A pilha de cartões é um diferencial visual do app; faz sentido reaproveitá-la no Dashboard.
3. **Necessidade real:** Usuários com vários cartões precisam de visão rápida sem ir à página dedicada.
4. **Escopo controlado:** Ajustes de escala/espaçamento tornam a pilha viável no widget.

### Recomendação alternativa: **Opção D + Opção A em fases**

- **Fase 1 (rápida):** Implementar Opção D – link "Ver Cartões", card clicável para `/cards`.
- **Fase 2:** Evoluir para Opção A com mini-pilha e seleção inline.

### Pontos técnicos a considerar em qualquer implementação

1. **Estado de seleção:** Se houver seleção no widget, decidir se persiste ao navegar (ex.: state ou query param em `/cards`).
2. **Barra de limite:** Integrar com fatura real (API de invoices) quando disponível; hoje está fixa em 100%.
3. **Responsividade:** Em mobile, o layout da coluna direita pode empilhar; a pilha ou carrossel precisa se adaptar.
4. **Link "Ver Cartões":** Sempre presente, alinhado ao padrão de "Ver Detalhes" de contas.

---

## 6. Próximos Passos (quando implementar)

1. Validar recomendações com o time/produto
2. Priorizar: Opção D (quick win) ou ir direto para Opção A
3. Especificar breakpoints e comportamento mobile
4. Definir integração com API de faturas para barra de limite
5. Atualizar testes e documentação após implementação

---

## 7. Referências de Código

| Componente | Arquivo |
|------------|---------|
| Dashboard widget Meus Cartões | `apps/web/src/pages/Dashboard.tsx` (L170–241) |
| Tela /cards | `apps/web/src/pages/Cards.tsx` |
| Onboarding ScreenCartoes | `apps/web/src/pages/OnboardingDemo.tsx` (ScreenCartoes) |
| AccountCard (padrão de link) | `apps/web/src/features/dashboard/components/AccountCard.tsx` |
| Hook useCards | `apps/web/src/features/cards/hooks/useCards.ts` |
