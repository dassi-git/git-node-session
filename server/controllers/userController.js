const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require("../models/User")


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
    
    const userExist = await User.findOne({ userName: userName }).lean()
    if (userExist)
        return res.status(409).json({ message: "Duplicate username" })
    const bcryptPassword = await bcrypt.hash(password, 10)
    const userObj = { name, userName, adress, phone, email, password: bcryptPassword}
    const user = await User.create(userObj)
    if (user) {
        return res.status(201).json({ message: `New user ${user.userName}  created` })
    }
    else {
        return res.status(400).json({ message: 'Invalid user received' })

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
    const { name, userName, adress, phone, email, password } = req.body

    if (!name || !userName || !adress || !phone || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }
    user.name = name
    user.userName = userName
    user.adress = adress
    user.phone = phone
    user.email = email
    user.password = await bcrypt.hash(password, 10)
    
    await user.save()
    return res.json({ message: `User ${user.userName} updated` })
}

module.exports = { login, register, getAllUser, getUserById, deleteUser, updateUser }






