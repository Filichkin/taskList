import { useContext } from "react";

import CompletedTaskList from "./CompletedTaskList";
import Footer from "./Footer";
import { TaskContext } from "./TaskProvider";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";


function App() {
  const { 
    openSection,
    addTask,
    toggleSection,
    sortType,
    toggleSortOrder,
    sortOrder,
    deleteTask,
    completedTasks 
  } = useContext(TaskContext);

  return (
      <div className="app">
        <div className="task-container">
          <h1>Task List With Priority</h1>
          <button 
            className={`close-button ${openSection.taskList ? "open" : ""}`}
            onClick={() => toggleSection("taskList")}
          >
            +
          </button>
          {openSection.taskList && <TaskForm addTask={addTask}/>}
        </div>

        <div className="task-container">
          <h2>Tasks</h2>
          <button 
            className={`close-button ${openSection.tasks ? "open" : ""}`}
            onClick={() => toggleSection("tasks")}
          >
            +
          </button>
          <div className="sort-controls">
            <button
            className={`sort-button ${sortType === "date" ? "active" : ""}`}
            onClick={() => toggleSortOrder("date")}
            >
              By Date {sortType === "date" && (sortOrder === "asc" ? "\u2191" : "\u2193")}
            </button>
            <button
              className={`sort-button ${sortType === "priority" ? "active" : ""}`}
              onClick={() => toggleSortOrder("priority")}
            >
              By Priority {sortType === "priority" && (sortOrder === "asc" ? "\u2191" : "\u2193")}
            </button>
            <button
              className={`sort-button ${sortType === "responsible" ? "active" : ""}`}
              onClick={() => toggleSortOrder("responsible")}
            >
              By Responsible {sortType === "responsible" && (sortOrder === "asc" ? "\u2191" : "\u2193")}
            </button>
          </div>
          {openSection.tasks && <TaskList />}
        </div>

        <div className="completed-task-container">
          <h2>Completed tasks</h2>
          <button 
            className={`close-button ${openSection.completed ? "open" : ""}`}
            onClick={() => toggleSection("completed")}
          >
            +
          </button>
          {openSection.completed && <CompletedTaskList deleteTask=
          {deleteTask} completedTasks={completedTasks}/>}
        </div>
        <Footer />
      </div>
  );
}

export default App;
