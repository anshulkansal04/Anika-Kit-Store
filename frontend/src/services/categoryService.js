import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/';

const categoryAPI = axios.create({
  baseURL: `${API_BASE_URL}api/categories`,
});

// Add token to requests if available
categoryAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const categoryService = {
  // Public routes
  getAllCategories: async (params = {}) => {
    const response = await categoryAPI.get('/', { params });
    return response.data;
  },

  getCategoryById: async (id) => {
    const response = await categoryAPI.get(`/${id}`);
    return response.data;
  },



  // Admin routes
  getAdminCategories: async (params = {}) => {
    const response = await categoryAPI.get('/admin/all', { params });
    return response.data;
  },

  createCategory: async (formData) => {
    const response = await categoryAPI.post('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateCategory: async (id, formData) => {
    const response = await categoryAPI.put(`/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await categoryAPI.delete(`/${id}`);
    return response.data;
  }
}; 