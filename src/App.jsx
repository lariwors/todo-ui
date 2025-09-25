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

  const addTodo = (text, category, priority) => {
    const newTodos = [
      ...todos,
      {
        id: Math.floor(Math.random() * 1000),
        text,
        category,
        priority,
        isCompleted: false,
      },
    ];
    setTodos(newTodos);
  };

  const removeTodo = async (id) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
      method: "DELETE"
    })
    fetchTodos()
  }

  const completeTodo = (id) => {
    const newTodos = [...todos]
    newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo
    );
    setTodos(newTodos);
  };

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
                ? todo.isCompleted
                : !todo.isCompleted
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
              todo={todo} removeTodo={removeTodo}
              completeTodo={completeTodo}
            />
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
