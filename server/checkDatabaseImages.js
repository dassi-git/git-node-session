require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function checkCurrentImages() {
    try {
        await mongoose.connect(process.env.DATABASE_URI || process.env.MONGO_URI);
        console.log('✓ Connected to MongoDB\n');
        
        const products = await Product.find().select('name image').limit(10);
        
        console.log('=== Sample of current product images in database ===\n');
        
        if (products.length === 0) {
            console.log('No products found in database.');
        } else {
            products.forEach((product, index) => {
                console.log(`${index + 1}. ${product.name || 'No name'}`);
                console.log(`   Image: ${product.image || 'No image'}\n`);
            });
        }
        
        console.log(`Total products in database: ${await Product.countDocuments()}`);
        
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

checkCurrentImages();
