const Basket = require("../models/Basket")
const Product = require("../models/Product")


//מביא את הסל לפי הusername
const getId = async (req, res) => {
    const userId = req.user._id
    // const myBasket = await Basket.findOne({ userId: userId })
    // myBasket.Products.find().populate("type")//
    //1. תשימו תמודל
    //2. תשיתו לו את הפנקציה הזאת ותכתבו לו שאתן רוצות
    //להביא את השם של המוצר ואת המחיר 
    //באמצעות populate
    // מה שה aiנתן :
    const myBasket = await Basket.findOne({ userId: userId }).populate({
        path: 'Products.type', // הנתיב לשדה שאתה רוצה לאכלס
        select: 'name price body image productExist' 
      });
      if (!myBasket) {
        return res.status(404).json({ message: 'Basket not found for this user.' });
    }
    const populatedProductsArray = myBasket.Products.map(item => {
        // אם המוצר לא נמצא (type: null), נחזיר null או נסנן אותו
        if (!item.type) {
            return null; // או שאתה יכול להחזיר אובייקט עם הודעת שגיאה או פשוט לא לכלול אותו
        }
    
    // console.log("populatedProductsArray",populatedProductsArray);
    return {
        ...item.type.toObject(), // המיר את אובייקט המוצר המאוחלס לאובייקט רגיל
        quantity: item.quntity // הוסף את הכמות מהסל המקורי
    };})
    console.log("populatedProductsArray",populatedProductsArray);
    return res.json(populatedProductsArray)
}
//מחיקה לפי מוצר
const deletebasket = async (req, res) => {
    const { id } = req.params


    const myBasket = await Basket.findOne({ userId: req.user._id })
    if (myBasket) {
        const delate = myBasket.Products.find((p) => {
            return p.type == id
        })
        if (!delate) {
            return res.status(400).send("not get id")
        }
        if (delate.quntity > 1) {
            delate.quntity--
        }
        else {
            myBasket.Products = myBasket.Products.filter((p)=>{
                return p.type!=id
            })
        }
        const save = await myBasket.save()
        return res.json(save)
    }
    else {
        return res.status(404).send("not found  basket")
    }
}
//מחיקה
const deleteAllbasket = async (req, res) => {
    const myBasket = await Basket.findOne({ userId: req.user._id })

    if (!myBasket) {
        return res.status(400).send("basket is not defaind")
    }


    const save = await myBasket.deleteOne()
    return res.json(save)

}
//עדכון סל
const updateBasket = async (req, res) => {
    const { id } = req.params
    let myBasket = await Basket.findOne({ userId: req.user._id })
    if (!myBasket) {
        await creatProduct(req, res)
        myBasket = await Basket.findOne({ userId: req.user._id })
    }
    const product = myBasket.Products.find((p) => {
        return p.type == id
    })
    // console.log(product, myBasket);
    if (product)
        product.quntity++
    else {
        const myProduct1 = await Product.findOne({ _id: id })
        if (!myProduct1)
            return res.status(400).send("not found this product")
        myBasket.Products.push({ type: myProduct1._id })
    }
    const result = await myBasket.save()
    res.send(myBasket)
}



const creatProduct = async (req, res) => {
    const userId = req.user._id

    const myBasket = await Basket.create({ userId })
    return res.json(myBasket)
}





module.exports = { deletebasket, updateBasket, creatProduct, deleteAllbasket, getId }






