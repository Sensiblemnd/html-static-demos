import { TimelineGrid } from "./components/TimelineGrid";
import type { BlockColor, TimelineEvent } from "./types";

/** Shape of an event row as it would come back from the DB. */
interface EventRecord {
  id: string;
  label: string;
  start: string;
  end: string;
  color: BlockColor;
}

const DAY = "2026-08-07";

const eventRecords: EventRecord[][] = [
  [
    { id: "r1-1", label: "1 hr", start: `${DAY}T07:30`, end: `${DAY}T08:30`, color: "red" },
    { id: "r1-2", label: "30m", start: `${DAY}T08:30`, end: `${DAY}T09:00`, color: "green" },
    { id: "r1-3", label: "2 hrs", start: `${DAY}T09:00`, end: `${DAY}T11:00`, color: "yellow" },
    { id: "r1-4", label: "6.5 hrs", start: `${DAY}T11:00`, end: `${DAY}T17:30`, color: "navy" },
  ],
  [
    { id: "r2-1", label: "2.5 hrs", start: `${DAY}T07:30`, end: `${DAY}T10:00`, color: "purple" },
    { id: "r2-2", label: "3 hrs", start: `${DAY}T10:00`, end: `${DAY}T13:00`, color: "blue" },
    { id: "r2-3", label: "2.5 hrs", start: `${DAY}T14:30`, end: `${DAY}T17:00`, color: "orange" },
  ],
  [
    { id: "r3-1", label: "4 hrs", start: `${DAY}T08:00`, end: `${DAY}T12:00`, color: "teal" },
    { id: "r3-2", label: "4 hrs", start: `${DAY}T12:00`, end: `${DAY}T16:00`, color: "sky" },
  ],
  [
    // Overlap test case: r4-2 starts an hour before r4-1 ends.
    { id: "r4-1", label: "9-11", start: `${DAY}T09:00`, end: `${DAY}T11:00`, color: "red" },
    { id: "r4-2", label: "10-12 (overlap)", start: `${DAY}T10:00`, end: `${DAY}T12:00`, color: "purple" },
  ],
];

const rows: TimelineEvent[][] = eventRecords.map((row) =>
  row.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  })),
);

const timelineStart = new Date(`${DAY}T07:30`);
const timelineEnd = new Date(`${DAY}T17:30`);

export default function App() {
  return (
    <>
      <h1>Timeline Grid</h1>
      <TimelineGrid rows={rows} startTime={timelineStart} endTime={timelineEnd} />
    </>
  );
}
