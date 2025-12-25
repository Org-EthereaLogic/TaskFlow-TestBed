import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import { api } from '../utils/api';
import { Task } from '../types/task';

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: task, isLoading, error } = useQuery({
    queryKey: ['task', id],
    queryFn: async () => {
      const response = await api.get(`/api/tasks/${id}`);
      return response.data as Task;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="text-center">Loading task...</div>;
  }

  if (error || !task) {
    return (
      <div className="text-center">
        <p className="text-red-600">Task not found</p>
        <Link to="/tasks" className="text-primary-600 hover:underline">
          Back to tasks
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/tasks" className="text-primary-600 hover:underline">
        ← Back to tasks
      </Link>

      <div className="mt-4 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{task.title}</h1>

        <div className="mt-4 flex gap-4">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
            {task.status.replace('_', ' ')}
          </span>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
            {task.priority}
          </span>
        </div>

        {task.description && (
          <div className="mt-6">
            <h2 className="font-semibold text-gray-700 dark:text-gray-300">Description</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{task.description}</p>
          </div>
        )}

        <div className="mt-6 border-t pt-4 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Created: {new Date(task.created_at).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Updated: {new Date(task.updated_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
