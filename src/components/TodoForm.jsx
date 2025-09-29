import { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value || !category || !priority) return;
    addTodo(value, category, priority)
    setValue("")
    setCategory("")
    setPriority("")

  }

  return <div className="todo-form">
    <h2>Create a new task:</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter the tittle"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value=""> Select a category</option>
        <option value="Work"> Work</option>
        <option value="Personal"> Personal</option>
        <option value="Study"> Study</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="">Select the priority</option>
        <option value="Urgent">Urgent</option>
        <option value="High">High</option>
        <option value="Medium">Mediun</option>
        <option value="Low">Low</option>
      </select>

      <button type="submit">New Task</button>
    </form>
  </div>
}

export default TodoForm
