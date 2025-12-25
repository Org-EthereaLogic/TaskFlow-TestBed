import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import TaskDetail from './pages/TaskDetail';
import TaskList from './pages/TaskList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
