import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../user/user.model.js"


const secretKey = process.env.SECRET_KEY;

export const loginUser = async(req,res)=>{
    try{
      const {email,password}=req.body;
  
      const user = await User.findOne({email})
      if(!user){
        return res.status(404).json({message:"Invalid Credicials"})
      }
    
      const isMatched = await bcrypt.compare(password, user.password)
      if(!isMatched){
        return res.status(400).json({message:"Wrong Password"})
      }

      const payload = {
        id:user._id,
        role:user.role,
      }

      const token = jwt.sign(payload,secretKey,{expiresIn:"1h"})
  
      res.status(201).json({message:"Logined Succefully",
      token,
      user:{
        id:user._id,
        role:user.role
      },
      
    
    })
  
    }catch(error){
  
      console.error("Login Error", error),
      res.status(500).json({message:"Server Error"})
  
    }
  }