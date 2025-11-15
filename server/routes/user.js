const express=require("express")
const router=express.Router()
const verifyJWT= require("../middlweware/verifyJwt")
const User= require("../controllers/userController")
const  UserControllers=require("../controllers/userController")


router.post("/login",UserControllers.login)
router.post("/register",UserControllers.register)
module.exports=router