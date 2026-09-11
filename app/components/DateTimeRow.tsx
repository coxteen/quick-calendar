import { theme } from "../constants/theme";

interface DateTimeRowProps {
  eventDate: string;
  startTime: string; // Format "HH:mm"
  endTime: string;   // Format "HH:mm"
  onChangeDate: (val: string) => void;
  onChangeStartTime: (val: string) => void;
  onChangeEndTime: (val: string) => void;
}

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTE_OPTIONS = ["00", "15", "30", "45"];

export function DateTimeRow({
  eventDate,
  startTime,
  endTime,
  onChangeDate,
  onChangeStartTime,
  onChangeEndTime,
}: DateTimeRowProps) {
  const [startHour, startMinute] = startTime ? startTime.split(":") : ["", ""];
  const [endHour, endMinute] = endTime ? endTime.split(":") : ["", ""];

  const handleStartHourChange = (hour: string) => {
    onChangeStartTime(`${hour}:${startMinute || "00"}`);
  };

  const handleStartMinuteChange = (minute: string) => {
    onChangeStartTime(`${startHour || "12"}:${minute}`);
  };

  const handleEndHourChange = (hour: string) => {
    onChangeEndTime(`${hour}:${endMinute || "00"}`);
  };

  const handleEndMinuteChange = (minute: string) => {
    onChangeEndTime(`${endHour || "14"}:${minute}`);
  };

  const triggerPicker = (e: React.MouseEvent<HTMLInputElement>) => {
    try {
      if ("showPicker" in HTMLInputElement.prototype) {
        (e.target as HTMLInputElement).showPicker();
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {/* Selector Data */}
      <div>
        <label className={`${theme.labels.standard} truncate`}>
          Dată <span className="text-rose-500">*</span>
        </label>
        <input
          type="date"
          value={eventDate}
          onClick={triggerPicker}
          onChange={(e) => onChangeDate(e.target.value)}
          className={theme.inputs.compact}
          required
        />
      </div>

      {/* De la ora */}
      <div>
        <label className={`${theme.labels.standard} truncate`}>
          De la ora <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-1">
          <select
            value={startHour}
            onChange={(e) => handleStartHourChange(e.target.value)}
            className={`${theme.inputs.compact} appearance-none text-center px-1`}
            required
          >
            <option value="" disabled className="bg-neutral-900 text-neutral-500">
              Oră
            </option>
            {HOUR_OPTIONS.map((h) => (
              <option key={h} value={h} className="bg-neutral-900 text-neutral-100">
                {h}
              </option>
            ))}
          </select>

          <select
            value={startMinute}
            onChange={(e) => handleStartMinuteChange(e.target.value)}
            className={`${theme.inputs.compact} appearance-none text-center px-1`}
            required
          >
            <option value="" disabled className="bg-neutral-900 text-neutral-500">
              Min
            </option>
            {MINUTE_OPTIONS.map((m) => (
              <option key={m} value={m} className="bg-neutral-900 text-neutral-100">
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pana la ora */}
      <div>
        <label className={`${theme.labels.standard} truncate`}>
          Până la ora <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-1">
          <select
            value={endHour}
            onChange={(e) => handleEndHourChange(e.target.value)}
            className={`${theme.inputs.compact} appearance-none text-center px-1`}
            required
          >
            <option value="" disabled className="bg-neutral-900 text-neutral-500">
              Oră
            </option>
            {HOUR_OPTIONS.map((h) => (
              <option key={h} value={h} className="bg-neutral-900 text-neutral-100">
                {h}
              </option>
            ))}
          </select>

          <select
            value={endMinute}
            onChange={(e) => handleEndMinuteChange(e.target.value)}
            className={`${theme.inputs.compact} appearance-none text-center px-1`}
            required
          >
            <option value="" disabled className="bg-neutral-900 text-neutral-500">
              Min
            </option>
            {MINUTE_OPTIONS.map((m) => (
              <option key={m} value={m} className="bg-neutral-900 text-neutral-100">
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}