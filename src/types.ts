export type BlockColor =
  | "red"
  | "green"
  | "yellow"
  | "navy"
  | "purple"
  | "blue"
  | "orange"
  | "teal"
  | "sky";

export interface TimeSlot {
  /** inclusive */
  start: Date;
  /** exclusive */
  end: Date;
}

export interface TimelineEvent {
  id: string;
  label: string;
  /** inclusive */
  start: Date;
  /** exclusive */
  end: Date;
  color: BlockColor;
}
