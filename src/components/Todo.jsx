import React from 'react'

const Todo = ({ todo, removeTodo, statusTodo }) => {
  const isComplete = todo.status === "Complete" ? true : false
  
  return (
    <div className="todo"
      style={{ textDecoration: isComplete ? "line-through" : "" }}
    >
      <div className="content">
        <p>{todo.text}</p>
        <p className="category">({todo.category} - {todo.priority})</p>
        <p className="date"> Created at: {new Date(todo.createdAt).toLocaleString()}</p>
      </div>

      <div>
        <button className="status" onClick={() => statusTodo(todo.id, isComplete ? "Incomplete" : "Complete")}>
          {isComplete ? "Incomplete" : "Complete"}
        </button>
        <button className="remove" onClick={() => removeTodo(todo.id)}>
          x
        </button>
      </div>
    </div>
  )
}

export default Todo
