import { cn } from "@lib/utils";

const BRAND_NAME = "FinFlow";

const SIZE_CONFIG = {
  sm: {
    bars: "gap-1",
    bar1: "w-1 h-2.5 rounded-full bg-sky-400 shrink-0",
    bar2: "w-1 h-4 rounded-full bg-primary shrink-0",
    bar3: "w-1 h-6 rounded-full bg-blue-900 shrink-0",
    text: "text-base font-display font-bold tracking-tight text-slate-900 dark:text-white",
  },
  md: {
    bars: "gap-1.5",
    bar1: "w-1.5 h-3 rounded-full bg-sky-400 shrink-0",
    bar2: "w-1.5 h-5 rounded-full bg-primary shrink-0",
    bar3: "w-1.5 h-8 rounded-full bg-blue-900 shrink-0",
    text: "text-lg font-display font-bold tracking-tight text-slate-900 dark:text-white",
  },
  lg: {
    bars: "gap-2",
    bar1: "w-2 h-4 rounded-full bg-sky-400 shrink-0",
    bar2: "w-2 h-7 rounded-full bg-primary shrink-0",
    bar3: "w-2 h-10 rounded-full bg-blue-900 shrink-0",
    text: "text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white",
  },
} as const;

type LogoSize = keyof typeof SIZE_CONFIG;

type LogoProps = {
  className?: string;
  showText?: boolean;
  size?: LogoSize;
};

/**
 * Logo do FinFlow — 3 barras verticais arredondadas em ordem
 * crescente (representando crescimento/gráficos) + nome da marca.
 * Dumb component: sem estado interno.
 */
export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const config = SIZE_CONFIG[size];

  return (
    <div
      className={cn("flex items-center gap-2 md:gap-3", className)}
      role="img"
      aria-label={BRAND_NAME}
    >
      <div className={cn("flex items-end justify-center", config.bars)}>
        <div className={config.bar1} />
        <div className={config.bar2} />
        <div className={config.bar3} />
      </div>
      {showText && <span className={config.text}>{BRAND_NAME}</span>}
    </div>
  );
}
