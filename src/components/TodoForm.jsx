import { useState } from "react";

const ToDoForm = ({ addToDo }) => {
  const [value, setValue] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("")
  const [expiration, setExpiration] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    const emptyField = !value ? "title" : !category ? "category" : !priority ? "priority" : !expiration ? "expiration-date" : null;
    const fillOrSelect = emptyField === "title" ? "fill in" : "select";

    emptyField ? alert(`Please, ${fillOrSelect} the ${emptyField}.`) :
      !isValidExpirationDate(expiration) ? alert("Expiration date must be after today") :
        (addToDo(value, category, priority, expiration),
          setValue(""),
          setCategory(""),
          setPriority(""),
          setExpiration(""));

  }

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  const isValidExpirationDate = (selectedDate) => {
    const today = new Date().toISOString().split('T')[0];
    return selectedDate > today;
  }

  const dateChange = (e) => {
    const selectedDate = e.target.value;
    setExpiration(selectedDate);

    selectedDate && !isValidExpirationDate(selectedDate) ?
      alert("Expiration date cannot be today or in the past") :
      null;
  }

  return <div className="todo-form">
    <h2>Create a new task:</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter the title"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select a category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Study">Study</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="">Select the priority</option>
        <option value="Urgent">Urgent</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <div className="expiration-date">
        <label>Expiration date:</label>
        <input
          type="date"
          value={expiration}
          min={getTomorrowDate()}
          onChange={dateChange}
        />
      </div>

      <button type="submit">New Task</button>
    </form>
  </div>
}

export default ToDoForm
