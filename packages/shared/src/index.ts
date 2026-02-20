// Types
export type { Result } from './types/Result'
export { Result as ResultUtil } from './types/Result'
export type * from './types/auth.types'
export type * from './types/models'
export type {
    Database,
    Json,
    Tables,
    InsertTables,
    UpdateTables,
} from './types/database.types'

// Errors
export {
    AppError,
    UnexpectedError,
    ValidationError,
    AuthenticationError,
    NotFoundError,
    NetworkError,
    DatabaseError,
    SupabaseErrorMapper,
} from './errors'

// Interfaces
export type {
    IAuthService,
    IAccountRepository,
    ITransactionRepository,
    ICategoryRepository,
    ICardRepository,
    IInvoiceRepository,
    IProfileRepository,
    IAlertRepository,
} from './interfaces'

// Validation
export {
    validate,
    createTransactionSchema,
    createAccountSchema,
    createCardSchema,
    updateProfileSchema,
    signInSchema,
    signUpSchema,
    resetPasswordSchema,
    transactionsListQuerySchema,
    transactionsSummaryQuerySchema,
    categoriesListQuerySchema,
} from './validation'
export type {
    CreateTransactionDTO,
    CreateAccountDTO,
    CreateCardDTO,
    UpdateProfileDTO,
    SignInDTO,
    SignUpDTO,
    ResetPasswordDTO,
    TransactionsListQuery,
    TransactionsSummaryQuery,
    CategoriesListQuery,
} from './validation'

// Domain Factories
export { TransactionFactory, AccountFactory, CardFactory } from './domain/factories'

// Constants
export * from './constants'
