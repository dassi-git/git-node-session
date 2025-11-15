const express=require("express")
const router=express.Router()
const verifyJWT=require("../middlweware/verifyJwt")

const basketController=require("../controllers/basketController")

router.get("/",verifyJWT,basketController.getId)
router.delete("/:id",verifyJWT ,basketController.deletebasket)
router.delete("/",verifyJWT  ,basketController.deleteAllbasket)
router.put("/:id",verifyJWT ,basketController.updateBasket)
router.post("/",verifyJWT ,basketController.creatProdact)
 


module.exports=router
