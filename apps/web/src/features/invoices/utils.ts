export function getCategoryColor(color: string | null): string {
    return color || "#94a3b8";
}

export function getInvoiceStatusColor(status: string): "emerald" | "sky" | "rose" {
    if (status === "paid") return "emerald";
    if (status === "open") return "sky";
    return "rose";
}

export function getInvoiceStatusLabel(status: string): string {
    if (status === "paid") return "Pago";
    if (status === "open") return "Aberta";
    return "Fechada";
}
