class SupabaseTransactionRepository {
    private static readonly TRANSACTION_SELECT = 'id, user_id, account_id, category_id, amount, type, description, date, created_at, categories(id, name, color)'

    test() {
        console.log(SupabaseTransactionRepository.TRANSACTION_SELECT);
    }
}
