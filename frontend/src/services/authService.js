import { createAPIClient } from './apiClient';

const authAPI = createAPIClient('api/auth', { 'Content-Type': 'application/json' });

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