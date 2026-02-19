"use client";

import { useState, useEffect } from "react";
import { Category, Todo, User } from "../lib/types";
import { CATEGORIES, DEFAULT_TODOS } from "../constant/todo";
import TodoItem from "./todo-item";
import { getMonthProgress } from "@/lib/get-month-progress";
import { toast } from "sonner";
import { hijriToday } from "@/constant/hijri";
import { Loader2 } from "lucide-react";
import DateSelection from "./date-selection";
import PeriodCheck from "./period-check";
import { useUser } from "@/_context/user-context";

const PERIOD_TODOS = DEFAULT_TODOS.filter(todo => todo.isPeriodCan);

interface TodoListProps {
    onTodosChange: (todos: Todo[]) => void;
}

export function TodoList({ onTodosChange }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(DEFAULT_TODOS);
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES.RECOMMENDED);

  const [isLoading, setIsLoading] = useState(true);
  // date selection
  const [selectedDate, setSelectedDate] = useState(hijriToday());
  const { user, periodDates } = useUser();

  // Add this function to filter todos by category
  const getFilteredTodos = () => {
    const filteredTodos = todos.filter(todo => todo.category === activeCategory);
    return filteredTodos.length > 0 ? filteredTodos : filteredTodos;
  };

  const handlePeriodChange = async (periodStatus: boolean) => {
    // filter the todos that are period can 
    if (periodStatus) {
      const periodTodos = todos.filter((todo: Todo) => PERIOD_TODOS.some(t => t.id === todo.id));
      setTodos(periodTodos);
      onTodosChange(periodTodos);

      // Save to localStorage
      localStorage.setItem("todos", JSON.stringify(periodTodos));
    } else {
      fetchTodos(selectedDate.format("iYYYY-iMM-iDD"));
    }
  };

  const fetchTodos = async (date: string) => {
    try {
      setIsLoading(true);

      if (user && !user.isAnonymous) {
        // Try to fetch from API first
        const { id, username } = user;
        const response = await fetch(
          `/api/todos?id=${id}&name=${username}&date=${date}`,
        );

        if (response.ok) {
          const data = await response.json();
          // if undefined, complete to false
          if (data.length === 0) {
            setTodos(DEFAULT_TODOS);
            onTodosChange(DEFAULT_TODOS);
            return;
          }

          const updatedTodos = data.map((todo: Todo) => ({
            ...todo,
            completed: todo.completed === undefined ? false : todo.completed,
          }));

          // has the same id
          const periodTodos = updatedTodos.filter((todo: Todo) => PERIOD_TODOS.some(t => t.id === todo.id));

          if (periodDates[selectedDate.format("iYYYY-iMM-iDD")]) {
            setTodos(periodTodos);
            onTodosChange(periodTodos);
          } else {
            setTodos(updatedTodos);
            onTodosChange(updatedTodos);
          }

          // Cache the data
          // localStorage.setItem("todos", JSON.stringify(updatedTodos));
          localStorage.setItem("lastSavedDate", hijriToday().format("iYYYY-iMM-iDD"));
          return;
        }
      }

      // If offline or API failed, try localStorage
      const lastSavedDate = localStorage.getItem("lastSavedDate");
      const savedTodos = localStorage.getItem("todos");

      if (lastSavedDate === date && savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos);
        onTodosChange(parsedTodos);
      } else {
        // localStorage.setItem("todos", JSON.stringify(todos));
        localStorage.setItem("lastSavedDate", date);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      // Fall back to defaults on error
      const newTodos = DEFAULT_TODOS.map((todo, index) => ({
        ...todo,
        id: index + 1,
      }));
      setTodos(newTodos);
      onTodosChange(newTodos);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos(selectedDate.format("iYYYY-iMM-iDD"));
  }, [selectedDate]);

  useEffect(() => {
    fetchTodos(selectedDate.format("iYYYY-iMM-iDD"));
  }, []);

  const toggleTodo = async (id: number) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    onTodosChange(newTodos);

    // Save to localStorage as backup
    localStorage.setItem("todos", JSON.stringify(newTodos));

    // Update progress array
    const tasks = newTodos.map(todo => ({
      date: selectedDate.format("iYYYY-iMM-iDD"),
      completed: todo.completed
    }));

    const monthProgress = getMonthProgress(tasks, periodDates);

    // Save to localStorage
    localStorage.setItem("monthProgress", JSON.stringify(monthProgress));

    // prepare the updated data
    const updateData = {
      completed: !todos.find((t) => t.id === id)?.completed,
      date: selectedDate.format("iYYYY-iMM-iDD"),
      userId: user?.id,
    }

    // check if all todos are completed, if so, show toast
    if (newTodos.every(todo => todo.completed)) {
      toast.success("Alhamdulillah! You've fully grown your flower for today!");
    }

    // save progress to API if online and user is logged in
    if (user && !user.isAnonymous) {
      try {
        const response = await fetch(`/api/todos/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          throw new Error("Failed to update todo");
        }

      } catch (error) {
        console.error("Error updating todo:", error);
        toast.error("Failed to update todo");
      }
    }
  };

  return (
    <div className="space-y-4 relative">
      {/* Add date navigation */}
      <DateSelection
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Add the new tabs UI */}
      {/* <div className="flex space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
        {Object.entries(CATEGORIES).map(([key, value]) => (
          <button
            key={value}
            onClick={() => setActiveCategory(value)}
            className={`
              flex-1 px-4 py-2 rounded-md text-sm font-medium
              transition-colors duration-200
              ${activeCategory === value
                ? "bg-white dark:bg-slate-700 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50"
              }
            `}
          >
            {key.charAt(0) + key.slice(1).toLowerCase()}
          </button>
        ))}
      </div> */}

      {user && user.gender === "female" && (
        <PeriodCheck
          selectedDate={selectedDate}
          onPeriodChange={handlePeriodChange}
          user={user}
        />
      )}

      <div className="relative min-h-[400px]"> {/* Add this wrapper div with min-height */}
        {isLoading && (
          <div className="z-5 bg-background/80 absolute inset-0 flex flex-col items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        )}

        <ul className="space-y-3">
          {getFilteredTodos().map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
          ))}
        </ul>
      </div>
    </div>
  );
}
