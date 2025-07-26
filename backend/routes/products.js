const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Product = require('../models/Product');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { upload, deleteImage } = require('../config/cloudinary');

const router = express.Router();

// Get all products (public route with optional search and filtering)
router.get('/', [
  query('search').optional().trim(),
  query('tag').optional().trim(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('sort').optional().isIn(['newest', 'oldest', 'name', 'price_asc', 'price_desc'])
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
      tag,
      page = 1,
      limit = 12,
      sort = 'newest'
    } = req.query;

    // Build query
    let query = { isActive: true };

    // Add search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Add tag filter
    if (tag) {
      query.tag = tag.toLowerCase();
    }

    // Build sort options
    let sortOptions = {};
    switch (sort) {
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      case 'oldest':
        sortOptions = { createdAt: 1 };
        break;
      case 'name':
        sortOptions = { name: 1 };
        break;
      case 'price_asc':
        sortOptions = { price: 1 };
        break;
      case 'price_desc':
        sortOptions = { price: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    // Calculate skip
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get products with pagination
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get products by tag (public route)
router.get('/tag/:tagName', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 })
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

    const { tagName } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find({
      tag: tagName.toLowerCase(),
      isActive: true
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Product.countDocuments({
      tag: tagName.toLowerCase(),
      isActive: true
    });

    res.json({
      success: true,
      data: {
        products,
        tag: tagName,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get products by tag error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all unique tags (public route)
router.get('/tags/all', async (req, res) => {
  try {
    const tags = await Product.distinct('tag', { isActive: true });
    
    // Get count for each tag
    const tagsWithCount = await Promise.all(
      tags.map(async (tag) => {
        const count = await Product.countDocuments({ tag, isActive: true });
        return { tag, count };
      })
    );

    res.json({
      success: true,
      data: {
        tags: tagsWithCount.sort((a, b) => b.count - a.count)
      }
    });

  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get single product by ID (public route)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true
    }).select('-__v');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: { product }
    });

  } catch (error) {
    console.error('Get product error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create product (admin only)
router.post('/', authenticateToken, upload.single('image'), [
  body('name').trim().isLength({ min: 1, max: 100 }),
  body('description').trim().isLength({ min: 1, max: 1000 }),
  body('price').isFloat({ min: 0 }),
  body('categoryId').optional().trim(),
  body('tag').optional().trim().isLength({ min: 1, max: 50 })
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
        message: 'Product image is required'
      });
    }

    const { name, description, price, categoryId, tag, featured = false } = req.body;

    // Build product data
    const productData = {
      name,
      description,
      price: parseFloat(price),
      image: {
        url: req.file.path,
        publicId: req.file.filename
      },
      featured: featured === 'true'
    };

    // Handle categories - prefer categoryId over tag
    if (categoryId) {
      // Verify the category exists
      const Category = require('../models/Category');
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: 'Selected category does not exist'
        });
      }
      productData.categories = [categoryId];
      productData.tag = tag || category.name.toLowerCase().replace(/\s+/g, '-');
    } else if (tag) {
      // Legacy support: use tag only
      productData.tag = tag.toLowerCase();
    } else {
      return res.status(400).json({
        success: false,
        message: 'Either categoryId or tag is required'
      });
    }

    const product = new Product(productData);

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });

  } catch (error) {
    console.error('Create product error:', error);
    
    // Delete uploaded image if product creation fails
    if (req.file) {
      try {
        await deleteImage(req.file.filename);
      } catch (deleteError) {
        console.error('Error deleting image after failed product creation:', deleteError);
      }
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

// Update product (admin only)
router.put('/:id', authenticateToken, upload.single('image'), [
  body('name').optional().trim().isLength({ min: 1, max: 100 }),
  body('description').optional().trim().isLength({ min: 1, max: 1000 }),
  body('price').optional().isFloat({ min: 0 }),
  body('categoryId').optional().trim(),
  body('tag').optional().trim().isLength({ min: 1, max: 50 })
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

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const { name, description, price, categoryId, tag, featured } = req.body;
    const oldImagePublicId = product.image.publicId;

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = parseFloat(price);
    if (featured !== undefined) product.featured = featured === 'true';

    // Handle category updates
    if (categoryId) {
      // Verify the category exists
      const Category = require('../models/Category');
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: 'Selected category does not exist'
        });
      }
      product.categories = [categoryId];
      product.tag = tag || category.name.toLowerCase().replace(/\s+/g, '-');
    } else if (tag) {
      // Legacy support: update tag only
      product.tag = tag.toLowerCase();
    }

    // Update image if new one is uploaded
    if (req.file) {
      product.image = {
        url: req.file.path,
        publicId: req.file.filename
      };
    }

    await product.save();

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
      message: 'Product updated successfully',
      data: { product }
    });

  } catch (error) {
    console.error('Update product error:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
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

// Delete product (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete image from Cloudinary
    if (product.image.publicId) {
      try {
        await deleteImage(product.image.publicId);
      } catch (deleteError) {
        console.error('Error deleting image from Cloudinary:', deleteError);
      }
    }

    // Delete product from database
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get admin products (includes inactive products)
router.get('/admin/all', authenticateToken, [
  query('search').optional().trim(),
  query('tag').optional().trim(),
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
      tag,
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

    // Add tag filter
    if (tag) {
      query.tag = tag.toLowerCase();
    }

    // Calculate skip
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get products with pagination
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get admin products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router; 