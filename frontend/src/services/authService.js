import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
authAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email, password) => {
    const response = await authAPI.post('/login', { email, password });
    return response.data;
  },

  register: async (name, email, password) => {
    const response = await authAPI.post('/register', { name, email, password });
    return response.data;
  },

  verifyToken: async () => {
    const response = await authAPI.get('/verify');
    return response.data;
  },

  getProfile: async () => {
    const response = await authAPI.get('/profile');
    return response.data;
  },

  logout: async () => {
    const response = await authAPI.post('/logout');
    return response.data;
  }
}; 