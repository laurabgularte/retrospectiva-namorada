"use client";

import { useEffect, useState } from "react";
import { calculateTimeTogether, TimeElapsed } from "@/lib/dateUtils";
import { RELATIONSHIP_START_DATE } from "@/data/memories";

export function LoveCounter() {
  const [elapsed, setElapsed] = useState<TimeElapsed>(() =>
    calculateTimeTogether(RELATIONSHIP_START_DATE),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(calculateTimeTogether(RELATIONSHIP_START_DATE));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: "Anos", value: elapsed.years },
    { label: "Meses", value: elapsed.months },
    { label: "Dias", value: elapsed.days },
    { label: "Horas", value: elapsed.hours },
    { label: "Minutos", value: elapsed.minutes },
    { label: "Segundos", value: elapsed.seconds },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-3xl mx-auto">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-4 text-center shadow-lg transition-transform duration-300 hover:-translate-y-1"
        >
          <div className="text-2xl sm:text-4xl font-bold text-rose-400 tabular-nums">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="text-[11px] sm:text-xs uppercase tracking-wider text-zinc-400 mt-1">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}