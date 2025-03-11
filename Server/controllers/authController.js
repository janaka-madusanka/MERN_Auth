import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';


export const register = async (req,res)=>{

    const{name,email,password} = req.body;
    if(!name || !email || !password){
        return res.json({success:false, message:"All fields are required"});
    }
    try{

        const existingUser = await userModel.findOne({email })
        if(existingUser){
            return res.json({success:false, message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = new userModel({name,email,password:hashedPassword});
        await user.save();

        const token =jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none': 'strict',
            maxAge:7*24*60*60*1000
        });
        return res.json({success:true, message:"User created successfully"});

    }catch(error){
        res.json({success:false, message:error.message});
    }
}

export const login = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.json({success:false, message:"Email and Password are required"});
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"Invalid Email"});
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.json({success:false, message:"Invalid Password"});
        }
        const token =jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none': 'strict',
            maxAge:7*24*60*60*1000
        });

        return res.json({success:true, message:"Login Success"});

    }catch(error){
        res.json({success:false, message:error.message});
    }
}


export const logout = async (req,res)=>{
    try{
        res.clearCookie('token',{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production' ? 'none': 'strict',
        })
        return res.json({success:true, message:"Logged out successfully"});
    }catch(error){
        res.json({success:false, message:error.message});
    }
}
