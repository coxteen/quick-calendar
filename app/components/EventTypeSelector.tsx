import { theme } from "../constants/theme";

export type EventType = "Botez" | "Cununie Religioasa" | "Botez + Cununie Religioasa" | "Cununie Civila" | "Majorat" | "Altul";

interface EventTypeSelectorProps {
  value: EventType;
  customTitle: string;
  onChangeType: (type: EventType) => void;
  onChangeCustomTitle: (val: string) => void;
}

const EVENT_OPTIONS: EventType[] = ["Botez", "Cununie Religioasa", "Botez + Cununie Religioasa", "Cununie Civila", "Majorat", "Altul"];

export function EventTypeSelector({
  value,
  customTitle,
  onChangeType,
  onChangeCustomTitle,
}: EventTypeSelectorProps) {
  return (
    <div>
      <label className={`${theme.labels.standard} mb-2`}>
        Nume Eveniment <span className="text-rose-500">*</span>
      </label>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {EVENT_OPTIONS.map((type) => {
          const isSelected = value === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onChangeType(type)}
              className={`py-2 px-3 text-xs font-medium rounded-lg border transition ${
                isSelected
                  ? `bg-${theme.colors.primary} border-${theme.colors.primaryBorder} text-white shadow-md shadow-rose-950`
                  : "bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>

      {value === "Altul" && (
        <input
          type="text"
          placeholder="Specifică titlul evenimentului..."
          value={customTitle}
          onChange={(e) => onChangeCustomTitle(e.target.value)}
          className={`${theme.inputs.base} mt-2.5`}
          required
        />
      )}
    </div>
  );
}