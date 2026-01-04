# מערכת איפוס סיסמה עם מייל - הוראות הפעלה

## מה נוסף למערכת?

### בשרת (Backend):
1. ✅ מודל `PasswordReset` לשמירת טוקני איפוס זמניים
2. ✅ שירות `emailService` לשליחת מיילים עם nodemailer
3. ✅ Controller functions:
   - `forgotPassword` - מקבל אימייל ושולח קישור איפוס
   - `resetPassword` - מאפס סיסמה לפי טוקן
4. ✅ Routes חדשים:
   - POST `/api/user/forgot-password`
   - POST `/api/user/reset-password`

### בקליינט (Frontend):
1. ✅ דף `ForgotPassword` - טופס בקשת איפוס סיסמה
2. ✅ דף `ResetPassword` - טופס איפוס סיסמה עם טוקן
3. ✅ Mutations חדשים ב-`userSlice`
4. ✅ קישור "שכחתי סיסמה" בדף הלוגין
5. ✅ Routes חדשים:
   - `/forgot-password`
   - `/reset-password/:token`
6. ✅ עיצוב למסכי הצלחה

---

## הגדרת מייל Gmail

### שלב 1: הפעלת 2-Step Verification
1. היכנס ל-Google Account שלך: https://myaccount.google.com
2. לחץ על **Security** בתפריט הצדדי
3. תחת "Signing in to Google" לחץ על **2-Step Verification**
4. עקוב אחרי ההוראות להפעלת אימות דו-שלבי

### שלב 2: יצירת App Password
1. לאחר הפעלת 2-Step Verification, חזור ל-**Security**
2. גלול למטה ל-"Signing in to Google"
3. לחץ על **App passwords** (יופיע רק אחרי הפעלת 2-Step)
4. בחר:
   - **App**: Mail
   - **Device**: Windows Computer (או אחר)
5. לחץ **Generate**
6. **העתק את הסיסמה בת 16 הספרות** (ללא רווחים)

### שלב 3: עדכון קובץ .env
פתח את הקובץ `server/.env` ועדכן:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

**שים לב:**
- החלף `your-email@gmail.com` באימייל האמיתי שלך
- החלף את `EMAIL_PASSWORD` ב-App Password שיצרת (עם או בלי רווחים)

---

## בדיקת המערכת

### 1. הרץ את השרת והקליינט:
```bash
# טרמינל 1 - שרת
cd server
npm run dev

# טרמינל 2 - קליינט
cd client
npm start
```

### 2. בדוק את התהליך:
1. **לך לדף התחברות**: http://localhost:3000/login
2. **לחץ על "שכחתי סיסמה"**
3. **הזן אימייל של משתמש קיים**
4. **בדוק את תיבת המייל** - אמור להגיע מייל יפה עם כפתור איפוס
5. **לחץ על הכפתור במייל** - יעביר אותך לדף איפוס סיסמה
6. **הזן סיסמה חדשה** והצלח!

---

## פתרון בעיות נפוצות

### ❌ "Failed to send reset email"
**פתרון:**
- בדוק ש-EMAIL_USER ו-EMAIL_PASSWORD נכונים ב-.env
- וודא שיצרת App Password (לא הסיסמה הרגילה של Gmail)
- בדוק שהפעלת 2-Step Verification

### ❌ "Invalid or expired reset token"
**פתרון:**
- הטוקן תקף רק שעה אחת
- בקש קישור חדש אם עבר יותר משעה

### ❌ המייל לא מגיע
**פתרון:**
- בדוק בתיקיית Spam/Junk
- וודא שהאימייל שהזנת תואם למשתמש במערכת
- בדוק את console של השרת לשגיאות

### ❌ אימייל לא תקין ב-nodemailer
**פתרון:**
אם אתה משתמש בשירות מייל אחר (לא Gmail), עדכן את `server/config/emailService.js`:

```javascript
const createTransporter = () => {
    return nodemailer.createTransport({
        host: 'smtp.your-provider.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};
```

---

## תכונות המערכת

✅ **אבטחה מלאה**: טוכן ייחודי לכל בקשה  
✅ **פג תוקף**: טוכן תקף רק שעה אחת  
✅ **מייל מעוצב**: HTML יפה עם כפתור ברור  
✅ **UX מצוין**: מסכי הצלחה ברורים  
✅ **אנימציות**: עיצוב מודרני ומרגיע  
✅ **תמיכה בעברית**: כל המסכים בעברית  
✅ **Responsive**: עובד מצוין במובייל  

---

## מבנה הקבצים החדשים

```
server/
├── models/
│   └── PasswordReset.js          # מודל טוקני איפוס
├── config/
│   └── emailService.js           # שירות שליחת מיילים
├── controllers/
│   └── userController.js         # נוספו forgotPassword, resetPassword
└── routes/
    └── user.js                   # נוספו נתיבים חדשים

client/src/features/user/
├── ForgotPassword.js             # דף בקשת איפוס
├── ResetPassword.js              # דף איפוס סיסמה
├── userSlice.js                  # נוספו mutations
├── Auth.css                      # נוסף עיצוב למסכי הצלחה
└── login.js                      # נוסף קישור "שכחתי סיסמה"

client/src/
└── App.js                        # נוספו routes חדשים
```

---

## המשך פיתוח (אופציונלי)

רעיונות לשיפורים עתידיים:
- [ ] הגבלת מספר בקשות איפוס לאימייל (Rate limiting)
- [ ] שליחת מייל אישור לאחר שינוי סיסמה
- [ ] היסטוריית איפוס סיסמאות
- [ ] שאלות אבטחה נוסxxxxxxxxxxxxxMS במקום/בנוסף למייל

---

**המערכת מוכנה לשימוש!** 🎉

אם יש בעיות, בדוק את console של השרת והקליינט לשגיאות.
