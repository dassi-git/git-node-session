const express=require("express")
const router=express.Router()
const verifyJWT= require("../middleware/verifyJwt")
const admin= require("../middleware/admin")
const UserControllers=require("../controllers/userController")

router.post("/login",UserControllers.login)
router.post("/register",UserControllers.register)
router.post("/logout",UserControllers.logout)
router.post("/forgot-password",UserControllers.forgotPassword)
router.post("/reset-password",UserControllers.resetPassword)

router.get("/profile", verifyJWT, UserControllers.getCurrentUserProfile)
router.get("/", [verifyJWT, admin], UserControllers.getAllUser)
router.get("/:id", verifyJWT, UserControllers.getUserById)
router.delete("/:id", [verifyJWT, admin], UserControllers.deleteUser)
router.put("/:id", verifyJWT, UserControllers.updateUser)

module.exports=router