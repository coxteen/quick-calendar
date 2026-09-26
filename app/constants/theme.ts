export const theme = {
  palette: {
    black: "#1A1A1A",
    charcoal: "#3A3A3A",
    gray: "#8A8A8A",
    silver: "#D9D9D9",
    white: "#FFFFFF",
  },
  colors: {
    primary: "#D9D9D9",
    primaryHover: "#FFFFFF",
    primaryBorder: "#3A3A3A",
    primaryBgSubtle: "#3A3A3A",
    primaryTextSubtle: "#8A8A8A",
    primaryShadow: "shadow-[0_10px_20px_-5px_rgba(0,0,0,0.6)]",
    borderFocus: "focus:border-[#D9D9D9]",
  },
  buttons: {
    // Buton principal Silver/White cu text Black (#1A1A1A) pentru contrast puternic si lizibil
    submit:
      "w-full py-3 bg-[#D9D9D9] hover:bg-[#FFFFFF] active:bg-[#8A8A8A] text-[#1A1A1A] font-semibold rounded-xl transition duration-150 disabled:opacity-50 mt-2 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.5)] cursor-pointer",
  },
  inputs: {
    // Baza neagra #1A1A1A, contur subtil Charcoal #3A3A3A, text alb #FFFFFF, focus Silver #D9D9D9
    base: "w-full p-2.5 rounded-lg bg-[#1A1A1A] border border-[#3A3A3A] text-sm text-[#FFFFFF] placeholder-[#8A8A8A] focus:outline-none focus:border-[#D9D9D9] transition",
    compact:
      "w-full p-2.5 rounded-lg bg-[#1A1A1A] border border-[#3A3A3A] text-xs sm:text-sm text-[#FFFFFF] focus:outline-none focus:border-[#D9D9D9] transition cursor-pointer",
  },
  labels: {
    standard: "text-xs font-semibold text-[#8A8A8A] block mb-1",
    section: "text-xs font-bold uppercase tracking-wider text-[#D9D9D9]",
  },
} as const;