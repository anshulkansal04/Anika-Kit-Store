const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  // Multiple categories instead of single tag
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  // Legacy tag field for backward compatibility
  tag: {
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [50, 'Tag cannot exceed 50 characters']
  },
  // Multiple images instead of single image
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    isMain: {
      type: Boolean,
      default: false
    }
  }],
  // Legacy single image field for backward compatibility
  image: {
    url: String,
    publicId: String
  },
  specifications: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    value: {
      type: String,
      required: true,
      trim: true
    }
  }],
  features: [String],
  sku: {
    type: String,
    unique: true,
    sparse: true
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative']
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  isActive: {
    type: Boolean,
    default: true
  },
  slug: {
    type: String,
    unique: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  },
  seoTitle: {
    type: String,
    maxlength: [60, 'SEO title cannot exceed 60 characters']
  },
  seoDescription: {
    type: String,
    maxlength: [160, 'SEO description cannot exceed 160 characters']
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create slug from product name
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') + '-' + Date.now();
  }
  
  // Ensure at least one image is marked as main
  if (this.images && this.images.length > 0) {
    const hasMain = this.images.some(img => img.isMain);
    if (!hasMain) {
      this.images[0].isMain = true;
    }
  }
  
  // Auto-generate SKU if not provided
  if (!this.sku) {
    this.sku = 'PRD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  
  next();
});

// Virtual for main image
productSchema.virtual('mainImage').get(function() {
  if (this.images && this.images.length > 0) {
    const mainImg = this.images.find(img => img.isMain);
    return mainImg || this.images[0];
  }
  return this.image; // Fallback to legacy image field
});

// Virtual for discounted price
productSchema.virtual('isOnSale').get(function() {
  return this.originalPrice && this.originalPrice > this.price;
});

productSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Index for search functionality
productSchema.index({ name: 'text', description: 'text', shortDescription: 'text' });
productSchema.index({ categories: 1 });
productSchema.index({ tag: 1 }); // Keep for backward compatibility
productSchema.index({ createdAt: -1 });
productSchema.index({ featured: 1 });
productSchema.index({ trending: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ slug: 1 });

// Populate categories by default
productSchema.pre(/^find/, function(next) {
  this.populate('categories', 'name slug image');
  next();
});

module.exports = mongoose.model('Product', productSchema); 