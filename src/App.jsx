import { useCallback, useEffect, useState, useMemo } from "react";

import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import Search from "./components/Search";
import Filter from "./components/Filter";

import "./App.css";
import { STATUS } from "./constants/status";

const API_BASE_URL = "http://localhost:3333/tasks";

function App() {
  const [toDos, setToDos] = useState([]);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState(STATUS.ALL);
  const [statusFilter, setStatusFilter] = useState(STATUS.ALL);
  const [categoryFilter, setCategoryFilter] = useState(STATUS.ALL);

  // GET tasks
  const fetchToDos = useCallback(async () => {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    const mappedData = data.map(item => ({
      text: item.title,
      ...item
    }));
    setToDos(mappedData);
  }, []);

  useEffect(() => {
    fetchToDos();
  }, [fetchToDos]);

  // POST tasks
  const addToDo = useCallback(async (text, category, priority, expiration) => {
    await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: text,
        category,
        priority,
        status: false,
        expiration
      }),
    });
    fetchToDos();
  }, [fetchToDos]);

  // PUT tasks
  const statusToDo = useCallback(async (id, status) => {
    await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status
      })
    });
    fetchToDos();
  }, [fetchToDos]);

  // DELETE tasks
  const removeToDo = useCallback(async (id) => {
    await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE"
    });
    fetchToDos();
  }, [fetchToDos]);

  const filteredToDos = useMemo(() => {
    return toDos.filter((toDo) => {
      // Priority filter
      if (priorityFilter !== STATUS.ALL && toDo.priority !== priorityFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== STATUS.ALL) {
        const isComplete = toDo.status === STATUS.COMPLETE || toDo.status === true;
        if (statusFilter === STATUS.COMPLETE && !isComplete) {
          return false;
        }
        if (statusFilter === STATUS.INCOMPLETE && isComplete) {
          return false;
        }
      }

      // Category filter
      if (categoryFilter !== STATUS.ALL && toDo.category !== categoryFilter) {
        return false;
      }

      // Search filter
      if (search && !toDo.text.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [toDos, priorityFilter, statusFilter, categoryFilter, search]);

  return (
    <div className="app">
      <h1>To Do List</h1>

      <Search search={search} setSearch={setSearch} />

      <Filter
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      <div className="todo-list">
        {filteredToDos.map((toDo) => (
          <Todo
            key={toDo.id}
            toDo={toDo} 
            removeToDo={removeToDo}
            statusToDo={statusToDo}
          />
        ))}
      </div>

      <TodoForm addToDo={addToDo} />
    </div>
  );
}

export default App;
