import { useEffect, useState } from "react";

import Todo from "./components/Todo";
import ToDoForm from "./components/ToDoForm";
import Search from "./components/Search";
import Filter from "./components/Filter";

import "./App.css";


function App() {
  const URL = "http://localhost:3333/tasks"
  const [toDos, setToDos] = useState([])
  const [search, setSearch] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [categoryFilter, setCategoryFilter] = useState("All")

//GET tasks
  async function fetchToDos() {
    const response = await fetch(URL);
    const data = await response.json();
    const mappedData = data.map(item => ({
      text: item.title,
      ...item
    }))
    setToDos(mappedData);
  }

  useEffect(() => {
    fetchToDos();
  }, []);

//POST tasks
  const addToDo = async (text, category, priority, expiration) => {
    await fetch(URL, {
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
    fetchToDos()
  }

//PUT tasks
  const statusToDo = async (id, status) => {
    await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status
      })
    });
    fetchToDos();
  }

//DELETE tasks
  const removeToDo = async (id) => {
    await fetch(`${URL}/${id}`, {
      method: "DELETE"
    })
    fetchToDos()
  }

  return (
    <div className="app">
      <h1>To Do List</h1>

      <Search search={search} setSearch={setSearch} />

      <Filter
        priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
      />

      <div className="todo-list">
        {toDos && toDos
          .filter((toDo) =>
            priorityFilter === "All"
              ? true
              : toDo.priority === priorityFilter
          )

          .filter((toDo) =>
            statusFilter === "All" ? true : 
            statusFilter === "Complete" ? toDo.status === "Complete" : toDo.status === "Incomplete"

          )

          .filter((toDo) =>
            categoryFilter === "All"
              ? true
              : toDo.category === categoryFilter
          )

          .filter((toDo) =>
            toDo.text.toLowerCase().includes(search.toLowerCase())
          )
          .map((toDo) => (
            <Todo
              key={toDo.id}
              toDo={toDo} 
              removeToDo={removeToDo}
              statusToDo={statusToDo}
            />
          ))}
      </div>
      <ToDoForm addToDo={addToDo} />
    </div>
  );
}

export default App;
