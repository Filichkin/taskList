import { useContext } from "react";
import { TaskContext } from "./TaskProvider";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { activeTasks, deleteTask, completeTask, currentTime } = useContext(TaskContext);

  return (
    <ul className="task-list">
      {activeTasks.map((task) => (
        <TaskItem
          completeTask={completeTask }
          deleteTask={deleteTask} 
          task={task} 
          key={task.id}
          isOverdue={new Date(task.deadline) < currentTime}
        />
        ))}
    </ul>
  );
}