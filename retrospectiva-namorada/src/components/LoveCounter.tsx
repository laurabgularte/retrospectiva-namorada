"use client";

import { useSyncExternalStore } from "react";
import { calculateTimeTogether } from "@/lib/dateUtils";
import { RELATIONSHIP_START_DATE } from "@/data/memories";

function subscribe(callback: () => void) {
  const timer = setInterval(callback, 1000);
  return () => clearInterval(timer);
}

function getSnapshot() {
  return Math.floor(Date.now() / 1000);
}

function getServerSnapshot() {
  return null;
}

export function LoveCounter() {
  const currentSecond = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const elapsed =
    currentSecond !== null
      ? calculateTimeTogether(RELATIONSHIP_START_DATE)
      : null;

  const items = [
    { label: "Anos", value: elapsed ? elapsed.years : null },
    { label: "Meses", value: elapsed ? elapsed.months : null },
    { label: "Dias", value: elapsed ? elapsed.days : null },
    { label: "Horas", value: elapsed ? elapsed.hours : null },
    { label: "Minutos", value: elapsed ? elapsed.minutes : null },
    { label: "Segundos", value: elapsed ? elapsed.seconds : null },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-3xl mx-auto">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-4 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1"
        >
          <div className="text-2xl sm:text-4xl font-bold text-rose-400 tabular-nums">
            {item.value !== null ? String(item.value).padStart(2, "0") : "--"}
          </div>
          <div className="text-[11px] sm:text-xs uppercase tracking-wider text-zinc-400 mt-1">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}