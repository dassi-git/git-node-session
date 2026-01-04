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
//עדכון סל - הוספת מוצר או עדכון כמות
const updateBasket = async (req, res) => {
    const { id } = req.params
    
    // בדיקה שהמוצר קיים במערכת ובדיקת מלאי עדכני
    const myProduct = await Product.findOne({ _id: id })
    if (!myProduct) {
        return res.status(404).json({ message: "המוצר לא נמצא במערכת" })
    }
    
    // בדיקת מלאי - אם המוצר אזל
    if (myProduct.productExist === "OUTOFSTOCK" || myProduct.productExist === "0") {
        return res.status(400).json({ 
            message: "מצטערים, המוצר אזל מהמלאי",
            productName: myProduct.name,
            outOfStock: true
        })
    }
    
    // בדיקה אם המלאי נמוך
    if (myProduct.productExist === "LOWSTOCK") {
        // ממשיכים אבל מחזירים אזהרה
        console.log(`Warning: Product ${myProduct.name} has low stock`)
    }
    
    // מציאת הסל של המשתמש או יצירתו אם לא קיים
    let myBasket = await Basket.findOne({ userId: req.user._id })
    if (!myBasket) {
        myBasket = await Basket.create({ userId: req.user._id })
    }
    
    // בדיקה אם המוצר כבר קיים בסל
    const existingProduct = myBasket.Products.find((p) => {
        return p.type.toString() === id
    })
    
    if (existingProduct) {
        // אם המוצר כבר קיים - רק מעדכנים את הכמות
        existingProduct.quntity++
    } else {
        // אם המוצר לא קיים - מוסיפים אותו לסל
        myBasket.Products.push({ type: myProduct._id, quntity: 1 })
    }
    
    const result = await myBasket.save()
    
    // הודעת הצלחה עם פרטי המוצר
    res.json({ 
        message: "המוצר נוסף לסל בהצלחה", 
        basket: myBasket,
        productName: myProduct.name,
        stockStatus: myProduct.productExist
    })
}



const creatProduct = async (req, res) => {
    const userId = req.user._id

    const myBasket = await Basket.create({ userId })
    return res.json(myBasket)
}





module.exports = { deletebasket, updateBasket, creatProduct, deleteAllbasket, getId }






