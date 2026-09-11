import { theme } from "../constants/theme";
import { ScheduleItem, SchedulePairsInput } from "./SchedulePairsInput";

interface EventDetailsFieldsProps {
  contactName: string;
  phone: string;
  scheduleItems: ScheduleItem[];
  price: string;
  onContactNameChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onScheduleItemChange: (index: number, field: keyof ScheduleItem, val: string) => void;
  onAddScheduleItem: () => void;
  onRemoveScheduleItem: (index: number) => void;
  onPriceChange: (val: string) => void;
}

export function EventDetailsFields({
  contactName,
  phone,
  scheduleItems,
  price,
  onContactNameChange,
  onPhoneChange,
  onScheduleItemChange,
  onAddScheduleItem,
  onRemoveScheduleItem,
  onPriceChange,
}: EventDetailsFieldsProps) {
  return (
    <div className="border-t border-neutral-800 pt-4 space-y-4">
      <h2 className={theme.labels.section}>Detalii Descriere</h2>

      {/* Pereche Nume - Numar de telefon */}
      <div>
        <label className={theme.labels.standard}>
          Contact (Nume & Telefon) <span className="text-rose-500">*</span>
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Nume contact (ex: Andrei Popescu)"
            value={contactName}
            onChange={(e) => onContactNameChange(e.target.value)}
            className={`${theme.inputs.base} flex-1`}
            required
          />

          <span className="text-neutral-500 text-xs select-none">---{">"}</span>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="07xxxxxxxx"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className={`${theme.inputs.base} flex-1`}
            required
          />
        </div>
      </div>

      <SchedulePairsInput
        items={scheduleItems}
        onChangeItem={onScheduleItemChange}
        onAddItem={onAddScheduleItem}
        onRemoveItem={onRemoveScheduleItem}
      />

      {/* Suma */}
      <div>
        <label className={theme.labels.standard}>
          Sumă (cifre) <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="ex: 300"
            value={price}
            onChange={(e) => onPriceChange(e.target.value)}
            className={`${theme.inputs.base} pr-12`}
            required
          />
          <span className="absolute right-3 top-2.5 text-sm text-neutral-500 pointer-events-none">
            lei
          </span>
        </div>
      </div>
    </div>
  );
}