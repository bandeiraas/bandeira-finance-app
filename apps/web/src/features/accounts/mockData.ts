import { Zap, Droplets, Building2, Wifi, PiggyBank, LineChart } from "lucide-react";
import type { MockBill, MockInvestment } from "./constants";

export const MOCK_BILLS: MockBill[] = [
    { name: "Energia Elétrica", due: "2", date: "26 Out", amount: 245, icon: Zap, color: "red" },
    { name: "Saneamento", due: "5", date: "29 Out", amount: 82.4, icon: Droplets, color: "blue" },
    { name: "Condomínio", due: "10", date: "03 Nov", amount: 850, icon: Building2, color: "green" },
    { name: "Internet Fibra", due: "12", date: "05 Nov", amount: 119.9, icon: Wifi, color: "slate" },
];

export const MOCK_INVESTMENTS: MockInvestment[] = [
    { name: "CDB Pós-fixado", return: "+1.2%", value: 5430, icon: PiggyBank, color: "purple" },
    { name: "Fundo DI", return: "+0.8%", value: 2150, icon: LineChart, color: "blue" },
];

export const CHART_COLOR_CLASSES = ["stroke-blue-500", "stroke-purple-500"] as const;
