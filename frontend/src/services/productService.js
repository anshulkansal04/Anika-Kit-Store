import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const productAPI = axios.create({
  baseURL: `${API_BASE_URL}/products`,
});

// Add token to requests if available
productAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productService = {
  // Public routes
  getAllProducts: async (params = {}) => {
    const response = await productAPI.get('/', { params });
    return response.data;
  },

  getProductById: async (id) => {
    const response = await productAPI.get(`/${id}`);
    return response.data;
  },

  getProductsByCategory: async (categoryId, params = {}) => {
    const response = await productAPI.get(`/category/${categoryId}`, { params });
    return response.data;
  },

  getProductsByTag: async (tag, params = {}) => {
    const response = await productAPI.get(`/tag/${tag}`, { params });
    return response.data;
  },

  getAllTags: async () => {
    const response = await productAPI.get('/tags/all');
    return response.data;
  },

  // Admin routes
  getAdminProducts: async (params = {}) => {
    const response = await productAPI.get('/admin/all', { params });
    return response.data;
  },

  createProduct: async (formData) => {
    const response = await productAPI.post('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateProduct: async (id, formData) => {
    const response = await productAPI.put(`/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await productAPI.delete(`/${id}`);
    return response.data;
  },

  searchProducts: async (searchTerm, params = {}) => {
    const response = await productAPI.get('/', { 
      params: { search: searchTerm, ...params } 
    });
    return response.data;
  }
}; 