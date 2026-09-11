interface StatusAlertProps {
  status: { type: "success" | "error"; text: string } | null;
}

export function StatusAlert({ status }: StatusAlertProps) {
  if (!status) return null;

  const isSuccess = status.type === "success";

  return (
    <div
      className={`mt-4 p-3 rounded-lg text-sm transition ${
        isSuccess
          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
          : "bg-rose-950 text-rose-300 border border-rose-800"
      }`}
    >
      {status.text}
    </div>
  );
}