import axios from 'axios';
import Cookies from 'js-cookie';

const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!envUrl) return 'http://localhost:5001/api/admin';

  // If it already ends with /admin, use it
  if (envUrl.endsWith('/admin')) return envUrl;

  // If it ends with /api, append /admin
  if (envUrl.endsWith('/api')) return `${envUrl}/admin`;

  // Otherwise, assume it's the root and append /api/admin
  // But to be safe, if it doesn't have /api, maybe it's just the domain?
  // Let's assume if it doesn't end in /admin, we should append /admin if it ends in /api, 
  // or append /api/admin if it's just a domain.
  // However, the user instruction was to set it to .../api.
  // So checking for /api suffix is the most important.
  return `${envUrl}/admin`;
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
