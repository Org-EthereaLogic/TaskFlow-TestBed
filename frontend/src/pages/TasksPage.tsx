import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
import type { Task, PaginatedResponse } from "../types";
import TaskCard from "../components/TaskCard";

export default function TasksPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Task>>("/tasks");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-md">
        Failed to load tasks. Please try again.
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
        <Link
          to="/tasks/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          New Task
        </Link>
      </div>

      {/* Task list */}
      {data?.items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No tasks yet. Create your first task!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data?.items.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      {/* Pagination info */}
      {data && data.total > 0 && (
        <div className="mt-6 text-sm text-gray-500 text-center">
          Showing {data.items.length} of {data.total} tasks
        </div>
      )}
    </div>
  );
}
