import React from 'react'

const ToDo = ({ toDo, removeToDo, statusToDo }) => {
  const isComplete = toDo.status === "Complete"
  const expired = toDo.expiration && new Date(toDo.expiration) < new Date()
  
  return (
    <div className={`todo ${expired ? 'expired' : ''} ${isComplete ? 'complete' : ''}`}
         style={{ textDecoration: isComplete ? "line-through" : "" }}>
      
      <div className="content">
        <p>{toDo.text}</p>
        <p className="category">({toDo.category} - {toDo.priority})</p>
        <p className="date">Created on: {new Date(toDo.createdOn).toLocaleString()}</p>
        <p className="expiration">
          {expired ? 'Expired on: ' : 'Expire on: '}
          {new Date(toDo.expiration).toLocaleDateString()}
        </p>
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
