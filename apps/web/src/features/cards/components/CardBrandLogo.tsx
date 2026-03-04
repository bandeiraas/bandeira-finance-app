import { cn } from "@lib/utils"

interface CardBrandLogoProps {
    slug: string
    className?: string
    size?: "sm" | "md" | "lg"
}

export function CardBrandLogo({ slug, className, size = "md" }: CardBrandLogoProps) {
    const sizeClass = size === "sm" ? "w-8 h-5" : size === "lg" ? "w-12 h-8" : "w-10 h-6"
    const circleSize = size === "sm" ? "w-6 h-6" : size === "lg" ? "w-9 h-9" : "w-7 h-7"

    const logos: Record<string, React.ReactNode> = {
        mastercard: (
            <div className={cn("flex -space-x-2", sizeClass)}>
                <div className={cn("rounded-full bg-[#EB001B]/90", circleSize)} />
                <div className={cn("rounded-full bg-[#F79E1B]/90", circleSize)} />
            </div>
        ),
        visa: (
            <div className={cn("bg-blue-700 rounded-sm flex items-center justify-center italic font-bold text-white", sizeClass)} style={{ fontSize: size === "sm" ? 8 : size === "lg" ? 12 : 10 }}>
                VISA
            </div>
        ),
        elo: (
            <div className={cn("bg-amber-600 rounded-sm flex items-center justify-center font-bold text-white", sizeClass)} style={{ fontSize: size === "sm" ? 7 : size === "lg" ? 11 : 9 }}>
                ELO
            </div>
        ),
        hipercard: (
            <div className={cn("bg-red-700 rounded-sm flex items-center justify-center font-bold text-white", sizeClass)} style={{ fontSize: size === "sm" ? 6 : size === "lg" ? 10 : 8 }}>
                HIPER
            </div>
        ),
        amex: (
            <div className={cn("bg-sky-500 rounded-sm flex items-center justify-center italic font-bold text-white", sizeClass)} style={{ fontSize: size === "sm" ? 6 : size === "lg" ? 10 : 8 }}>
                AMEX
            </div>
        ),
    }

    const logo = logos[slug] ?? (
        <div className={cn("bg-white/20 rounded-sm flex items-center justify-center font-medium text-white border border-white/30", sizeClass)} style={{ fontSize: size === "sm" ? 6 : size === "lg" ? 10 : 8 }}>
            {slug.slice(0, 4).toUpperCase()}
        </div>
    )

    return <div className={cn("flex-shrink-0", className)}>{logo}</div>
}
