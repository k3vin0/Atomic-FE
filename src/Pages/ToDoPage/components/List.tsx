import { FC } from "react";
import { ToDoInformation } from "../../../shared/types/types";
import { Urgency } from "../../../shared/types/enumTypes";

export type ListProps = {
  toDoInformation: ToDoInformation[];
};

export const List: FC<ListProps> = ({ toDoInformation }) => {
  const urgentTasks: ToDoInformation[] = [];
  const moderateTasks: ToDoInformation[] = [];
  const lowPriorityTasks: ToDoInformation[] = [];

  toDoInformation.forEach((todoItem) => {
    switch (todoItem.urgency) {
      case Urgency.HIGH:
        urgentTasks.push(todoItem);
        break;
      case Urgency.MODERATE:
        moderateTasks.push(todoItem);
        break;
      case Urgency.LOW:
        lowPriorityTasks.push(todoItem);
        break;
      default:
        urgentTasks.push(todoItem);
        break;
    }
  });
  return (
    <div className="flex w-full h-full  max-w-7xl p-4 sm:px-6 lg:px-8">
      <div className="bg-gray-600 text-shadow-lg h-full flex-grow p-4 rounded-l-lg">
        <h2 className="text-red-600 font-bold">Urgent Tasks</h2>
        {urgentTasks.map((todo) => (
          <ul key={todo.title} className="text-white">
            {todo.title}
          </ul>
        ))}
      </div>
      <div className="bg-gray-500 text-shadow-lg flex-grow p-4">
        <h2 className="text-orange-400 font-bold">Moderate Tasks</h2>
        {moderateTasks.map((todo) => (
          <ul key={todo.title} className="text-white">
            {todo.title}
          </ul>
        ))}
      </div>
      <div className="bg-gray-400 text-shadow-lg flex-grow p-4 rounded-r-lg">
        <h2 className="text-green-300 font-bold">Low Priority Tasks</h2>
        {lowPriorityTasks.map((todo) => (
          <ul key={todo.title} className="text-white">
            {todo.title}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default List;
