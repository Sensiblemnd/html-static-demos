import { useMemo } from "react";
import { formatTime, generateTimeSlots, getColumnRange } from "../lib/time";
import type { TimelineEvent } from "../types";
import "./TimelineGrid.css";

interface TimelineGridProps {
  /** Clock time the first column starts at. */
  startTime: Date;
  /** End boundary of the last column (its label is one interval earlier). */
  endTime: Date;
  intervalMinutes?: number;
  /** One array of non-overlapping events per row/track. */
  rows: TimelineEvent[][];
}

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

  return (
    <div className="timeline-scroll-container">
      <div
        className="grid-timeline"
        style={{ "--size-timeline-columns": slots.length }}
      >
        <div className="header-container">
          {slots.map((slot) => (
            <div className="header-row" key={slot.start.getTime()}>
              {formatTime(slot.start)}
            </div>
          ))}
        </div>
        {rows.map((row, rowIndex) => (
          <div className="row-background" key={rowIndex}>
            <div className="row-cells">
              {slots.map((slot) => (
                <div className="row-cell" key={slot.start.getTime()} />
              ))}
            </div>
            <div className="row-data">
              {row.map((event) => {
                const { colStart, colEnd } = getColumnRange(event, startTime, intervalMinutes);
                return (
                  <div
                    className="block"
                    key={event.id}
                    data-color={event.color}
                    style={{ "--col-start": colStart, "--col-end": colEnd }}
                  >
                    {event.label}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
