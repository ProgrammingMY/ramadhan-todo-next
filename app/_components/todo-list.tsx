"use client";

import { useState, useEffect } from "react";
import { TaskProgress, Todo } from "../libs/types";
import { DEFAULT_TODOS } from "../constant/todo";
import TodoItem from "./todo-item";


export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(DEFAULT_TODOS);
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const user = localStorage.getItem("user");

        const today = new Date().toISOString().split("T")[0];

        if (navigator.onLine && user) {
          // Add timeout to API requests
          // Try to fetch from API first
          const { id, username } = JSON.parse(user as string);
          const response = await fetch(
            `/api/todos?id=${id}&name=${username}&date=${today}`,
          );

          if (response.ok) {
            const data = await response.json();
            // if undefined, complete to false

            if (data.length === 0) {
              setTodos(DEFAULT_TODOS);
              return;
            }

            const updatedTodos = data.map((todo: Todo) => ({
              ...todo,
              completed: todo.completed === undefined ? false : todo.completed,
            }));
            setTodos(updatedTodos);
            // Cache the data
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            localStorage.setItem("lastSavedDate", new Date().toDateString());
            return;
          }
        }

        // If offline or API failed, try localStorage
        const lastSavedDate = localStorage.getItem("lastSavedDate");
        const savedTodos = localStorage.getItem("todos");

        if (lastSavedDate === today && savedTodos) {
          setTodos(JSON.parse(savedTodos));
        } else {
          localStorage.setItem("todos", JSON.stringify(todos));
          localStorage.setItem("lastSavedDate", today);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
        // Fall back to defaults on error
        const newTodos = DEFAULT_TODOS.map((todo, index) => ({
          ...todo,
          id: index + 1,
        }));
        setTodos(newTodos);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTodos();

    // Setup online/offline detection
    const handleOnline = () => {
      setIsOnline(true);
      fetchTodos(); // Refetch when coming back online
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const toggleTodo = async (id: number) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);

    const user = localStorage.getItem("user");

    // Save to localStorage as backup
    localStorage.setItem("todos", JSON.stringify(newTodos));

    // Get today's date
    const today = new Date();

    // Get existing progress or initialize new array
    const existingProgress: TaskProgress[] = JSON.parse(localStorage.getItem("monthProgress") || "[]");

    // Create or update today's progress
    const todayStr = today.toISOString().split("T")[0];
    const todayTasks = newTodos.map(todo => ({
      date: todayStr,
      completed: todo.completed
    }));

    // Update progress array
    const progressWithoutToday = existingProgress.filter(p => p.date !== todayStr);
    const updatedProgress = [...progressWithoutToday, ...todayTasks];

    // Save to localStorage
    localStorage.setItem("monthProgress", JSON.stringify(updatedProgress));

    // save progress to API if online and user is logged in
    if (isOnline && user) {
      try {
        const { id: userId } = JSON.parse(user as string);
        const response = await fetch(`/api/todos/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !todos.find((t) => t.id === id)?.completed,
            date: new Date().toISOString().split("T")[0],
            userId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update todo");
        }
      } catch (error) {
        console.error("Error updating todo:", error);
        // Optionally handle the error (e.g., show error message to user)
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-white text-center">
        Sunnah Ramadhan
      </h2>
      {!isOnline && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mb-4 rounded text-yellow-700">
          <p className="font-medium">
            You're offline. Changes will be saved locally.
          </p>
        </div>
      )}

      <ul className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
          />
        ))}
      </ul>
    </div>
  );
}
