import React from 'react'

const Todo = ({ todo, removeTodo, statusTodo }) => {
  const isComplete = todo.status === "Complete" ? true : false
  console.log(todo)
  return (
    <div className="todo"
      style={{ textDecoration: isComplete ? "line-through" : "" }}
    >
      <div className="content">
        <p>{todo.text} - {todo.date} </p>
        <p className="category">({todo.category} - {todo.priority})</p>
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
