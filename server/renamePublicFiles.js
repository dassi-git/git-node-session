const fs = require('fs');
const path = require('path');

// המיפוי של שמות קבצים - ניתן לערוך לפי הצורך
const fileNameMapping = {
    // קבצים בעברית
    'אבטיח.jpg': 'watermelon.jpg',
    'חכ פינדרוס.jpeg': 'pindrus.jpeg',
    
    // קבצים גנריים - צריך להחליף לשמות תיאוריים
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
    
    // קבצים עם תאריכים - אפשר לתת שמות תיאוריים יותר
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

const publicDir = path.join(__dirname, 'public');
const renameLog = [];

console.log('=== File Renaming Script ===\n');
console.log('Directory:', publicDir);
console.log('\n--- Files to be renamed: ---\n');

// קריאת כל הקבצים בתיקייה
const files = fs.readdirSync(publicDir);

// מעבר על כל הקבצים והדפסת המיפוי
files.forEach(file => {
    if (fileNameMapping[file]) {
        const oldPath = path.join(publicDir, file);
        const newFileName = fileNameMapping[file];
        const newPath = path.join(publicDir, newFileName);
        
        renameLog.push({
            old: file,
            new: newFileName,
            oldPath: oldPath,
            newPath: newPath
        });
        
        console.log(`OLD: ${file}`);
        console.log(`NEW: ${newFileName}`);
        console.log('---');
    }
});

console.log('\n=== Summary ===');
console.log(`Total files to rename: ${renameLog.length}`);
console.log('\n--- SQL Update Queries (Example) ---\n');

// יצירת דוגמאות לשאילתות עדכון למסד הנתונים
renameLog.forEach(item => {
    console.log(`-- Update ${item.old} to ${item.new}`);
    console.log(`UPDATE products SET image = '${item.new}' WHERE image = '${item.old}';`);
});

console.log('\n--- MongoDB Update Queries (Example) ---\n');

renameLog.forEach(item => {
    console.log(`// Update ${item.old} to ${item.new}`);
    console.log(`db.products.updateMany({ image: '${item.old}' }, { $set: { image: '${item.new}' } });`);
});

console.log('\n\n=== Do you want to proceed with renaming? ===');
console.log('Run the following command to actually rename the files:');
console.log('node renamePublicFiles.js --execute\n');

// אם הארגומנט --execute הועבר, בצע את השינוי בפועל
if (process.argv.includes('--execute')) {
    console.log('\n--- Renaming files... ---\n');
    
    let successCount = 0;
    let errorCount = 0;
    
    renameLog.forEach(item => {
        try {
            // בדיקה שהקובץ הישן קיים והחדש לא קיים
            if (fs.existsSync(item.oldPath) && !fs.existsSync(item.newPath)) {
                fs.renameSync(item.oldPath, item.newPath);
                console.log(`✓ Renamed: ${item.old} → ${item.new}`);
                successCount++;
            } else if (!fs.existsSync(item.oldPath)) {
                console.log(`✗ Error: ${item.old} does not exist`);
                errorCount++;
            } else if (fs.existsSync(item.newPath)) {
                console.log(`✗ Error: ${item.new} already exists`);
                errorCount++;
            }
        } catch (err) {
            console.log(`✗ Error renaming ${item.old}: ${err.message}`);
            errorCount++;
        }
    });
    
    console.log('\n=== Renaming Complete ===');
    console.log(`Success: ${successCount} files`);
    console.log(`Errors: ${errorCount} files`);
    console.log('\nDon\'t forget to update your database!');
} else {
    console.log('No files were renamed. Use --execute flag to perform the actual renaming.');
}
