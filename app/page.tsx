"use client";

export const dynamic = "force-static";

import { TodoList } from "./_components/todo-list";


export default function Page() {
  return (
    <div className="pb-16">
      <TodoList />
    </div>
  );
}
