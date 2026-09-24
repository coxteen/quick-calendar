import { theme } from "../constants/theme";

export interface CalendarColor {
  id: string;
  name: string;
  hex: string;
}

export const GOOGLE_CALENDAR_COLORS: CalendarColor[] = [
  { id: "1", name: "Lavandă", hex: "#7986cb" },
  { id: "2", name: "Sage", hex: "#33b679" },
  { id: "3", name: "Grape", hex: "#8e24aa" },
  { id: "4", name: "Flamingo", hex: "#e67c73" },
  { id: "5", name: "Banană", hex: "#f6bf26" },
  { id: "6", name: "Mandarină", hex: "#f4511e" },
  { id: "7", name: "Peacock", hex: "#039be5" },
  { id: "8", name: "Grafit", hex: "#616161" },
  { id: "9", name: "Blueberry", hex: "#3f51b5" },
  { id: "10", name: "Basil", hex: "#0b8043" },
  { id: "11", name: "Tomato", hex: "#d50000" },
];

interface ColorSelectorProps {
  selectedColorId: string;
  onSelectColor: (colorId: string) => void;
}

export function ColorSelector({ selectedColorId, onSelectColor }: ColorSelectorProps) {
  const selectedColor =
    GOOGLE_CALENDAR_COLORS.find((c) => c.id === selectedColorId) ||
    GOOGLE_CALENDAR_COLORS[10];

  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <label className={theme.labels.standard}>Culoare în Calendar</label>
        <span className="text-[11px] font-medium text-neutral-400">
          {selectedColor.name}
        </span>
      </div>

      {/* 
        Pe mobil (sub ecran sm): max-w-[240px] si justify-center 
        forteaza exact 6 pe primul rand, iar cele 5 de pe randul 2 se centreaza automat cu offset egal stanga-dreapta.
        Pe PC (sm si mai mare): max-w-none intinde toate cele 11 pe o singura linie uniforma.
      */}
      <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 flex justify-center">
        <div className="flex flex-wrap justify-center gap-2 max-w-[240px] sm:max-w-none">
          {GOOGLE_CALENDAR_COLORS.map((c) => {
            const isSelected = selectedColorId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                title={c.name}
                onClick={() => onSelectColor(c.id)}
                className="w-7 h-7 flex items-center justify-center rounded-full transition-transform active:scale-95 focus:outline-none"
              >
                <span
                  style={{ backgroundColor: c.hex }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? "ring-2 ring-white scale-110 shadow-lg shadow-black/60"
                      : "opacity-80 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-3.5 h-3.5 text-white drop-shadow"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}