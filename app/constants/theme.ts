export const theme = {
  colors: {
    primary: "rose-600",
    primaryHover: "rose-500",
    primaryBorder: "rose-500",
    primaryBgSubtle: "rose-950",
    primaryTextSubtle: "rose-300",
    primaryShadow: "shadow-rose-950/40",
    borderFocus: "focus:border-rose-500",
  },
  inputs: {
    base: "w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-sm focus:outline-none focus:border-rose-500 transition",
    compact: "w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-xs sm:text-sm focus:outline-none focus:border-rose-500 transition cursor-pointer",
  },
  labels: {
    standard: "text-xs font-semibold text-neutral-400 block mb-1",
    section: "text-xs font-bold uppercase tracking-wider text-neutral-400",
  },
} as const;