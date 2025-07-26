const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    maxlength: [100, 'Category name cannot exceed 100 characters']
  },

  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  image: {
    url: {
      type: String,
      required: [true, 'Category image is required']
    },
    publicId: {
      type: String,
      required: true
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  productCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});



// Index for search functionality
categorySchema.index({ name: 'text', description: 'text' });
categorySchema.index({ isActive: 1 });
categorySchema.index({ sortOrder: 1 });

module.exports = mongoose.model('Category', categorySchema); 