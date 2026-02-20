-- ============================================================
-- Bandeira Finance — Migration: Refined RLS Policies
-- Validações cross-table em INSERTs
-- ============================================================

-- Transactions INSERT: account_id deve pertencer ao user_id
DROP POLICY IF EXISTS "Users can insert own transactions" ON public.transactions;

CREATE POLICY "Users can insert own transactions"
    ON public.transactions FOR INSERT
    WITH CHECK (
        auth.uid() = user_id
        AND EXISTS (
            SELECT 1 FROM public.accounts
            WHERE accounts.id = account_id
              AND accounts.user_id = auth.uid()
        )
    );

-- Invoices INSERT: card_id deve pertencer ao user_id
CREATE POLICY "Users can insert own invoices"
    ON public.invoices FOR INSERT
    WITH CHECK (
        auth.uid() = user_id
        AND EXISTS (
            SELECT 1 FROM public.cards
            WHERE cards.id = card_id
              AND cards.user_id = auth.uid()
        )
    );
