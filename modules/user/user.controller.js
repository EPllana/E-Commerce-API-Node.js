import User from "./user.model.js";
import bcrypt from "bcrypt";


export const createUser = async(req,res)=>{
    try{
        const {name,surname,email,password,phoneNumber,role}=req.body;

        const existinguser = await User.findOne({email})
        if(existinguser){
            return res.status(404).json({message:"User Exists"})
         }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            surname,
            email,
            phoneNumber,
            password:hashedPassword,
            role:role ||"user"
        })
        await user.save();
       res.status(201).json({message:"User Created Succefully"})
    }catch(error){
        res.status(400).json({ message: error.message });
        
    }
}


export const getAllUsers = async (req,res)=>{
    try{
     
      const search = req.query.search;
      const limit = parseInt(req.query.limit);
      const page = parseInt(req.query.page);

      const skip = (page -1) * limit;

      let filter = {isActive:true};

      if(search){
        filter.$or=[
            {name:{$regex:search,$options:"i"}},
            {surname:{$regex:search,$options:"i"}},
            {email:{$regex:search,$options:"i"}}
        ];
      }

      const users = await User.find(filter).select("-password").sort({createdAt:-1}).limit(limit).skip(skip);
      const totalDocuments = await User.countDocuments(filter)

      res.status(200).json({
        length:users.length,
        data:users,
        totalDocuments:totalDocuments
      });

        
    }catch(error){
        res.status(500).json({message:"server error", error})
      }
}

export const loginUser = async(req,res)=>{
  try{
    const {name,surname,email,password}=req.body;

    const user = await User.findOne(email)
    if(!user){
      return res.status(404).json({message:"Invalid Credicials"})
    }
  
    const isMatched = await bcrypt.compare(password, user.password)
    if(!isMatched){
      return res.status(400).json({message:"Wrong Password"})
    }
    res.status(201).json({message:"Logined Succefully",user})

  }catch(error){

    console.error("Login Error", error),
    res.status(500).json({message:"Server Error"})

  }
}