# File Renaming Script - Instructions

## סקריפט לשינוי שמות קבצים

נוצר סקריפט [renamePublicFiles.js](renamePublicFiles.js) שמטפל בשינוי שמות קבצים בתיקיית `server/public`.

### שימוש:

#### 1. צפייה ברשימת השינויים (ללא ביצוע):
```bash
cd server
node renamePublicFiles.js
```

#### 2. ביצוע השינויים בפועל:
```bash
cd server
node renamePublicFiles.js --execute
```

---

## רשימת השינויים (29 קבצים):

### קבצים בעברית → אנגלית:
- `אבטיח.jpg` → `watermelon.jpg`
- `חכ פינדרוס.jpeg` → `pindrus.jpeg`

### קבצים גנריים → שמות תיאוריים:
- `1.png` → `product-01.png`
- `2.JPG` → `product-02.jpg`
- `4.jpg` → `product-04.jpg`
- `5.jpg` → `product-05.jpg`
- `6.jpg` → `product-06.jpg`
- `7.jpg` → `product-07.jpg`
- `9.jpg` → `product-09.jpg`
- `10.jpg` → `product-10.jpg`
- `11.jpg` → `product-11.jpg`
- `12.jpg` → `product-12.jpg`
- `13.jpg` → `product-13.jpg`
- `14.jpg` → `product-14.jpg`
- `15.png` → `product-15.png`
- `57.jpg` → `product-57.jpg`

### קבצים עם תאריכים → שמות מאורגנים:
- `20240819_101036.jpg` → `item-2024-08-19-01.jpg`
- `20240820_201931.jpg` → `item-2024-08-20-01.jpg`
- `20240820_203323.jpg` → `item-2024-08-20-02.jpg`
- `20240906_154025.jpg` → `item-2024-09-06-01.jpg`
- `20240906_154144.jpg` → `item-2024-09-06-02.jpg`
- `20240906_154232.jpg` → `item-2024-09-06-03.jpg`
- `20240920_160105.jpg` → `item-2024-09-20-01.jpg`
- `20241001_133907.jpg` → `item-2024-10-01-01.jpg`
- `20241001_134017.jpg` → `item-2024-10-01-02.jpg`
- `20241001_141841.jpg` → `item-2024-10-01-03.jpg`
- `20241001_141848.jpg` → `item-2024-10-01-04.jpg`
- `20241001_141908.jpg` → `item-2024-10-01-05.jpg`
- `20241001_141923.jpg` → `item-2024-10-01-06.jpg`

---

## עדכון מסד הנתונים (MongoDB)

### אפשרות 1: עדכון ידני דרך MongoDB Shell

