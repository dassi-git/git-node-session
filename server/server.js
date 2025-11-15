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

mongoose.connection.once('open',()=>{
    console.log('connected ti mongooseDB');
    app.listen(PORT,()=>console.log(`server runing on ${PORT}`))
})
mongoose.connection.on('error',err=>{
    console.log(err);
})
