
import { BUTTON_TEXT } from "../constants/buttonText"
import { STATUS } from "../constants/status"

const ToDo = ({ toDo, removeToDo, statusToDo }) => {
  const isComplete = toDo.status === STATUS.COMPLETE
  const expired = toDo.expiration && new Date(toDo.expiration) < new Date()
  
  return (
    <div 
      className={`todo ${expired ? 'expired' : ''} ${isComplete ? 'complete' : ''}`}
      style={{ textDecoration: isComplete ? "line-through" : "" }}
    >
      <div className="content">
        <p>{toDo.text}</p>
        <p className="category">({toDo.category} - {toDo.priority})</p>
        <p className="date">
          {BUTTON_TEXT.CREATED_ON} 
          {new Date(toDo.createdOn).toLocaleString()}
        </p>
        <p className="expiration">
          {expired ? BUTTON_TEXT.EXPIRED_ON : BUTTON_TEXT.EXPIRE_ON} 
          {new Date(toDo.expiration).toLocaleDateString()}
        </p>
      </div>

      <div>
        <button 
          className="status" 
          onClick={() => statusToDo(
            toDo.id, isComplete ? STATUS.INCOMPLETE : STATUS.COMPLETE)}
        >
          {isComplete ? STATUS.INCOMPLETE : STATUS.COMPLETE}
        </button>
        <button 
          className="remove" 
          onClick={() => removeToDo(toDo.id)}
        >
          {BUTTON_TEXT.REMOVE}
        </button>
      </div>
    </div>
  )
}

export default ToDo
