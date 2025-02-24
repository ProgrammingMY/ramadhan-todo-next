"use client";

import { useState, useEffect, useCallback } from "react";
import { ConfettiPiece, type Confetti } from "./confetti";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const CONFETTI_COLORS = [
  "#FF69B4", // pink
  "#FFD700", // gold
  "#00CED1", // turquoise
  "#FF6347", // tomato
  "#98FB98", // pale green
];

const DEFAULT_TODOS: Todo[] = [
  { id: 1, text: "Qiam", completed: false },
  { id: 2, text: "Bersahur", completed: false },
  { id: 3, text: "Membaca Al-Quran", completed: false },
  { id: 4, text: "Berzikir/Berselawat", completed: false },
  { id: 5, text: "Bersedakah/Memberi Makanan Berbuka", completed: false },
  { id: 6, text: "Berdoa Sebelum Berbuka", completed: false },
  { id: 7, text: "Solat Terawih", completed: false },
  { id: 8, text: "Beriktikaf Di Dalam Masjid", completed: false },
];

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(DEFAULT_TODOS);
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  const createConfetti = useCallback((event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create multiple confetti pieces
    const newConfetti = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      x: centerX,
      y: centerY,
      color:
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      angle: Math.random() * 360,
    }));

    setConfetti((prev) => [...prev, ...newConfetti]);

    // Remove confetti after animation
    setTimeout(() => {
      setConfetti((prev) =>
        prev.filter((c) => !newConfetti.find((nc) => nc.id === c.id))
      );
    }, 2000);
  }, []);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const user = localStorage.getItem("user");
        if (!user) {
          return;
        }
        const { id, username } = JSON.parse(user as string);

        const today = new Date().toISOString().split("T")[0];

        if (navigator.onLine) {
          // Try to fetch from API first
          const response = await fetch(
            `/api/todos?id=${id}&name=${username}&date=${today}`
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

  const toggleTodo = async (id: number, event: React.MouseEvent) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo?.completed) {
      // Only create droplet when completing a task
      createConfetti(event);
    }
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);

    const user = localStorage.getItem("user");
    const { id: userId } = JSON.parse(user as string);

    // Save to localStorage as backup
    localStorage.setItem("todos", JSON.stringify(newTodos));

    if (isOnline) {
      try {
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
        Daily Tasks
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
          <li
            key={todo.id}
            onClick={(event) => toggleTodo(todo.id, event)}
            className={`
              transform transition-all duration-200 
              hover:scale-102 cursor-pointer
              rounded-xl shadow-lg
              ${
                todo.completed
                  ? "bg-emerald-100 border-2 border-emerald-500"
                  : "bg-white border-2 border-transparent hover:border-emerald-500"
              }
            `}
          >
            <div className="flex items-center p-4 gap-4">
              <div
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center
                  border-2 transition-colors duration-200
                  ${
                    todo.completed
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-slate-300 hover:border-emerald-500"
                  }
                `}
              >
                {todo.completed && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span
                className={`
                  flex-1 text-lg transition-all duration-200
                  ${
                    todo.completed
                      ? "text-emerald-800 line-through opacity-75 font-bold"
                      : "text-slate-700 font-bold"
                  }
                `}
              >
                {todo.text}
              </span>
            </div>
          </li>
        ))}
      </ul>
      {/* Add the droplets */}
      {confetti.map((piece) => (
        <ConfettiPiece key={piece.id} {...piece} />
      ))}
    </div>
  );
}
