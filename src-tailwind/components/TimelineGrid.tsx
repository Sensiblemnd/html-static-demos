import { useMemo } from "react";
import { formatTime, generateTimeSlots, getColumnRange } from "../lib/time";
import type { BlockColor, TimelineEvent } from "../types";

interface TimelineGridProps {
  startTime: Date;
  endTime: Date;
  intervalMinutes?: number;
  rows: TimelineEvent[][];
}

const colorClasses: Record<BlockColor, string> = {
  red: " bg-red-600 bg-opacity-75 border border-red-700 text-white",
  green: "bg-green-600 bg-opacity-75 border border-green-700 text-white",
  yellow:
    "bg-yellow-400 bg-opacity-80 border border-yellow-500 text-yellow-900",
  navy: "bg-navy bg-opacity-80 border border-navy text-white",
  purple: "bg-purple-600 bg-opacity-75 border border-purple-700 text-white",
  blue: "bg-blue-600 bg-opacity-75 border border-blue-700 text-white",
  orange: "bg-orange-500 bg-opacity-75 border border-orange-600 text-white",
  teal: "bg-teal-600 bg-opacity-75 border border-teal-700 text-white",
  sky: "bg-sky bg-opacity-75 border border-sky text-white",
};
/**
 *
 * @param param0
 * @returns
 *
 */
export function TimelineGrid({
  startTime,
  endTime,
  intervalMinutes = 30,
  rows,
}: TimelineGridProps) {
  const slots = useMemo(
    () => generateTimeSlots(startTime, endTime, intervalMinutes),
    [startTime, endTime, intervalMinutes],
  );

  const gridTemplateColumns = `repeat(${slots.length}, minmax(0, 1fr))`;

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
      <div className="p-5" style={{ minWidth: "75rem" }}>
        <div
          className="mb-3 grid gap-x-4 border-b-2 border-gray-300 pb-3"
          style={{ gridTemplateColumns }}
        >
          {slots.map((slot, i) => (
            <div
              key={slot.start.getTime()}
              style={{ gridColumn: `${i + 1} / ${i + 2}` }}
              className="whitespace-nowrap text-center text-xs font-bold text-gray-500"
            >
              {formatTime(slot.start)}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="relative grid gap-x-4"
              style={{ gridTemplateColumns }}
            >
              {slots.map((slot, i) => (
                <div
                  key={slot.start.getTime()}
                  style={{
                    gridColumn: `${i + 1} / ${i + 2}`,
                    gridRow: "1 / 2",
                  }}
                  className={
                    i < slots.length - 1
                      ? "h-14 border-r border-gray-600"
                      : "h-14"
                  }
                />
              ))}

              {row.map((event) => {
                const { colStart, colEnd } = getColumnRange(
                  event,
                  startTime,
                  intervalMinutes,
                );
                return (
                  <div
                    key={event.id}
                    style={{
                      gridColumn: `${colStart} / ${colEnd}`,
                      gridRow: "1 / 2",
                    }}
                    className={`relative z-10 flex h-11 items-center justify-center overflow-hidden whitespace-nowrap rounded-md px-1 text-xs font-bold shadow ${colorClasses[event.color]}`}
                  >
                    {event.label}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
