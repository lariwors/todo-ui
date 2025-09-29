const API_BASE_URL = "http://localhost:3333"

//GET tasks
const getTasks = async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`)
    return response.json()
}

//POST new task
const postTasks = async (task) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
    return response.json()
}

//PUT update task
const putTasks = async (id, updatedTask) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTask)
    })
    return response.json()
}

//DELETE task
const deleteTasks = async (id) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE"
    })
    return response.json()
}

module.exports = { getTasks, postTasks, deleteTasks, putTasks }