import { useState } from "react";
import { FORM_OPTIONS } from "../constants/formOptions";
import { BUTTON_TEXT } from "../constants/buttonText";

const TodoForm = ({ addToDo }) => {
  const [value, setValue] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("")
  const [expiration, setExpiration] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidExpirationDate(expiration)) {
      alert("Expiration date must be after today");
      return;
    }
    
    addToDo(value, category, priority, expiration);
    setValue("");
    setCategory("");
    setPriority("");
    setExpiration("");
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
  }

  return (
    <div className="todo-form">
      <h2>Create a new task:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the title"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required
        >
          <option value="">Select a category</option>
          {Object.keys(FORM_OPTIONS.CATEGORY).map(key => (
            <option key={key} value={FORM_OPTIONS.CATEGORY[key]}>
              {FORM_OPTIONS.CATEGORY[key]}
            </option>
          ))}
        </select>

        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)} 
          required
        >
          <option value="">Select the priority</option>
          {Object.keys(FORM_OPTIONS.PRIORITY).map(key => (
            <option key={key} value={FORM_OPTIONS.PRIORITY[key]}>
              {FORM_OPTIONS.PRIORITY[key]}
            </option>
          ))}
        </select>

        <div className="expiration-date">
          <label>Expiration date:</label>
          <input
            type="date"
            value={expiration}
            min={getTomorrowDate()}
            onChange={dateChange}
            required
          />
        </div>

        <button type="submit">{BUTTON_TEXT.SUBMIT}</button>
      </form>
    </div>
  )
}

export default TodoForm;
