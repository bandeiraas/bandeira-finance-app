-- ============================================================
-- Bandeira Finance — Migration: Balance Trigger
-- Atualiza automaticamente o saldo da conta ao criar/editar/deletar transações
-- ============================================================

CREATE OR REPLACE FUNCTION update_account_balance()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.accounts
        SET balance = balance +
            CASE WHEN NEW.type = 'income' THEN NEW.amount ELSE -NEW.amount END
        WHERE id = NEW.account_id;
        RETURN NEW;

    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.accounts
        SET balance = balance -
            CASE WHEN OLD.type = 'income' THEN OLD.amount ELSE -OLD.amount END
        WHERE id = OLD.account_id;
        RETURN OLD;

    ELSIF TG_OP = 'UPDATE' THEN
        -- Reverte o valor antigo
        UPDATE public.accounts
        SET balance = balance -
            CASE WHEN OLD.type = 'income' THEN OLD.amount ELSE -OLD.amount END
        WHERE id = OLD.account_id;
        -- Aplica o novo valor (pode ser em outra conta)
        UPDATE public.accounts
        SET balance = balance +
            CASE WHEN NEW.type = 'income' THEN NEW.amount ELSE -NEW.amount END
        WHERE id = NEW.account_id;
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Remove trigger existente se houver, e cria novo
DROP TRIGGER IF EXISTS on_transaction_change ON public.transactions;

CREATE TRIGGER on_transaction_change
    AFTER INSERT OR UPDATE OR DELETE ON public.transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_account_balance();
