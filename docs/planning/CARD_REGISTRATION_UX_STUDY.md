# Estudo de Produto: Cadastro de Novo Cartão (FinFlow)

**Branch:** `feature/card-registration-ux-study`  
**Data:** 22/02/2025  
**Rota:** `/cards/new` → `apps/web/src/features/cards/pages/AddCard.tsx`  
**Referência de design:** Stitch – tela "Novo Cartão" (ID: c4d6775652094a9a92a21c13525d557d)  
**Objetivo:** Especificação funcional, regras de negócio e modelagem alinhadas ao novo design.

---

## Resumo Executivo

O design atualizado no Stitch redefine a tela "Novo Cartão" com:

1. **Seleção de conta bancária** como primeiro bloco – conta vinculada ao cartão.
2. **Bolha "Sugestão de Estilo"** acima do preview – smart default de cor baseado no banco da conta.
3. **Campos de ciclo de fatura** – Dia de Fechamento e Dia de Vencimento.
4. **Preview do cartão** – exibe nome do banco da conta e limite em tempo real.
5. **Botão "Nova Conta"** – fluxo para adicionar conta quando o usuário já possui contas.

**Decisões confirmadas:** Empty state = Bloquear + CTA; Migração = Limpar banco (truncar `cards` e `invoices`); Validade = Rejeitar cartões vencidos.

---

## 1. Especificação da Tela (Referência Stitch)

### 1.1 Estrutura Geral

- **Layout:** Duas colunas (xl: flex-row)
  - **Esquerda:** Preview do cartão + bolha de sugestão de estilo
  - **Direita:** Formulário em `glassmorphism` com scroll
- **Header:** Título "Novo Cartão", subtítulo, botão voltar, avatar do usuário

### 1.2 Coluna Esquerda – Preview do Cartão

| Elemento | Especificação Stitch |
|----------|----------------------|
| **Bolha "Sugestão de Estilo"** | Posicionada acima do card (`-top-24`), animação `float`, `glassmorphism` |
| **Texto da bolha** | "Sugestão de Estilo (Nubank)" – nome do banco da conta selecionada |
| **Seletores de cor** | 4 círculos: black, purple, green, pink – um destacado com `border-accent-blue` e `ring` |
| **Preview do cartão** | Gradiente conforme style; ícone `account_balance`; texto "Nubank" (nome do banco); "Limite Inicial R$ X"; chip; •••• 0000; titular; **logo da bandeira** (Visa, Mastercard, Elo, etc.) |
| **Comportamento** | Atualizar preview em tempo real: limite, nome, 4 dígitos, cor do gradiente, nome do banco, **ícone/logo da bandeira conforme seleção no dropdown** |

### 1.3 Coluna Direita – Formulário

**Seção 1: Selecione sua Conta Bancária**
- Componente: botão/dropdown que abre lista de contas
- Exibe: ícone do banco, `bank_name`, `account_type`, saldo
- Abaixo: botão tracejado "Nova Conta" (`hover:text-accent-blue`)

**Seção 2: Detalhes do Cartão**
- Limite de Crédito: slider (1k–25k, step 500)
- Bandeira: dropdown com lista completa (seção 6.2). Usuário seleciona manualmente – sem detecção automática via BIN.
- Nome no Cartão: input text
- 4 Últimos Dígitos: input (max 4)
- Vencimento: input MM/AA (max 5)
- Dia de Fechamento: number (1–31), placeholder 5, tooltip "Até que dia as compras entram na fatura atual"
- Dia de Vencimento: number (1–31), placeholder 10, tooltip "Data limite para pagamento da fatura"

**Footer**
- Botão "CADASTRAR CARTÃO"
- Texto: *"Ao cadastrar, você declara que as informações acima são verdadeiras e o cartão está vinculado à conta selecionada."*

### 1.4 Estilo do Cartão – Bolha vs Grid

O design **não** usa mais o grid "Estilo do Cartão" na lateral. A escolha de cor fica na **bolha acima do preview**:
- Label: "Sugestão de Estilo (Nubank)"
- 4 círculos clicáveis; seleção destacada com `border-accent-blue`
- O estilo sugerido vem do mapeamento Banco → Style; o usuário pode alterar clicando em outro círculo.

---

## 2. Vínculo: Cartão e Conta Bancária

### 2.1 Fluxo no Novo Design

1. **Primeiro bloco** do formulário: "Selecione sua Conta Bancária".
2. Dropdown/botão exibe conta escolhida (banco, tipo, saldo).
3. Ao trocar de conta: atualizar bolha "Sugestão de Estilo (Banco)", preview do cartão (nome do banco) e pré-selecionar o style correspondente.
4. Obrigatório: usuário deve escolher uma conta para cadastrar.

### 2.2 Empty State (0 contas)

**✅ DECIDIDO: Opção B – Bloquear + CTA**

