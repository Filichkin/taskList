import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

function App() {
  const [tasks, setTasks] = useState([]);
  const [sortType, setSortType] = useState("date")
  const [sortOrder, setSortOrder] = useState("asc")
  const [openSection, setOpenSection] = useState(
    {
      taskList: false,
      tasks: true,
      completed: true
    }
  );

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function toggleSection(section) {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  }

  function addTask(task) {
    setTasks([...tasks, {...task, completed: false, id: Date.now()}]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id != id))
  }

  function completeTask(id) {
    setTasks(tasks.map((task) => (task.id === id ? {...task, completed: true} : task)
    ));
  }

  function sortTask(tasks) {
    return tasks.slice().sort((a,b) => {
      if(sortType === "priority") {
        const priorityOrder = {High: 1, Medium: 2, Low: 3}
        return sortOrder === "asc" 
          ? priorityOrder[a.priority] - priorityOrder[b.priority] 
          :  priorityOrder[b.priority] - priorityOrder[a.priority];
      } else if (sortType === "responsible") {
      return sortOrder === "asc"
        ? a.responsible.localeCompare(b.responsible)
        : b.responsible.localeCompare(a.responsible);
    } else {
      return sortOrder === "asc"
        ? new Date(a.deadline) - new Date(b.deadline)
        : new Date(b.deadline) - new Date(a.deadline);
    }
  });
}

  function toggleSortOrder(type) {
    if(sortType === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc");
    }
  }

  const activeTasks = sortTask(tasks.filter(task => !task.completed));
  const completedTasks = sortTask(tasks.filter(task => task.completed));

  console.log(completedTasks);

  return (
    <TaskContext.Provider value={{ 
      sortType,
      sortOrder,
      openSection,
      currentTime,
      toggleSection,
      addTask,
      deleteTask,
      completeTask,
      sortTask,
      toggleSortOrder,
      activeTasks,
      completedTasks 
      }}
    >
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
    </TaskContext.Provider>
  
  );
}

function TaskForm() {
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

function TaskList() {
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

function CompletedTaskList() {
  const { completedTasks } = useContext(TaskContext);
  return (
    <ul className="completed-task-list">{
      completedTasks.map((task) => (
      <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}

function TaskItem({ task }) {
  const { deleteTask, completeTask, isOverdue } = useContext(TaskContext);
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

function Footer() {
  return (
    <footer className="footer">
      <p>React technologies</p>
    </footer>
  )
}


export default App;
