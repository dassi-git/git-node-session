const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require("../models/User")


const register = async (req, res) => {
    const { name, userName, adress, phone, email, password } = req.body
    console.log(req.body);
    if (!name || !userName || !adress || !phone || !email || !password)
        return res.status(400).json({ message: 'All fields are required' })
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


// //להביא את כל המשתמשים
//     const getAllUser=async(req,res) =>{
//      const users=await User.find()
//      return res.json(users)   
//     }

// //מביא את המשתמש לפי הid
//  const getId=async(req,res)=>{
//     const {id}=req.params
// const users=await User.findOne(id)
// return res.json(users) 
// }
// //מחיקה
// const deleteUser=async(req,res)=>{
//     const{id}=req.params
//     const delate=await User.findById(id)
//     if(!delate){
//         return res.status(400).send("eror")
//     }
//     const save=await delate.deleteOne()
//     return res.json(save)

// }
// //עדכון משתמש
// const updateUser=async(req,res)=>{
//     const{id}=req.params
//     const{name,userName,adress, phone, emeil,password}=req.body

//     if(!name || !userName||!adress||!phone||!emeil||!password){
//         return res.status(400).send("eror")
// }
// const userUpdate=await User.findById(id)
// userUpdate.name=name
// userUpdate.userName=userName
// userUpdate.adress=adress
// userUpdate.phone=phone
// userUpdate.emeil=emeil
// userUpdate.password=password


// }





module.exports = { login, register }






