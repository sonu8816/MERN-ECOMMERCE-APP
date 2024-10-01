import userModel from "./userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from "validator";
 

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

// route for user login
const loginUser = async (req ,res)=>{
    try {
        const {email , password} = req.body;
        const user = await userModel.findOne({email});
        if(!user) return res.status(404).json({success : false,message : "User not found"})

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) return res.status(401).json({success : false,message : "Password is not correct"})
        else{
            const token = createToken(user._id);
            res.json({success : true , token});
        }

    } catch (error) {
        console.log(error);
        res.json({success : false , message : error.message});
    }
}



// Route for user register

const registerUser = async (req , res)=>{
    try {
        const {name , email , password} = req.body;
        // Checking user already exists or not

        const exists = await userModel.findOne({email});
        if(exists){
            return res.status(400).json({  success : false, message : "User already exists" });
        }
        // validating email format & strong password

        if(!validator.isEmail(email)){
            return res.json({success : false , message: "Please entera valid email"});
        }
        if(password.length < 8){
            return res.json({success : false , message:"Please enter a strong password"});
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user =  await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token});

    } catch (error) {   
        console.log(error);
        res.json({success : false , message : error.message});
    }
}



// route for admin login
const adminLogin = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token});
        }
        else{
            res.json({success : false , message : "Invalid email or password"});
        }
    } catch (error) {   
        console.log(error);
        res.json({success : false , message : error.message});
    }
}


export {loginUser , registerUser , adminLogin}