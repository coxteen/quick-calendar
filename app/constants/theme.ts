export const theme = {
  colors: {
    primary: "neutral-200",
    primaryHover: "neutral-300",
    primaryBorder: "neutral-600",
    primaryBgSubtle: "neutral-800",
    primaryTextSubtle: "neutral-400",
    primaryShadow: "shadow-neutral-950/50",
    borderFocus: "focus:border-neutral-400",
  },
  buttons: {
    // Buton gri minimalist: font inchis la culoare pe fond deschis, cu hover intunecat
    submit:
      "w-full py-3 bg-neutral-250 hover:bg-neutral-300 active:bg-neutral-400 text-neutral-950 font-semibold rounded-xl transition duration-150 disabled:opacity-50 mt-2 shadow-lg shadow-black/40 cursor-pointer",
  },
  inputs: {
    base: "w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-sm focus:outline-none focus:border-neutral-400 transition",
    compact:
      "w-full p-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-xs sm:text-sm focus:outline-none focus:border-neutral-400 transition cursor-pointer",
  },
  labels: {
    standard: "text-xs font-semibold text-neutral-400 block mb-1",
    section: "text-xs font-bold uppercase tracking-wider text-neutral-400",
  },
} as const;