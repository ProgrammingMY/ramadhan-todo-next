import { useReward } from 'react-rewards';
import { Todo } from '../libs/types';

const TodoItem = ({ todo, onToggle }: { todo: Todo; onToggle: (id: number) => void }) => {
    const { reward, isAnimating } = useReward(`reward-${todo.id}`, "confetti", {
      startVelocity: 10,
      zIndex: 500
    });
  
    const handleClick = () => {
      if (!isAnimating && !todo.completed) {
        reward();
      }
      onToggle(todo.id);
    };
  
    return (
        <li
        key={todo.id}
        onClick={handleClick}
        className={`
          transform transition-all duration-200 
          hover:scale-102 cursor-pointer
          rounded-xl shadow-lg
          ${todo.completed
            ? "bg-emerald-100 border-2 border-emerald-500"
            : "bg-white border-2 border-transparent hover:border-emerald-500"
          }
        `}
      >
        <div className="flex items-center p-4 gap-4" id={`reward-${todo.id}`}>
          <div
            className={`
              w-6 h-6 rounded-full flex items-center justify-center
              border-2 transition-colors duration-200
              ${todo.completed
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
              ${todo.completed
                ? "text-emerald-800 line-through opacity-75 font-bold"
                : "text-slate-700 font-bold"
              }
            `}
          >
            {todo.text}
          </span>
        </div>
      </li>
    );
  };

  export default TodoItem;