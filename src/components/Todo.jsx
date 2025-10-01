import React from 'react'

const ToDo = ({ toDo, removeToDo, statusToDo }) => {
  const isComplete = toDo.status === "Complete" ? true : false
  
  return (
    <div className="todo"
      style={{ textDecoration: isComplete ? "line-through" : "" }}
    >
      <div className="content">
        <p>{toDo.text}</p>
        <p className="category">({toDo.category} - {toDo.priority})</p>
        <p className="date">Created in: {new Date(toDo.createdAt).toLocaleString()}</p>
      </div>

      <div>
        <button className="status" onClick={() => statusToDo(toDo.id, isComplete ? "Incomplete" : "Complete")}>
          {isComplete ? "Incomplete" : "Complete"}
        </button>
        <button className="remove" onClick={() => removeToDo(toDo.id)}>
          x
        </button>
      </div>
    </div>
  )
}

export default ToDo