- Não exibir formulário completo.
- Mensagem: *"Para cadastrar um cartão, você precisa ter pelo menos uma conta bancária. [Cadastrar conta agora]."*
- CTA leva a `/accounts/add`; após criar conta, redirecionar para `/cards/new`.

### 2.3 Com 1+ Contas

- Exibir seletor de conta e botão "Nova Conta".
- **✅ DECIDIDO:** "Nova Conta" leva a `/accounts/add` (navegação). Mantém consistência com o empty state, permite focar numa tarefa de cada vez e a rota já existe. Evita modais que podem prejudicar o fluxo em mobile.
- Se apenas 1 conta: pré-selecionar e permitir trocar.

### 2.4 Modelagem Relacional

```sql
ALTER TABLE cards
  ADD COLUMN account_id UUID REFERENCES public.accounts(id) ON DELETE RESTRICT;

CREATE INDEX idx_cards_account_id ON cards(account_id);
```

- `ON DELETE RESTRICT`: impedir exclusão de conta com cartões vinculados.
- Migração: limpar `cards` e `invoices` como passo inicial da implementação.

---

## 3. Dados de Ciclo de Fatura (Billing Cycle)

### 3.1 Campos no Design

| Campo | Tipo UI | Default | Validação |
|-------|---------|---------|-----------|
| Dia de Fechamento | `input type="number"` min=1 max=31 | 5 | 1–31 |
| Dia de Vencimento | `input type="number"` min=1 max=31 | 10 | 1–31 |

### 3.2 Colunas no Banco

```sql
ALTER TABLE cards
  ADD COLUMN due_day SMALLINT DEFAULT 10 CHECK (due_day >= 1 AND due_day <= 31),
  ADD COLUMN closing_day SMALLINT DEFAULT 5 CHECK (closing_day >= 1 AND closing_day <= 31);
```

### 3.3 Tooltips (Design)

- Dia de Fechamento: *"Até que dia as compras entram na fatura atual"*
- Dia de Vencimento: *"Data limite para pagamento da fatura"*

---

## 4. Smart Defaults – Bolha "Sugestão de Estilo"

### 4.1 Comportamento

1. Usuário seleciona conta (ex: Nubank).
2. Sistema aplica `BANK_TO_CARD_STYLE` e pré-seleciona o círculo correspondente (ex: purple).
3. Label da bolha: "Sugestão de Estilo (Nubank)".
4. Usuário pode clicar em outro círculo para alterar.
5. Preview do cartão usa o gradiente do style selecionado.

### 4.2 Mapeamento Banco → Style

Usar `bank_key` (retorno de `getBankKey(bankName)`) e `getSuggestedCardStyle(bankKey)` que lê `cardStyle` de `BANK_COLORS` em `accounts/constants.ts` – sem duplicação. A sugestão de estilo vem da mesma fonte que as cores dos bancos.

**Banco de dados?** Para a lista fixa de bancos, constantes no código são suficientes. DB faria sentido apenas se houver bancos customizáveis ou listas dinâmicas.

| `bank_key` | Card style |
|------------|------------|
| nubank | `purple` |
| itau | `pink` |
| bradesco | `pink` |
| santander | `pink` |
| bb | `green` |
| inter | `pink` |
| c6 | `purple` |
| caixa | `black` |
| default | `black` |

### 4.3 Classes de Gradiente (Tailwind)

```typescript
export const CARD_STYLE_CLASSES: Record<string, string> = {
  black: 'from-[#1a1a1a] via-[#333] to-[#000]',
  purple: 'from-indigo-600 to-purple-700',
  green: 'from-emerald-500 to-teal-700',
  pink: 'from-pink-500 to-rose-600',
}
```

---

## 5. Preview do Cartão (Coluna Esquerda)

### 5.1 Dados Exibidos em Tempo Real

| Elemento | Fonte |
|----------|-------|
| Nome do banco | Conta selecionada (`bank_name`) |
| Limite Inicial | Slider `credit_limit` formatado em R$ |
| 4 dígitos | Input `last_four` (ou "0000" placeholder) |
| Titular | Input `card_name` ou `user.fullName` |
| Gradiente | `CARD_STYLE_CLASSES[style]` |

### 5.2 Ícones e Detalhes

- Ícone `account_balance` ao lado do nome do banco.
- Ícone `contactless` no canto.
- Logo da bandeira no canto inferior direito – **atualiza conforme a bandeira selecionada no dropdown** (Visa, Mastercard, Elo, Hipercard, etc.).

---

## 6. Validação Zod e Regras de Negócio

### 6.1 Regras

| Campo | Regras |
|-------|--------|
| `last_four` | 4 caracteres; apenas dígitos |
| `expiry` | MM/AA; mês 01–12; data no futuro |
| `card_name` | Obrigatório; 1–50 caracteres |
| `credit_limit` | Número positivo; > 0 |
| `style` | Enum: black, purple, green, pink; default black |
| `account_id` | UUID válido; conta existe e pertence ao usuário |
| `due_day` | Inteiro 1–31; default 10 |
| `closing_day` | Inteiro 1–31; default 5 |
| `brand` | Slug em lowercase (ex.: `mastercard`, `visa`); validar contra enum/lista permitida |

