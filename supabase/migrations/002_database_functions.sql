-- ============================================================
-- Bandeira Finance — Migration: Database Functions
-- Agregações no banco para melhor performance
-- ============================================================

-- Saldo total do usuário (soma de todas as contas)
CREATE OR REPLACE FUNCTION get_total_balance(p_user_id UUID)
RETURNS NUMERIC AS $$
    SELECT COALESCE(SUM(balance), 0)
    FROM public.accounts
    WHERE user_id = p_user_id;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Resumo mensal (receitas, despesas, balanço)
CREATE OR REPLACE FUNCTION get_monthly_summary(
    p_user_id UUID,
    p_start_date DATE,
    p_end_date DATE
)
RETURNS TABLE (
    total_income NUMERIC,
    total_expenses NUMERIC,
    balance NUMERIC
) AS $$
    SELECT
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS total_expenses,
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0) AS balance
    FROM public.transactions
    WHERE user_id = p_user_id
      AND date >= p_start_date
      AND date <= p_end_date;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Despesas agrupadas por categoria em um período
CREATE OR REPLACE FUNCTION get_expenses_by_category(
    p_user_id UUID,
    p_start_date DATE,
    p_end_date DATE
)
RETURNS TABLE (
    category_name TEXT,
    category_color TEXT,
    total NUMERIC,
    percentage NUMERIC
) AS $$
    WITH totals AS (
        SELECT COALESCE(SUM(amount), 0) AS grand_total
        FROM public.transactions
        WHERE user_id = p_user_id
          AND type = 'expense'
          AND date >= p_start_date
          AND date <= p_end_date
    )
    SELECT
        COALESCE(c.name, 'Sem categoria') AS category_name,
        c.color AS category_color,
        COALESCE(SUM(t.amount), 0) AS total,
        CASE WHEN tt.grand_total > 0
             THEN ROUND((SUM(t.amount) / tt.grand_total) * 100, 2)
             ELSE 0
        END AS percentage
    FROM public.transactions t
    LEFT JOIN public.categories c ON t.category_id = c.id
    CROSS JOIN totals tt
    WHERE t.user_id = p_user_id
      AND t.type = 'expense'
      AND t.date >= p_start_date
      AND t.date <= p_end_date
    GROUP BY c.name, c.color, tt.grand_total
    ORDER BY total DESC;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;
