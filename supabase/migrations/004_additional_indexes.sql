-- ============================================================
-- Bandeira Finance — Migration: Additional Indexes
-- Indexes compostos para queries frequentes
-- ============================================================

-- Index composto para queries mensais no dashboard (muito frequente)
CREATE INDEX IF NOT EXISTS idx_transactions_user_date_type
    ON public.transactions(user_id, date, type);

-- Index para filtro de categorias por tipo
CREATE INDEX IF NOT EXISTS idx_categories_type
    ON public.categories(type);

-- Index parcial para invoices abertas/vencidas (consulta comum)
CREATE INDEX IF NOT EXISTS idx_invoices_open
    ON public.invoices(user_id, due_date)
    WHERE status IN ('open', 'overdue');
