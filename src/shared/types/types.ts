import { Repeat, Urgency } from "./enumTypes";

export type ToDoInformation = {
  title: string;
  urgency: Urgency;
  isCompleted: boolean;
  location: string;
  repeatInterval: Repeat;
  date: string; // Date in "YYYY-MM-DD" format
  time: string; // Time in "HH:mm" or "HH:mm:ss" format
};
