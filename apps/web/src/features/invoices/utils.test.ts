import { describe, it, expect } from "vitest";
import { getCategoryColor, getInvoiceStatusColor, getInvoiceStatusLabel } from "./utils";

describe("Invoice Utils", () => {
    describe("getCategoryColor", () => {
        it("deve retornar a cor fornecida quando não for nula", () => {
            expect(getCategoryColor("#ff0000")).toBe("#ff0000");
        });

        it("deve retornar a cor padrão (#94a3b8) quando a cor for nula", () => {
            expect(getCategoryColor(null)).toBe("#94a3b8");
        });

        it("deve retornar a cor padrão (#94a3b8) quando a cor for uma string vazia", () => {
            expect(getCategoryColor("")).toBe("#94a3b8");
        });
    });

    describe("getInvoiceStatusColor", () => {
        it("deve retornar 'emerald' para o status 'paid'", () => {
            expect(getInvoiceStatusColor("paid")).toBe("emerald");
        });

        it("deve retornar 'sky' para o status 'open'", () => {
            expect(getInvoiceStatusColor("open")).toBe("sky");
        });

        it("deve retornar 'rose' para status desconhecido ou diferente", () => {
            expect(getInvoiceStatusColor("closed")).toBe("rose");
            expect(getInvoiceStatusColor("late")).toBe("rose");
            expect(getInvoiceStatusColor("")).toBe("rose");
        });
    });

    describe("getInvoiceStatusLabel", () => {
        it("deve retornar 'Pago' para o status 'paid'", () => {
            expect(getInvoiceStatusLabel("paid")).toBe("Pago");
        });

        it("deve retornar 'Aberta' para o status 'open'", () => {
            expect(getInvoiceStatusLabel("open")).toBe("Aberta");
        });

        it("deve retornar 'Fechada' para status desconhecido ou diferente", () => {
            expect(getInvoiceStatusLabel("closed")).toBe("Fechada");
            expect(getInvoiceStatusLabel("late")).toBe("Fechada");
            expect(getInvoiceStatusLabel("")).toBe("Fechada");
        });
    });
});