```javascript
// התחבר למסד הנתונים
use your_database_name

// קבצים בעברית
db.products.updateMany({ image: 'אבטיח.jpg' }, { $set: { image: 'watermelon.jpg' } })
db.products.updateMany({ image: 'חכ פינדרוס.jpeg' }, { $set: { image: 'pindrus.jpeg' } })

// קבצים גנריים
db.products.updateMany({ image: '1.png' }, { $set: { image: 'product-01.png' } })
db.products.updateMany({ image: '2.JPG' }, { $set: { image: 'product-02.jpg' } })
db.products.updateMany({ image: '4.jpg' }, { $set: { image: 'product-04.jpg' } })
db.products.updateMany({ image: '5.jpg' }, { $set: { image: 'product-05.jpg' } })
db.products.updateMany({ image: '6.jpg' }, { $set: { image: 'product-06.jpg' } })
db.products.updateMany({ image: '7.jpg' }, { $set: { image: 'product-07.jpg' } })
db.products.updateMany({ image: '9.jpg' }, { $set: { image: 'product-09.jpg' } })
db.products.updateMany({ image: '10.jpg' }, { $set: { image: 'product-10.jpg' } })
db.products.updateMany({ image: '11.jpg' }, { $set: { image: 'product-11.jpg' } })
db.products.updateMany({ image: '12.jpg' }, { $set: { image: 'product-12.jpg' } })
db.products.updateMany({ image: '13.jpg' }, { $set: { image: 'product-13.jpg' } })
db.products.updateMany({ image: '14.jpg' }, { $set: { image: 'product-14.jpg' } })
db.products.updateMany({ image: '15.png' }, { $set: { image: 'product-15.png' } })
db.products.updateMany({ image: '57.jpg' }, { $set: { image: 'product-57.jpg' } })

// קבצים עם תאריכים
db.products.updateMany({ image: '20240819_101036.jpg' }, { $set: { image: 'item-2024-08-19-01.jpg' } })
db.products.updateMany({ image: '20240820_201931.jpg' }, { $set: { image: 'item-2024-08-20-01.jpg' } })
db.products.updateMany({ image: '20240820_203323.jpg' }, { $set: { image: 'item-2024-08-20-02.jpg' } })
db.products.updateMany({ image: '20240906_154025.jpg' }, { $set: { image: 'item-2024-09-06-01.jpg' } })
db.products.updateMany({ image: '20240906_154144.jpg' }, { $set: { image: 'item-2024-09-06-02.jpg' } })
db.products.updateMany({ image: '20240906_154232.jpg' }, { $set: { image: 'item-2024-09-06-03.jpg' } })
db.products.updateMany({ image: '20240920_160105.jpg' }, { $set: { image: 'item-2024-09-20-01.jpg' } })
db.products.updateMany({ image: '20241001_133907.jpg' }, { $set: { image: 'item-2024-10-01-01.jpg' } })
db.products.updateMany({ image: '20241001_134017.jpg' }, { $set: { image: 'item-2024-10-01-02.jpg' } })
db.products.updateMany({ image: '20241001_141841.jpg' }, { $set: { image: 'item-2024-10-01-03.jpg' } })
db.products.updateMany({ image: '20241001_141848.jpg' }, { $set: { image: 'item-2024-10-01-04.jpg' } })
db.products.updateMany({ image: '20241001_141908.jpg' }, { $set: { image: 'item-2024-10-01-05.jpg' } })
db.products.updateMany({ image: '20241001_141923.jpg' }, { $set: { image: 'item-2024-10-01-06.jpg' } })
```

### אפשרות 2: סקריפט Node.js לעדכון המסד נתונים

צור קובץ `updateDatabase.js` והרץ אותו אחרי שינוי שמות הקבצים:

```javascript
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const fileNameMapping = {
    'אבטיח.jpg': 'watermelon.jpg',
    'חכ פינדרוס.jpeg': 'pindrus.jpeg',
    '1.png': 'product-01.png',
    '2.JPG': 'product-02.jpg',
    // ... שאר המיפויים
};

async function updateDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        for (const [oldName, newName] of Object.entries(fileNameMapping)) {
            const result = await Product.updateMany(
                { image: oldName },
                { $set: { image: newName } }
            );
            console.log(`Updated ${result.modifiedCount} products: ${oldName} → ${newName}`);
        }
        
        console.log('Database update complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

updateDatabase();
```

---

## סדר הפעולות המומלץ:

1. **גיבוי:** גבה את התיקייה `server/public` ואת מסד הנתונים
2. **תצוגה מקדימה:** `node renamePublicFiles.js` (בלי --execute)
3. **בדיקה:** בדוק שהשינויים הגיוניים עבורך
4. **עריכה:** ערוך את המיפוי ב-renamePublicFiles.js אם צריך
5. **שינוי שמות:** `node renamePublicFiles.js --execute`
6. **עדכון DB:** הרץ את פקודות ה-MongoDB או את הסקריפט
7. **בדיקה:** ודא שהאפליקציה עובדת תקין

---

## הערות חשובות:

- ⚠️ הסקריפט לא משנה קבצים אוטומטית - צריך להוסיף `--execute`
- ⚠️ יש לעדכן את מסד הנתונים **אחרי** שינוי שמות הקבצים
- ⚠️ מומלץ לעשות גיבוי לפני ביצוע השינויים
- ✅ הסקריפט בודק שהקובץ הישן קיים והחדש לא קיים לפני שינוי
- ✅ השמות החדשים עקביים ומתוארים יותר

---

## התאמה אישית:

אם תרצה לשנות את המיפוי, ערוך את האובייקט `fileNameMapping` בקובץ [renamePublicFiles.js](renamePublicFiles.js).
