const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { authenticateToken } = require('../middleware/auth');
const { upload, deleteImage } = require('../config/cloudinary');

const router = express.Router();

// Get all categories (public route)
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('active').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid query parameters',
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 20,
      active
    } = req.query;

    // Build query
    let query = {};
    if (active !== undefined) {
      query.isActive = active === 'true';
    }

    // Calculate skip
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get categories with pagination
    const categories = await Category.find(query)
      .sort({ sortOrder: 1, name: 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    // Update product count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({ 
          categories: category._id, 
          isActive: true 
        });
        
        // Update product count in database if different
        if (category.productCount !== productCount) {
          await Category.findByIdAndUpdate(category._id, { productCount });
        }
        
        return {
          ...category.toObject(),
          productCount
        };
      })
    );

    // Get total count for pagination
    const total = await Category.countDocuments(query);

    res.json({
      success: true,
      data: {
        categories: categoriesWithCount,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});



// Get category by ID (public route)
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      isActive: true
    }).select('-__v');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: { category }
    });

  } catch (error) {
    console.error('Get category error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create category (admin only)
router.post('/', authenticateToken, upload.single('image'), [
  body('name').trim().isLength({ min: 1, max: 100 }),
  body('description').optional().trim().isLength({ max: 500 }),
  body('sortOrder').optional().isInt({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data',
        errors: errors.array()
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Category image is required'
      });
    }

    const { name, description, sortOrder = 0 } = req.body;

    const category = new Category({
      name,
      description,
      sortOrder: parseInt(sortOrder),
      image: {
        url: req.file.path,
        publicId: req.file.filename
      }
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: { category }
    });

  } catch (error) {
    console.error('Create category error:', error);
    
    // Delete uploaded image if category creation fails
    if (req.file) {
      try {
        await deleteImage(req.file.filename);
      } catch (deleteError) {
        console.error('Error deleting image after failed category creation:', deleteError);
      }
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Category with this name already exists'
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update category (admin only)
router.put('/:id', authenticateToken, upload.single('image'), [
  body('name').optional().trim().isLength({ min: 1, max: 100 }),
  body('description').optional().trim().isLength({ max: 500 }),
  body('sortOrder').optional().isInt({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data',
        errors: errors.array()
      });
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    const { name, description, sortOrder } = req.body;
    const oldImagePublicId = category.image.publicId;

    // Update fields
    if (name) category.name = name;
    if (description !== undefined) category.description = description;
    if (sortOrder !== undefined) category.sortOrder = parseInt(sortOrder);

    // Update image if new one is uploaded
    if (req.file) {
      category.image = {
        url: req.file.path,
        publicId: req.file.filename
      };
    }

    await category.save();

    // Delete old image if new image was uploaded
    if (req.file && oldImagePublicId) {
      try {
        await deleteImage(oldImagePublicId);
      } catch (deleteError) {
        console.error('Error deleting old image:', deleteError);
      }
    }

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: { category }
    });

  } catch (error) {
    console.error('Update category error:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID'
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Category with this name already exists'
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete category (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if category has products
    const productCount = await Product.countDocuments({ categories: category._id });
    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category. It has ${productCount} products associated with it.`
      });
    }

    // Delete image from Cloudinary
    if (category.image.publicId) {
      try {
        await deleteImage(category.image.publicId);
      } catch (deleteError) {
        console.error('Error deleting image from Cloudinary:', deleteError);
      }
    }

    // Delete category from database
    await Category.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error('Delete category error:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get admin categories (includes inactive categories)
router.get('/admin/all', authenticateToken, [
  query('search').optional().trim(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('status').optional().isIn(['active', 'inactive', 'all'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid query parameters',
        errors: errors.array()
      });
    }

    const {
      search,
      page = 1,
      limit = 20,
      status = 'all'
    } = req.query;

    // Build query
    let query = {};

    // Add status filter
    if (status === 'active') {
      query.isActive = true;
    } else if (status === 'inactive') {
      query.isActive = false;
    }

    // Add search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Calculate skip
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get categories with pagination
    const categories = await Category.find(query)
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    // Update product count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({ 
          categories: category._id, 
          isActive: true 
        });
        return {
          ...category.toObject(),
          productCount
        };
      })
    );

    // Get total count for pagination
    const total = await Category.countDocuments(query);

    res.json({
      success: true,
      data: {
        categories: categoriesWithCount,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get admin categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router; 