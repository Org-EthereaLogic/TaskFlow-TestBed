import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";
import type { Task } from "../types";

export default function TaskDetailPage() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: task, isLoading, error } = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await api.get<Task>(`/tasks/${taskId}`);
      return response.data;
    },
    enabled: !!taskId,
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate("/tasks");
    },
  });

  if (isLoading) {
    return <div className="text-gray-500">Loading task...</div>;
  }

  if (error || !task) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-md">
        Task not found or failed to load.
      </div>
    );
  }

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
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
              {task.status.replace("_", " ")}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/tasks/${task.id}/edit`)}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-500 mb-2">Description</h2>
        <p className="text-gray-900 whitespace-pre-wrap">
          {task.description || "No description provided."}
        </p>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Created:</span>
          <span className="ml-2 text-gray-900">
            {new Date(task.created_at).toLocaleDateString()}
          </span>
        </div>
        <div>
          <span className="text-gray-500">Updated:</span>
          <span className="ml-2 text-gray-900">
            {new Date(task.updated_at).toLocaleDateString()}
          </span>
        </div>
        {task.due_date && (
          <div>
            <span className="text-gray-500">Due:</span>
            <span className="ml-2 text-gray-900">
              {new Date(task.due_date).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Back button */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={() => navigate("/tasks")}
          className="text-blue-600 hover:text-blue-700"
        >
          ← Back to tasks
        </button>
      </div>
    </div>
  );
}
