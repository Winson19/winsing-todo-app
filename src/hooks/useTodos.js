import { useEffect, useState } from "react";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    
    if (storedTodos) {
      // Parse and set todos if available in localStorage
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save to localStorage whenever todos change
  useEffect(() => {
    if (todos.length > 0) {
      // Only store todos in localStorage if it's not an empty array
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  return [todos, setTodos];
};
