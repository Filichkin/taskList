import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
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
            { children }
        </TaskContext.Provider>
    )
}

export default TaskProvider
