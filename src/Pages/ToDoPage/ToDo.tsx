import { FC } from "react";
import List from "./components/List";
import { ToDoInformation } from "../../shared/types/types";
import { Repeat, Urgency } from "../../shared/types/enumTypes";

export type ToDoPageProps = {
  // Define your props here
};

export const ToDoPage: FC<ToDoPageProps> = () => {
  const TODO: ToDoInformation[] = [
    {
      date: "2024-09-20",
      isCompleted: false,
      location: "Miami, Florida",
      repeatInterval: Repeat.NONE,
      time: "14:00",
      title: "Start Todos",
      urgency: Urgency.LOW,
    },
    {
      date: "2024-09-20",
      isCompleted: false,
      location: "Atlanta, Georgia",
      repeatInterval: Repeat.NONE,
      time: "15:00",
      title: "Start Todos",
      urgency: Urgency.MODERATE,
    },
    {
      date: "2024-09-20",
      isCompleted: false,
      location: "San Antonio, Texas",
      repeatInterval: Repeat.NONE,
      time: "15:00",
      title: "Start Todos",
      urgency: Urgency.HIGH,
    },
  ];
  return (
    <div className="mt-3 w-full h-full">
      <List toDoInformation={TODO} />
    </div>
  );
};

export default ToDoPage;
