import { createAPIClient } from './apiClient';

const categoryAPI = createAPIClient('api/categories');

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
  },

  updateCategoriesOrder: async (orderUpdates) => {
    const response = await categoryAPI.put('/admin/reorder', { orderUpdates });
    return response.data;
  }
}; 