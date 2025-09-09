import { useTask } from "./TaskProvider";

export default function TaskItem({ task }) {
  const { deleteTask, completeTask, isOverdue } = useTask();
  const {title, priority, responsible, deadline, id, completed} = task

  return (
    <li className={`task-item ${priority.toLowerCase()} ${isOverdue ? "overdue" : ""}`}>
      <div className="task-info">
        <div>
          <strong>{priority}:</strong> {title} 
        </div>
        <div className="task-responsible">
          <strong>Responsible:</strong> {responsible}
        </div>
        <div className="task-deadline">
          Due: {new Date(deadline).toLocaleString()}
        </div>
      </div>
      <div className="task-buttons">
        {!completed && <button className="complete-button" onClick={() => completeTask(id)}>
          Complete
        </button>}
        <button className="delete-button" onClick={() => deleteTask(id)}>
          Delete
        </button>
      </div>
    </li>
  )
}