import { useState, useEffect } from "react";
import { getTasks, deleteTasks, putTasks } from "../services/api";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);


    const loadTasks = async () => {
        setLoading(true);
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Error loading tasks:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteTask = async (id) => {
        try {
            await deleteTasks(id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    const handleToggleComplete = async (id) => {
        const task = tasks.find(t => t.id === id);
        const updatedTask = { ...task, completed: !task.completed };
        
        try {
            await putTasks(id, updatedTask);
            setTasks(tasks.map(t => t.id === id ? updatedTask : t));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }

    useEffect(() => {
        loadTasks();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            { }
            <h2>Tasks ({tasks.length})</h2>

            { }
            {tasks.map(task => (
                <div key={task.id} className={task.completed ? 'completed' : ''}>
                    {}
                    <h3>{task.text}</h3>

                    {}
                    <p>Category: {task.category} | Priority: {task.priority}</p>
                    <p>Due: {task.expiration}</p>
                    
                    {}
                    <button onClick={() => handleToggleComplete(task.id)}>
                        {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                    </button>
                    
                    {}
                    <button onClick={() => handleDeleteTask(task.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    )
}

export default TaskList;