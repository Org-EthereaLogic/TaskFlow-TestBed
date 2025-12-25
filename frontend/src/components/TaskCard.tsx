import { Link } from "react-router-dom";
import type { Task } from "../types";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const statusColors: Record<string, string> = {
    todo: "bg-gray-100 text-gray-800",
    in_progress: "bg-blue-100 text-blue-800",
    review: "bg-yellow-100 text-yellow-800",
    done: "bg-green-100 text-green-800",
  };

  const priorityColors: Record<string, string> = {
    low: "bg-gray-100 text-gray-600",
    medium: "bg-blue-100 text-blue-600",
    high: "bg-orange-100 text-orange-600",
    urgent: "bg-red-100 text-red-600",
  };

  return (
    <Link
      to={`/tasks/${task.id}`}
      className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
          {task.description && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2 ml-4">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}
          >
            {task.status.replace("_", " ")}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
        <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
        {task.due_date && (
          <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
        )}
      </div>
    </Link>
  );
}
