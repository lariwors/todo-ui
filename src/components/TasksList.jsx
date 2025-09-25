import { useState, useEffect } from "react";
import { getTasks, postTasks, deleteTasks, putTasks } from "../services/api";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);


    const loadTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            console.error("Error loading tasks:", error);
        }
    }

    return (
        <div>
            { }
            {tasks.map(task => (
                <div key={task.id}>{task.text}</div>
            ))}
        </div>
    )
}

export default TaskList;