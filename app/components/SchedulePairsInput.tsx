import { theme } from "../constants/theme";

export interface ScheduleItem {
  location: string;
  timeSlot: string;
}

interface SchedulePairsInputProps {
  items: ScheduleItem[];
  onChangeItem: (index: number, field: keyof ScheduleItem, val: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}

export function SchedulePairsInput({
  items,
  onChangeItem,
  onAddItem,
  onRemoveItem,
}: SchedulePairsInputProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className={theme.labels.standard}>
          Locații & Intervale Orare <span className="text-rose-500">*</span>
        </label>
        <button
          type="button"
          onClick={onAddItem}
          className="text-xs text-rose-400 hover:text-rose-300 font-medium transition"
        >
          + Adaugă locație & interval
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            {/* Locatie */}
            <input
              type="text"
              placeholder={`ex: ${index === 0 ? "Primărie" : "Restaurant"}`}
              value={item.location}
              onChange={(e) => onChangeItem(index, "location", e.target.value)}
              className={`${theme.inputs.base} flex-1`}
              required
            />

            <span className="text-neutral-500 text-xs select-none">---{">"}</span>

            {/* Interval Orar */}
            <input
              type="text"
              placeholder="ex: 10:00 - 12:00"
              value={item.timeSlot}
              onChange={(e) => onChangeItem(index, "timeSlot", e.target.value)}
              className={`${theme.inputs.base} flex-1`}
              required
            />

            {items.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveItem(index)}
                className="px-3 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-rose-400 rounded-lg text-sm transition"
                title="Șterge rând"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}