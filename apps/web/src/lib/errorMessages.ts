const ERROR_MESSAGES: Record<string, string> = {
    ValidationError: 'Dados inválidos. Verifique os campos e tente novamente.',
    AuthenticationError: 'Sessão expirada. Faça login novamente.',
    NotFoundError: 'Recurso não encontrado.',
    DatabaseError: 'Erro ao processar. Tente novamente mais tarde.',
    NetworkError: 'Sem conexão. Verifique sua internet.',
    InternalError: 'Erro interno. Tente novamente mais tarde.',
}

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        const code = (error as Error & { code?: string }).code
        if (code && ERROR_MESSAGES[code]) return ERROR_MESSAGES[code]
        const msg = (error as Error & { message?: string }).message
        if (msg && ERROR_MESSAGES[msg]) return ERROR_MESSAGES[msg]
        return error.message
    }
    if (typeof error === 'object' && error !== null && 'message' in error) {
        const msg = (error as { message: string }).message
        if (typeof msg === 'string' && ERROR_MESSAGES[msg]) return ERROR_MESSAGES[msg]
        if (typeof msg === 'string') return msg
    }
    return 'Erro inesperado. Tente novamente.'
}
