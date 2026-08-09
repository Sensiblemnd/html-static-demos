import type { TimeSlot } from "../types";

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function generateTimeSlots(
  startTime: Date,
  endTime: Date,
  intervalMinutes: number,
): TimeSlot[] {
  const intervalMs = intervalMinutes * 60_000;
  const slotCount = Math.round(
    (endTime.getTime() - startTime.getTime()) / intervalMs,
  );
  return Array.from({ length: slotCount }, (_, i) => ({
    start: new Date(startTime.getTime() + i * intervalMs),
    end: new Date(startTime.getTime() + (i + 1) * intervalMs),
  }));
}

export function getColumnRange(
  event: { start: Date; end: Date },
  timelineStart: Date,
  intervalMinutes: number,
): { colStart: number; colEnd: number } {
  const intervalMs = intervalMinutes * 60_000;
  const colStart =
    Math.floor((event.start.getTime() - timelineStart.getTime()) / intervalMs) + 1;
  const colEnd =
    Math.floor((event.end.getTime() - timelineStart.getTime()) / intervalMs) + 1;
  return { colStart, colEnd };
}
