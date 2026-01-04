require("dotenv").config()
const express=require("express")
const cors= require("cors")
const corsOption=require("./config/corsOptions")
const connectDB=require("./config/dbconn")
const { default: mongoose } = require("mongoose")
const PORT =process.env.PORT || 1003
const app=express()
connectDB()
app.use(cors(corsOption))
app.use(express.static("public"))
app.use(express.json())
app.use("/api/user",require("./routes/user"))
// app.get('/',(req,res)=>{
// })
app.use("/api/product",require("./routes/product"))
app.use("/api/basket",require("./routes/basket"))

// Global Error Handler - צריך להיות אחרי כל ה-routes
app.use((err, req, res, next) => {
    console.error('Error:', err.stack)
    
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    
    res.status(statusCode).json({
        success: false,
        message: message,
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
})

// 404 Handler - לנתיבים שלא נמצאו
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    })
})

mongoose.connection.once('open',()=>{
    console.log('connected ti mongooseDB');
    app.listen(PORT,()=>console.log(`server runing on ${PORT}`))
})
mongoose.connection.on('error',err=>{
    console.log(err);
})
