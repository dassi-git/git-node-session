require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// אותו מיפוי כמו בסקריפט שינוי השמות
const fileNameMapping = {
    // קבצים בעברית
    'אבטיח.jpg': 'watermelon.jpg',
    'חכ פינדרוס.jpeg': 'pindrus.jpeg',
    
    // קבצים גנריים (אותיות קטנות)
    '1.png': 'product-01.png',
    '2.JPG': 'product-02.jpg',
    '4.jpg': 'product-04.jpg',
    '5.jpg': 'product-05.jpg',
    '6.jpg': 'product-06.jpg',
    '7.jpg': 'product-07.jpg',
    '9.jpg': 'product-09.jpg',
    '10.jpg': 'product-10.jpg',
    '11.jpg': 'product-11.jpg',
    '12.jpg': 'product-12.jpg',
    '13.jpg': 'product-13.jpg',
    '14.jpg': 'product-14.jpg',
    '15.png': 'product-15.png',
    '57.jpg': 'product-57.jpg',
    
    // קבצים גנריים (אותיות גדולות - למקרה שיש במסד נתונים)
    '1.PNG': 'product-01.png',
    '4.JPG': 'product-04.jpg',
    '5.JPG': 'product-05.jpg',
    '6.JPG': 'product-06.jpg',
    '7.JPG': 'product-07.jpg',
    '9.JPG': 'product-09.jpg',
    '10.JPG': 'product-10.jpg',
    '11.JPG': 'product-11.jpg',
    '12.JPG': 'product-12.jpg',
    '13.JPG': 'product-13.jpg',
    '14.JPG': 'product-14.jpg',
    '15.PNG': 'product-15.png',
    '57.JPG': 'product-57.jpg',
    
    // קבצים עם תאריכים
    '20240819_101036.jpg': 'item-2024-08-19-01.jpg',
    '20240820_201931.jpg': 'item-2024-08-20-01.jpg',
    '20240820_203323.jpg': 'item-2024-08-20-02.jpg',
    '20240906_154025.jpg': 'item-2024-09-06-01.jpg',
    '20240906_154144.jpg': 'item-2024-09-06-02.jpg',
    '20240906_154232.jpg': 'item-2024-09-06-03.jpg',
    '20240920_160105.jpg': 'item-2024-09-20-01.jpg',
    '20241001_133907.jpg': 'item-2024-10-01-01.jpg',
    '20241001_134017.jpg': 'item-2024-10-01-02.jpg',
    '20241001_141841.jpg': 'item-2024-10-01-03.jpg',
    '20241001_141848.jpg': 'item-2024-10-01-04.jpg',
    '20241001_141908.jpg': 'item-2024-10-01-05.jpg',
    '20241001_141923.jpg': 'item-2024-10-01-06.jpg',
};

async function updateDatabase() {
    console.log('=== Database Image Update Script ===\n');
    
    try {
        // התחברות למסד הנתונים
        await mongoose.connect(process.env.DATABASE_URI || process.env.MONGO_URI);
        console.log('✓ Connected to MongoDB\n');
        
        let totalUpdated = 0;
        let notFound = 0;
        
        console.log('Updating product images...\n');
        
        // מעבר על כל המיפויים ועדכון המסד נתונים
        for (const [oldName, newName] of Object.entries(fileNameMapping)) {
            const result = await Product.updateMany(
                { image: oldName },
                { $set: { image: newName } }
            );
            
            if (result.modifiedCount > 0) {
                console.log(`✓ Updated ${result.modifiedCount} product(s): ${oldName} → ${newName}`);
                totalUpdated += result.modifiedCount;
            } else {
                console.log(`- No products found with image: ${oldName}`);
                notFound++;
            }
        }
        
        console.log('\n=== Update Complete ===');
        console.log(`Total products updated: ${totalUpdated}`);
        console.log(`Images not found in DB: ${notFound}`);
        console.log(`Total mappings processed: ${Object.keys(fileNameMapping).length}\n`);
        
        // סגירת החיבור
        await mongoose.connection.close();
        console.log('✓ Database connection closed');
        process.exit(0);
        
    } catch (error) {
        console.error('\n✗ Error updating database:');
        console.error(error.message);
        
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
        }
        
        process.exit(1);
    }
}

// בדיקה אם המשתמש רוצה לראות תצוגה מקדימה
if (process.argv.includes('--preview')) {
    console.log('=== Preview Mode - No changes will be made ===\n');
    console.log('The following updates would be performed:\n');
    
    Object.entries(fileNameMapping).forEach(([oldName, newName], index) => {
        console.log(`${index + 1}. ${oldName} → ${newName}`);
    });
    
    console.log('\n=== Instructions ===');
    console.log('To actually update the database, run:');
    console.log('node updateDatabaseImages.js\n');
    process.exit(0);
}

// הרצת העדכון
updateDatabase();
