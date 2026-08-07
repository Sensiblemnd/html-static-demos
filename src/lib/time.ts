import type { TimeSlot } from "../types";

/** Formats a Date's clock time as a "7:30 AM" style label. */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Builds the flat list of half-hour (or custom interval) slots that make up
 * the timeline's columns. `endTime` is the end boundary of the last slot,
 * not its label — e.g. startTime=7:30 AM, endTime=5:30 PM produces 20
 * slots, the last one labeled "5:00 PM" and running until 5:30 PM.
 */
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

/**
 * Maps an event's start/end to 1-based grid column numbers, following CSS
 * grid-column's exclusive-end convention. Column N covers
 * [timelineStart + (N-1)*interval, timelineStart + N*interval).
 */
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
