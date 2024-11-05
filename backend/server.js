import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./controllers/mongodb.js";
import productRouter from "./routes/productRouter.js"; 
import userRouter from "./routes/userRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


// App config

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
// middleware
app.use(cors());
app.use(express.json());


// api endpoints

app.use('/api/user' , userRouter);
app.use('/api/product' , productRouter);
app.use('/api/cart' , cartRouter);
app.use('/api/order' , orderRouter);



app.get('/' , (req,res)=>{
    res.send("Api Working");
})


app.listen(port,()=>console.log("Server started on PORT : " + port));