"use client";

import { useState, useEffect } from "react";
import { Todo, User } from "../libs/types";
import { DEFAULT_TODOS } from "../constant/todo";
import TodoItem from "./todo-item";
import { getMonthProgress } from "@/lib/get-month-progress";
import { toast } from "sonner";
import { hijriToday } from "@/constant/hijri";
import { Loader2 } from "lucide-react";
import DateSelection from "./date-selection";
import PeriodCheck from "./period-check";
import { useUser } from "@/_context/user-context";

const PERIOD_TODOS = DEFAULT_TODOS.filter(todo => todo.isPeriodCan);


export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(DEFAULT_TODOS);
  // const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  // date selection
  const [selectedDate, setSelectedDate] = useState(hijriToday());
  const { periodDates } = useUser();


  const handlePeriodChange = async (periodStatus: boolean) => {
    // filter the todos that are period can 
    if (periodStatus) {
      const periodTodos = todos.filter((todo: Todo) => PERIOD_TODOS.some(t => t.id === todo.id));
      setTodos(periodTodos);

      // Save to localStorage
      localStorage.setItem("todos", JSON.stringify(periodTodos));
    } else {
      fetchTodos(selectedDate.format("iYYYY-iMM-iDD"));
    }
  };

  const fetchTodos = async (date: string) => {
    try {
      setIsLoading(true);

      if (navigator.onLine && user && !user.isAnonymous) {
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
          } else {
            setTodos(updatedTodos);
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
        setTodos(JSON.parse(savedTodos));
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
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const userData = localStorage.getItem("user");
    setUser(JSON.parse(userData as string));

    fetchTodos(selectedDate.format("iYYYY-iMM-iDD"));

    // fetch isPeriod
    // const isPeriod = localStorage.getItem("isPeriod");
    // if (isPeriod) {
    //   setTodos(periodTodos);
    // } else {
    //   fetchIsPeriod(selectedDate, user?.id as string).then(data => {
    //     if (data) {
    //       setTodos(periodTodos);
    //     }
    //   });
    // }

  }, [selectedDate]);

  // Add date navigation functions
  const goToPreviousDay = () => {
    setSelectedDate(prev => prev.clone().subtract(1, 'day'));
  };

  const goToNextDay = () => {
    if (selectedDate.isAfter(hijriToday())) {
      return;
    }
    setSelectedDate(prev => prev.clone().add(1, 'day'));
  };

  const goToToday = () => {
    setSelectedDate(hijriToday());
  };

  const toggleTodo = async (id: number) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);

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
    <div className="max-w-md mx-auto p-4 space-y-4 relative">
      {/* Add date navigation */}
      <DateSelection
        selectedDate={selectedDate}
        goToPreviousDay={goToPreviousDay}
        goToNextDay={goToNextDay}
        goToToday={goToToday}
      />
      {user && user.gender === "female" && (
        <PeriodCheck
          selectedDate={selectedDate}
          onPeriodChange={handlePeriodChange}
          user={user}
        />
      )}
      {/* {!isOnline && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mb-4 rounded text-yellow-700">
          <p className="font-medium">
            You're offline. Changes will be saved locally.
          </p>
        </div>
      )} */}

      <div className="relative min-h-[400px]"> {/* Add this wrapper div with min-height */}
        {isLoading && (
          <div className="z-5 bg-background/80 absolute inset-0 flex flex-col items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        )}

        <ul className="space-y-3">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
          ))}
        </ul>
      </div>
    </div>
  );
}