### 6.2 Lista de Bandeiras no Brasil

#### 6.2.1 As Gigantes (95%+ do mercado)

| Bandeira | Observação |
|----------|------------|
| Mastercard | Número geralmente começa com 5 |
| Visa | Número geralmente começa com 4 |
| Elo | Bandeira 100% brasileira (BB, Bradesco, Caixa) |
| Hipercard | Bandeira brasileira, forte no Nordeste e Sul (controlada pelo Itaú) |
| American Express / Amex | Alta renda e corporativo; cartões com 15 dígitos (não 16) |

#### 6.2.2 Regionais e Varejo (Private Labels)

| Bandeira | Observação |
|----------|------------|
| Banescard | Forte no Espírito Santo (Banestes) |
| Banricompras | Débito forte no Rio Grande do Sul (Banrisul) |
| Cabal | Cooperativa, força no Mercosul (Sicoob, etc.) |
| Credz | Focada em cartões de lojas/varejo |
| Sorocred (Afinz) | Migração para Afinz |
| Senff | Forte no Sul do Brasil |
| Aura | Mais rara hoje; ligada a Cetelem/lojas |

#### 6.2.3 Vouchers de Benefícios (VA/VR)

**✅ Incluir no dropdown.**

| Bandeira | Observação |
|----------|------------|
| Alelo | Vale Alimentação / Refeição |
| Ticket | Vale Alimentação / Refeição |
| VR Benefícios | Vale Refeição |
| Sodexo (Pluxee) | Vale Alimentação / Refeição |
| Ben Visa Vale | Vale Alimentação |
| Caju / Flash | Benefícios flexíveis (rede Visa/Master na máquina, usuário vê como "Cartão Flash") |

### 6.3 Formato do `brand`

**Recomendação:** usar **slug em lowercase** como valor persistido, alinhado ao padrão do projeto (`BANK_KEYS`, etc.):

- Valor no banco e schema: `mastercard`, `visa`, `elo`, `hipercard`, `amex`, etc.
- Labels no dropdown: exibir nome amigável ("Mastercard", "Visa", "Elo").
- Constante `CARD_BRANDS`: array de `{ slug: string; label: string }[]` em `cards/constants.ts`. Extrair `CARD_BRAND_SLUGS` para validação Zod: `z.enum(CARD_BRAND_SLUGS)`.

### 6.4 Schema Proposto

```typescript
export const createCardSchema = z.object({
  last_four: z.string().length(4).regex(/^\d{4}$/, 'Apenas números'),
  brand: z.enum(CARD_BRAND_SLUGS), // slug em lowercase
  expiry: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/)
    .refine(expiryFuture, 'Cartão vencido'),
  card_name: z.string().min(1).max(50),
  credit_limit: z.number().positive(),
  style: z.enum(['black','purple','green','pink']).default('black'),
  account_id: z.string().uuid(),
  due_day: z.number().int().min(1).max(31).default(10),
  closing_day: z.number().int().min(1).max(31).default(5),
})
```

---

## 7. Decisões de Produto

| Decisão | Escolha |
|---------|---------|
| Empty state sem conta | Opção B – Bloquear + CTA para `/accounts/add` |
| Migração de cartões antigos | **Limpar banco** – truncar `cards` e `invoices` antes da implementação |
| Validade do cartão | Rejeitar vencidos |
| Smart default de cor | Pré-selecionar style pela conta; usuário pode alterar na bolha |

---

## 8. Checklist de Implementação (Pós-aprovação)

- [x] **Migração: limpar banco** – truncar `cards` e `invoices` (passo inicial antes das alterações)
- [x] Migration: `account_id`, `due_day`, `closing_day` em `cards`
- [x] Atualizar `createCardSchema` e `CardFactory`
- [x] Implementar layout conforme Stitch:
  - [x] Coluna esquerda: bolha + preview
  - [x] Coluna direita: seção Conta + seção Detalhes (incl. Dia Fechamento e Vencimento)
- [x] Empty state quando 0 contas
- [x] Lógica de smart default na bolha
- [x] Integração com API (create card com novos campos)
- [x] Dropdown de bandeiras: lista completa (Gigantes + Regionais + VA/VR)
- [x] Preview: logo da bandeira atualiza conforme seleção no dropdown

---

## 9. Referências

| Artefato | Caminho |
|----------|---------|
| Tela Novo Cartão | `apps/web/src/features/cards/pages/AddCard.tsx` |
| Schema Zod | `packages/shared/src/validation/cardSchema.ts` |
| Constantes de bancos | `apps/web/src/features/accounts/constants.ts` |
| Constantes de estilo | `apps/web/src/features/cards/constants.ts` |
| Stitch – Novo Cartão | ID: c4d6775652094a9a92a21c13525d557d |
