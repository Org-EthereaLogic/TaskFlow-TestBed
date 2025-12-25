import { Link } from 'react-router-dom';

import { useAuthStore } from '../hooks/useAuthStore';

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Welcome to TaskFlow
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {user ? `Hello, ${user.username}!` : 'Manage your tasks efficiently'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tasks</h2>
          <p className="mt-2 text-3xl font-bold text-primary-600">0</p>
          <p className="text-gray-500 dark:text-gray-400">Total tasks</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">In Progress</h2>
          <p className="mt-2 text-3xl font-bold text-yellow-600">0</p>
          <p className="text-gray-500 dark:text-gray-400">Active tasks</p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Completed</h2>
          <p className="mt-2 text-3xl font-bold text-green-600">0</p>
          <p className="text-gray-500 dark:text-gray-400">Done tasks</p>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/tasks"
          className="inline-block rounded bg-primary-600 px-6 py-3 text-white hover:bg-primary-700"
        >
          View All Tasks
        </Link>
      </div>
    </div>
  );
}
