import { useContext, useState } from "react";
import { TaskContext } from "./TaskProvider";

export default function TaskForm() {
  const { addTask} = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");
  const [responsible, setResponsible] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if(title.trim() && deadline) {
      addTask({ title, priority, responsible, deadline });
      setTitle("");
      setPriority("Low");
      setResponsible("");
      setDeadline("");
    }
  }

  const employes = ["Manager", "Specialist", "Team leader", "Sr. specialist"]


  return (
  <form action="" className="task-form" onSubmit={handleSubmit}>
    <input 
      type="text"
      value={title}
      placeholder="Task title"
      required
      onChange={(e) => setTitle(e.target.value)}
    />
    <select
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
    >
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
    <select
      value={responsible}
      onChange={(e) => setResponsible(e.target.value)}
    >
      <option value="" disabled >
        Select responsible person
      </option>
      {employes.map((employee) => (
        <option key={employee} value={employee}>
          {employee}
        </option>
      ))}
    </select>
    <input
      type="datetime-local"
      required value={deadline}
      onChange={(e) => setDeadline(e.target.value)}
    />
    <button type="submit">Add task</button>
  </form>
  );
}
