const express=require("express")
const router=express.Router()
const verifyJWT= require("../middleware/verifyJwt")
const admin= require("../middleware/admin")
const { loginLimiter, registerLimiter, passwordResetLimiter } = require("../middleware/rateLimiter")
const UserControllers=require("../controllers/userController")

router.post("/login", loginLimiter, UserControllers.login)
router.post("/register", registerLimiter, UserControllers.register)
router.post("/logout",UserControllers.logout)
router.post("/forgot-password", passwordResetLimiter, UserControllers.forgotPassword)
router.post("/reset-password", passwordResetLimiter, UserControllers.resetPassword)

router.get("/profile", verifyJWT, UserControllers.getCurrentUserProfile)
router.get("/", [verifyJWT, admin], UserControllers.getAllUser)
router.get("/:id", verifyJWT, UserControllers.getUserById)
router.delete("/:id", [verifyJWT, admin], UserControllers.deleteUser)
router.put("/:id", verifyJWT, UserControllers.updateUser)

module.exports=router