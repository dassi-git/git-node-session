const express = require("express")
const router = express.Router()
const verifyJWT = require("../middlweware/verifyJwt")
const admin = require("../middlweware/admin")

const productController = require("../controllers/productController")

router.get("/", productController.getAllProducts)
router.get("/:id", productController.getId)

router.delete("/:id", [verifyJWT, admin], productController.deleteProduct)
router.put("/", [verifyJWT, admin], productController.updateProduct)
router.post("/", [verifyJWT, admin], productController.creatProdact)


module.exports = router
