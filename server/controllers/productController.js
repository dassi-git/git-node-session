const Product = require("../models/Product")
//להביא את כל המשתמשים
const getAllProducts = async (req, res) => {
    const products = await Product.find().lean()
    return res.json(products)
}

//מביא את המשתמש לפי הid
const getId = async (req, res) => {
    const { id } = req.params
    const products = await Product.findOne({ _id: id })
    return res.json(products)
}
//מחיקה
const deleteProduct = async (req, res) => {
    console.log("**********");
    const { id } = req.params
    console.log(id,"********");
    const delate = await Product.findById({ _id: id })
    if (!delate) {
        return res.status(400).send("not get id")
    }
    const save = await delate.deleteOne()
    return res.json(save)

}
//עדכון מוצר
const updateProduct = async (req, res) => {

    const { _id, name, price, body, exist, image } = req.body
    const updateProduct1 = await Product.findById(_id)

    if (!updateProduct1) {
        return res.status(400).send("eror")
    }
    updateProduct1.name = name
    updateProduct1.price = price
    updateProduct1.body = body
    updateProduct1.exist = exist
    updateProduct1.image = image

    const result = await updateProduct1.save()
    return res.json(result)
}

const creatProduct = async (req, res) => {
    const { name, price, body, exist, image } = req.body
    // console.log(req.body);
    if (!name || !price) {
        console.log("1**************");
        return res.status(400).send("err")
    }
    console.log("2**************");
    const product1 = await Product.create({ name, price, body, exist, image })
    return res.json(product1)
}





module.exports = { deleteProduct, updateProduct, creatProduct, getAllProducts, getId }






