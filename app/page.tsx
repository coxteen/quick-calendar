"use client";

import { useCalendarForm } from "./hooks/useCalendarForm";
import { theme } from "./constants/theme";
import { EventTypeSelector } from "./components/EventTypeSelector";
import { DateTimeRow } from "./components/DateTimeRow";
import { EventDetailsFields } from "./components/EventDetailsFields";
import { StatusAlert } from "./components/StatusAlert";

export default function Home() {
  const { state, actions } = useCalendarForm();

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-neutral-900 p-6 rounded-2xl shadow-xl border border-neutral-800 my-8">
        <h1 className="text-xl font-bold mb-6 text-center text-neutral-100 tracking-wide">
          quick-calendar
        </h1>

        <form onSubmit={actions.handleSubmit} className="space-y-5" noValidate>
          <EventTypeSelector
            value={state.eventType}
            customTitle={state.customTitle}
            onChangeType={actions.setEventType}
            onChangeCustomTitle={actions.setCustomTitle}
          />

          <DateTimeRow
            eventDate={state.eventDate}
            startTime={state.startTime}
            endTime={state.endTime}
            onChangeDate={actions.setEventDate}
            onChangeStartTime={actions.setStartTime}
            onChangeEndTime={actions.setEndTime}
          />

          <EventDetailsFields
            phone={state.phone}
            scheduleItems={state.scheduleItems}
            price={state.price}
            onPhoneChange={actions.setPhone}
            onScheduleItemChange={actions.handleScheduleItemChange}
            onAddScheduleItem={actions.addScheduleItem}
            onRemoveScheduleItem={actions.removeScheduleItem}
            onPriceChange={actions.setPrice}
          />

          <div className="border-t border-neutral-800 pt-4">
            <label className={theme.labels.standard}>
              API Secret Key <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Cheia privată"
              value={state.apiKey}
              onChange={(e) => actions.handleApiKeyChange(e.target.value)}
              className={theme.inputs.base}
              required
            />
          </div>

          <button
            type="submit"
            disabled={state.loading}
            className={`w-full py-3 bg-${theme.colors.primary} hover:bg-${theme.colors.primaryHover} text-white font-medium rounded-xl transition disabled:opacity-50 mt-2 shadow-lg ${theme.colors.primaryShadow}`}
          >
            {state.loading ? "Se salvează în calendar..." : "Adaugă Eveniment"}
          </button>
        </form>

        <StatusAlert status={state.statusMessage} />
      </div>
    </main>
  );
}