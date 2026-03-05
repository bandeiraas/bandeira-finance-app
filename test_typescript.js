var SupabaseTransactionRepository = /** @class */ (function () {
    function SupabaseTransactionRepository() {
    }
    SupabaseTransactionRepository.prototype.test = function () {
        console.log(SupabaseTransactionRepository.TRANSACTION_SELECT);
    };
    SupabaseTransactionRepository.TRANSACTION_SELECT = 'id, user_id, account_id, category_id, amount, type, description, date, created_at, categories(id, name, color)';
    return SupabaseTransactionRepository;
}());
