const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const User = require("../models/User")
const PasswordReset = require("../models/PasswordReset")
const { sendPasswordResetEmail } = require("../config/emailService")


const register = async (req, res) => {
    const { name, userName, adress, phone, email, password } = req.body
    console.log(req.body);
    
    // בדיקה שכל השדות קיימים
    if (!name || !userName || !adress || !phone || !email || !password)
        return res.status(400).json({ message: 'All fields are required' })
    
    // ולידציה לאימייל - בדיקה שהפורמט תקין
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' })
    }
    
    // ולידציה לסיסמה - בדיקה שהאורך לפחות 6 תווים
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' })
    }
    
    // בדיקת שם משתמש כפול
    const userExist = await User.findOne({ userName: userName }).lean()
    if (userExist)
        return res.status(409).json({ message: "Duplicate username" })
    
    // בדיקת אימייל כפול
    const emailExist = await User.findOne({ email: email }).lean()
    if (emailExist)
        return res.status(409).json({ message: "Email already exists" })
    
    try {
        const bcryptPassword = await bcrypt.hash(password, 10)
        const userObj = { name, userName, adress, phone, email, password: bcryptPassword}
        const user = await User.create(userObj)
        if (user) {
            return res.status(201).json({ message: `New user ${user.userName} created` })
        } else {
            return res.status(400).json({ message: 'Invalid user received' })
        }
    } catch (error) {
        // טיפול בשגיאות MongoDB (duplicate key)
        if (error.code === 11000) {
            if (error.keyPattern.email) {
                return res.status(409).json({ message: 'Email already exists' })
            } else if (error.keyPattern.userName) {
                return res.status(409).json({ message: 'Username already exists' })
            } else {
                return res.status(409).json({ message: 'Duplicate data found' })
            }
        }
        console.error('Registration error:', error)
        return res.status(500).json({ message: 'Server error during registration' })
    }
}

const login = async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password)
        return res.status(400).json({ message: 'All fields are required' })
    const foundUser = await User.findOne({ userName }).lean()
    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })

    }
    const okPassword = await bcrypt.compare(password, foundUser.password)
    if (!okPassword) return res.status(401).json({ message: 'Unauthorized' })


    const userInfo = { _id: foundUser._id, name: foundUser.name, password: foundUser.password, phone: foundUser.phone, emeil: foundUser.email, role:foundUser.role }
    const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ token: token })
}


const getAllUser = async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }
    return res.json(users)
}

const getUserById = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id).select('-password').lean()
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    return res.json(user)
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    await user.deleteOne()
    return res.json({ message: `User ${user.userName} deleted` })
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, userName, adress, phone, email, password, role } = req.body

    console.log('=== UPDATE USER REQUEST ===');
    console.log('ID:', id);
    console.log('Body received:', req.body);
    console.log('Role in request:', role);
    console.log('Password provided:', !!password);

    // בדיקה שכל השדות הנדרשים קיימים (password אופציונלי)
    if (!name || !userName || !adress || !phone || !email) {
        console.log('Missing required fields');
        return res.status(400).json({ message: 'All required fields must be provided' })
    }
    
    const user = await User.findById(id)
    if (!user) {
        console.log('User not found');
        return res.status(404).json({ message: 'User not found' })
    }
    
    console.log('User before update:', { name: user.name, role: user.role });
    
    user.name = name
    user.userName = userName
    user.adress = adress
    user.phone = phone
    user.email = email
    
    // עדכון תפקיד אם נשלח (מאפשר Admin או User)
    if (role !== undefined && (role === 'Admin' || role === 'User')) {
        console.log('Updating role from', user.role, 'to', role);
        user.role = role
    } else {
        console.log('Role not updated. Role value:', role, 'Type:', typeof role);
    }
    
    // עדכון סיסמה רק אם נשלחה סיסמה חדשה
    if (password && password.trim() !== '') {
        user.password = await bcrypt.hash(password, 10)
        console.log('Password updated');
    } else {
        console.log('Password not updated');
    }
    
    await user.save()
    console.log('User after save:', { name: user.name, role: user.role });
    console.log('=== END UPDATE ===\n');
    
    return res.json({ message: `User ${user.userName} updated`, user: { ...user._doc, password: undefined } })
}

