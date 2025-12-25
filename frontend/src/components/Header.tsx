import { Link } from 'react-router-dom';

import { useAuthStore } from '../hooks/useAuthStore';

export default function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-400">
            TaskFlow
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/tasks"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Tasks
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-600 dark:text-gray-300">{user.username}</span>
                <button
                  onClick={logout}
                  className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
