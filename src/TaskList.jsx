import TaskItem from "./TaskItem";
import { useTask } from "./TaskProvider";

export default function TaskList() {
  const { activeTasks, deleteTask, completeTask, currentTime } = useTask();

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