const getCurrentUserProfile = async (req, res) => {
    // המידע של המשתמש כבר נמצא ב-req.user מה-verifyJWT middleware
    const userId = req.user?._id
    
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    
    try {
        const user = await User.findById(userId).select('-password').lean()
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        
        return res.json(user)
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Server error' })
    }
}

const logout = async (req, res) => {
    // בדיקה אם קיימת עוגיית refresh token
    const cookies = req.cookies
    
    if (!cookies?.jwt) {
        // אם אין עוגייה, עדיין נחזיר הצלחה (המשתמש כבר לא מחובר)
        return res.status(204).json({ message: 'No token to clear' })
    }
    
    // ניקוי העוגייה מהדפדפן
    res.clearCookie('jwt', { 
        httpOnly: true, 
        sameSite: 'None', 
        secure: true 
    })
    
    return res.json({ message: 'Logout successful' })
}

const forgotPassword = async (req, res) => {
    const { email } = req.body
    
    console.log('🔐 בקשה לאיפוס סיסמה עבור:', email)
    
    if (!email) {
        return res.status(400).json({ message: 'Email is required' })
    }
    
    try {
        // חיפוש המשתמש לפי אימייל
        const user = await User.findOne({ email })
        
        if (!user) {
            console.log('⚠️ המייל לא נמצא במערכת:', email)
            // מסיבות אבטחה, נחזיר הצלחה גם אם המשתמש לא קיים
            return res.json({ message: 'If the email exists, a reset link has been sent' })
        }
        
        console.log('✓ משתמש נמצא:', user.name)
        
        // מחיקת טוקנים ישנים של המשתמש הזה
        await PasswordReset.deleteMany({ userId: user._id })
        console.log('✓ טוקנים ישנים נמחקו')
        
        // יצירת טוקן ייחודי
        const resetToken = crypto.randomBytes(32).toString('hex')
        console.log('✓ טוקן חדש נוצר')
        
        // שמירת הטוקן במסד הנתונים
        await PasswordReset.create({
            userId: user._id,
            email: user.email,
            token: resetToken
        })
        console.log('✓ טוקן נשמר במסד הנתונים')
        
        // שליחת המייל
        console.log('📧 מנסה לשלוח מייל...')
        const emailResult = await sendPasswordResetEmail(email, resetToken, user.name)
        
        if (!emailResult.success) {
            console.error('❌ שליחת המייל נכשלה:', emailResult.error)
            return res.status(500).json({ message: 'Failed to send reset email. Please try again later.' })
        }
        
        console.log('✅ המייל נשלח בהצלחה!')
        return res.json({ message: 'Password reset link has been sent to your email' })
    } catch (error) {
        console.error('❌ שגיאה באיפוס סיסמה:', error)
        return res.status(500).json({ message: 'Server error. Please try again later.' })
    }
}

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body
    
    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password are required' })
    }
    
    // ולידציה לסיסמה
    if (newPassword.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' })
    }
    
    try {
        // חיפוש הטוקן במסד הנתונים
        const resetRecord = await PasswordReset.findOne({ token })
        
        if (!resetRecord) {
            return res.status(400).json({ message: 'Invalid or expired reset token' })
        }
        
        // מציאת המשתמש
        const user = await User.findById(resetRecord.userId)
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        
        // עדכון הסיסמה
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save()
        
        // מחיקת הטוקן אחרי שימוש
        await PasswordReset.deleteOne({ _id: resetRecord._id })
        
        return res.json({ message: 'Password has been reset successfully' })
    } catch (error) {
        console.error('Reset password error:', error)
        return res.status(500).json({ message: 'Server error. Please try again later.' })
    }
}

module.exports = { login, register, getAllUser, getUserById, deleteUser, updateUser, logout, getCurrentUserProfile, forgotPassword, resetPassword }






