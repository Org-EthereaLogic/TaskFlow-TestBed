import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { api } from '../utils/api';
import { Task, TaskStatus } from '../types/task';

const statusColors: Record<TaskStatus, string> = {
  todo: 'bg-gray-100 text-gray-800',
  in_progress: 'bg-blue-100 text-blue-800',
  review: 'bg-yellow-100 text-yellow-800',
  done: 'bg-green-100 text-green-800',
};

export default function TaskList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await api.get('/api/tasks');
      return response.data as { items: Task[]; total: number };
    },
  });

  if (isLoading) {
    return <div className="text-center">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error loading tasks</div>;
  }

  const tasks = data?.items ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
        <button className="rounded bg-primary-600 px-4 py-2 text-white hover:bg-primary-700">
          New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400">No tasks yet. Create your first task!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <Link
              key={task.id}
              to={`/tasks/${task.id}`}
              className="block rounded-lg bg-white p-4 shadow transition hover:shadow-md dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900 dark:text-white">{task.title}</h2>
                <span className={`rounded-full px-2 py-1 text-xs ${statusColors[task.status]}`}>
                  {task.status.replace('_', ' ')}
                </span>
              </div>
              {task.description && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {task.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
