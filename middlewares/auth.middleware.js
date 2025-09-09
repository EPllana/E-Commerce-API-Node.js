import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../modules/user/user.model.js";

const secretKey = process.env.SECRET_KEY;

export const isAuthenticated = async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"Access Denied No Token Provided"})
    }
    try{
        const token = authHeader.split(" ")[1]
        const decode = jwt.verify(token,secretKey);
        const user = await User.findById(decode.id)
        req.user=user;
        next();

    }catch(error){
        res.status(201).json({message:"Token Expired"})

    }
}

export const rolet = (roles)=> {
    return(req, res, next)=>{
       console.log(req.user, "useri i bome login") 
       if(!req.user){
          return res.status(401).json({message:"Acces Denied"})
       }
       if(roles && !roles.includes(req.user.role)) 
          return res.status(401).json({message:"Acces Denied"})
       }
       next();
    }
 


