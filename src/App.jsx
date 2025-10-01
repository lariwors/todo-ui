import { useEffect, useState } from "react";

import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";
import Search from "./components/Search";
import Filter from "./components/Filter";

import "./App.css";


function App() {
  const [todos, setTodos] = useState([])
  const [search, setSearch] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [categoryFilter, setCategoryFilter] = useState("All")

//GET tasks
  async function fetchTodos() {
    const response = await fetch("http://localhost:3333/tasks");
    const data = await response.json();
    const mappedData = data.map(item => ({
      text: item.title,
      ...item
    }))
    setTodos(mappedData);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

//POST tasks
  const addTodo = async (text, category, priority) => {
    await fetch("http://localhost:3333/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: text,
        category,
        priority,
        status: false
      }),
    });
    fetchTodos()
  }

//PUT tasks
  const statusTodo = async (id, status) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status
      })
    });
    fetchTodos();
  }

//DELETE tasks
  const removeTodo = async (id) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
      method: "DELETE"
    })
    fetchTodos()
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
        {todos && todos
          .filter((todo) =>
            priorityFilter === "All"
              ? true
              : todo.priority === priorityFilter
          )

          .filter((todo) =>
            statusFilter === "All"
              ? true
              : statusFilter === "Complete"
                ? todo.status === true
                : todo.status === false
          )

          .filter((todo) =>
            categoryFilter === "All"
              ? true
              : todo.category === categoryFilter
          )


          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo} 
              removeTodo={removeTodo}
              addTodo={addTodo}
              statusTodo={statusTodo}
            />
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;