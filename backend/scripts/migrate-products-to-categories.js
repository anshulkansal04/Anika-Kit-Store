const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecatalogue', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function migrateProductsToCategories() {
  try {
    // console.log('Starting migration: Associating products with categories...');
    
    // Get all products that have tags but empty categories
    const products = await Product.find({
      categories: { $size: 0 },
      tag: { $exists: true, $ne: '' }
    });
    
    // console.log(`Found ${products.length} products to migrate`);
    
    // Get all categories
    const categories = await Category.find({});
    // console.log(`Found ${categories.length} categories`);
    
    let migratedCount = 0;
    
    for (const product of products) {
      // Try to find a matching category based on the tag
      const matchingCategory = categories.find(category => {
        const categoryTag = category.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
        return categoryTag === product.tag;
      });
      
      if (matchingCategory) {
        // Update the product to include the category
        await Product.findByIdAndUpdate(product._id, {
          $push: { categories: matchingCategory._id }
        });
        
        console.log(`✅ Migrated product "${product.name}" to category "${matchingCategory.name}"`);
        migratedCount++;
      } else {
        console.log(`⚠️  No matching category found for product "${product.name}" with tag "${product.tag}"`);
      }
    }
    
    // console.log(`\n🎉 Migration completed! ${migratedCount} products migrated.`);
    
    // Update category product counts
    // console.log('\nUpdating category product counts...');
    for (const category of categories) {
      const productCount = await Product.countDocuments({ 
        categories: category._id, 
        isActive: true 
      });
      
      await Category.findByIdAndUpdate(category._id, { productCount });
      // console.log(`Updated category "${category.name}" product count to ${productCount}`);
    }
    
    // console.log('\n✅ Category product counts updated!');
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the migration
migrateProductsToCategories(); 