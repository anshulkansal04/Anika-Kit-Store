import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import Loading from '../components/Loading';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  ArrowRightOnRectangleIcon,
  TagIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const { admin, logout, isAuthenticated, loading: authLoading } = useAuth();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    tag: '',
    image: null,
    featured: false
  });
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    description: '',
    image: null,
    sortOrder: 0
  });

  const currentSection = section || 'overview';

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      if (currentSection === 'categories') {
        fetchCategories();
      } else {
        fetchProducts();
        // Also fetch categories for the product form dropdown
        fetchCategories();
      }
    }
  }, [isAuthenticated, searchTerm, selectedTag, currentSection]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedTag) params.tag = selectedTag;
      
      const response = await productService.getAdminProducts(params);
      if (response.success) {
        setProducts(response.data.products);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      
      const response = await categoryService.getAdminCategories(params);
      if (response.success) {
        setCategories(response.data.categories);
      } else {
        setError('Failed to fetch categories');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('tag', formData.tag);
    form.append('featured', formData.featured);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      const response = await productService.createProduct(form);
      if (response.success) {
        setShowAddForm(false);
        resetForm();
        fetchProducts();
        setError(null);
      } else {
        setError(response.message || 'Failed to create product');
      }
    } catch (err) {
      console.error('Error creating product:', err);
      setError(err.response?.data?.message || 'Failed to create product');
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    
    const form = new FormData();
    form.append('name', categoryFormData.name);
    form.append('description', categoryFormData.description);
    form.append('sortOrder', categoryFormData.sortOrder);
    if (categoryFormData.image) {
      form.append('image', categoryFormData.image);
    }

    try {
      const response = await categoryService.createCategory(form);
      if (response.success) {
        setShowAddForm(false);
        resetCategoryForm();
        fetchCategories();
        setError(null);
      } else {
        setError(response.message || 'Failed to create category');
      }
    } catch (err) {
      console.error('Error creating category:', err);
      setError(err.response?.data?.message || 'Failed to create category');
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    
    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('tag', formData.tag);
    form.append('featured', formData.featured);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      const response = await productService.updateProduct(editingProduct._id, form);
      if (response.success) {
        setEditingProduct(null);
        resetForm();
        fetchProducts();
        setError(null);
      } else {
        setError(response.message || 'Failed to update product');
      }
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err.response?.data?.message || 'Failed to update product');
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    
    const form = new FormData();
    form.append('name', categoryFormData.name);
    form.append('description', categoryFormData.description);
    form.append('sortOrder', categoryFormData.sortOrder);
    if (categoryFormData.image) {
      form.append('image', categoryFormData.image);
    }

    try {
      const response = await categoryService.updateCategory(editingCategory._id, form);
      if (response.success) {
        setEditingCategory(null);
        resetCategoryForm();
        fetchCategories();
        setError(null);
      } else {
        setError(response.message || 'Failed to update category');
      }
    } catch (err) {
      console.error('Error updating category:', err);
      setError(err.response?.data?.message || 'Failed to update category');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await productService.deleteProduct(productId);
      if (response.success) {
        fetchProducts();
        setError(null);
      } else {
        setError(response.message || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err.response?.data?.message || 'Failed to delete product');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await categoryService.deleteCategory(categoryId);
      if (response.success) {
        fetchCategories();
        setError(null);
      } else {
        setError(response.message || 'Failed to delete category');
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      setError(err.response?.data?.message || 'Failed to delete category');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      categoryId: '',
      tag: '',
      image: null,
      featured: false
    });
  };

  const resetCategoryForm = () => {
    setCategoryFormData({
      name: '',
      description: '',
      image: null,
      sortOrder: 0
    });
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    
    // Find the category that matches the product's category or tag
    const matchingCategory = categories.find(cat => 
      (product.categories && product.categories.length > 0 && cat._id === product.categories[0]._id) ||
      cat.name.toLowerCase().replace(/\s+/g, '-') === product.tag
    );
    
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: matchingCategory ? matchingCategory._id : '',
      tag: product.tag,
      image: null,
      featured: product.featured
    });
    setShowAddForm(true);
  };

  const startCategoryEdit = (category) => {
    setEditingCategory(category);
    setCategoryFormData({
      name: category.name,
      description: category.description || '',
      image: null,
      sortOrder: category.sortOrder
    });
    setShowAddForm(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (authLoading) return <Loading text="Loading..." />;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
                ← E-Catalogue
              </Link>
              <div className="h-6 border-l border-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {admin?.name}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => navigate('/admin/dashboard/overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                currentSection === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => navigate('/admin/dashboard/categories')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                currentSection === 'categories'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => navigate('/admin/dashboard/products')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                currentSection === 'products'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Products
            </button>
          </nav>
        </div>

        {/* Overview Section */}
        {currentSection === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                      <TagIcon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Categories</dt>
                      <dd className="text-lg font-medium text-gray-900">{categories.length}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-bold">P</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
                      <dd className="text-lg font-medium text-gray-900">{products.length}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-bold">A</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Products</dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {products.filter(p => p.isActive).length}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories Section */}
        {currentSection === 'categories' && (
          <div>
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowAddForm(true);
                    setEditingCategory(null);
                    resetCategoryForm();
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Category
                </button>
              </div>
            </div>

            {/* Add/Edit Category Form */}
            {showAddForm && currentSection === 'categories' && (
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h3>
                
                <form onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category Name *</label>
                      <input
                        type="text"
                        required
                        value={categoryFormData.name}
                        onChange={(e) => setCategoryFormData({...categoryFormData, name: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., Kitchen & Home"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Sort Order</label>
                      <input
                        type="number"
                        min="0"
                        value={categoryFormData.sortOrder}
                        onChange={(e) => setCategoryFormData({...categoryFormData, sortOrder: parseInt(e.target.value) || 0})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      rows={3}
                      value={categoryFormData.description}
                      onChange={(e) => setCategoryFormData({...categoryFormData, description: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Brief description of the category"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category Image *</label>
                    <input
                      type="file"
                      accept="image/*"
                      required={!editingCategory}
                      onChange={(e) => setCategoryFormData({...categoryFormData, image: e.target.files[0]})}
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="mt-1 text-sm text-gray-500">Recommended size: 400x300px</p>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingCategory(null);
                        resetCategoryForm();
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {editingCategory ? 'Update Category' : 'Create Category'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Categories Grid */}
            {loading ? (
              <Loading text="Loading categories..." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <div key={category._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={category.image.url}
                        alt={category.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {category.name}
                          </h3>
                          {category.description && (
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {category.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Order: {category.sortOrder}</span>
                            <span>{category.productCount || 0} products</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <button
                          onClick={() => startCategoryEdit(category)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category._id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {categories.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <TagIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No categories</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating your first category.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Products Section */}
        {currentSection === 'products' && (
          <div>
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Categories</option>
                    {Array.from(new Set(products.map(p => p.tag))).map(tag => (
                      <option key={tag} value={tag} className="capitalize">{tag}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => {
                    setShowAddForm(true);
                    setEditingProduct(null);
                    resetForm();
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Product
                </button>
              </div>
            </div>

            {/* Add/Edit Product Form */}
            {showAddForm && currentSection === 'products' && (
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                
                <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category *</label>
                      <select
                        required
                        value={formData.categoryId}
                        onChange={(e) => {
                          const selectedCategory = categories.find(cat => cat._id === e.target.value);
                          setFormData({
                            ...formData, 
                            categoryId: e.target.value,
                            tag: selectedCategory ? selectedCategory.name.toLowerCase().replace(/\s+/g, '-') : ''
                          });
                        }}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a category...</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {categories.length === 0 && (
                        <p className="mt-1 text-sm text-gray-500">
                          No categories available. Please create a category first.
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Product Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        required={!editingProduct}
                        onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                      Featured Product
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingProduct(null);
                        resetForm();
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products List */}
            {loading ? (
              <Loading text="Loading products..." />
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <li key={product._id}>
                      <div className="px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img
                              className="h-16 w-16 rounded-lg object-cover"
                              src={product.image?.url || (product.images?.[0]?.url)}
                              alt={product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-gray-900">{product.name}</p>
                              {product.featured && (
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{product.description?.substring(0, 100)}...</p>
                            <div className="mt-1 flex items-center space-x-4">
                              <span className="text-sm font-medium text-gray-900">${product.price}</span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                                {product.tag}
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                product.isActive 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {product.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => startEdit(product)}
                            className="p-2 text-blue-600 hover:text-blue-800"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="p-2 text-red-600 hover:text-red-800"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                {products.length === 0 && (
                  <div className="text-center py-12">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 