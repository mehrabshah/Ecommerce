const express=require("express");
const app=express();
const cookie_parser=require("cookie-parser");
const errormiddleware=require('./middleware/error')


app.use(cookie_parser())
//Router Routes
app.use(express.json());
//Routes import
const product=require("./routes/productRoute")
const user=require("./routes/userRoute")

app.use("/api/v1",product);
app.use("/api/v1",user);


//middleware for error
app.use(errormiddleware)

module.exports=app; 