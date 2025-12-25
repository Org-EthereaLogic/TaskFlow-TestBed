import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token from storage on page load
const storedAuth = localStorage.getItem('auth-storage');
if (storedAuth) {
  try {
    const { state } = JSON.parse(storedAuth);
    if (state?.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    }
  } catch {
    // Invalid stored auth, ignore
  }
}

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
