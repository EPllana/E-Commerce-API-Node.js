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

export const updateUser = async(req,res)=>{
  try{
    const userId = req.params.id;
    const{name,surname,email,role,phoneNumber}=req.body;
    const user = await User.findById(userId);
    if(!user){
      return res.status(400).json({message:"User Not Found"})

    }
    if(name)user.name=name;
    if(surname)user.surname=surname;
    if(email)user.email=email;
    if(role)user.role=role;
    if(phoneNumber)user.phoneNumber=phoneNumber;
    await user.save();

    res.status(201).json({message:"User Updated Succefully",user})

  }catch(error){
    console.error("Erro Updating User", error.message);
    res.status(500).json({message:"Server Error"})
  }
}


export const changePassword = async (req,res)=>{
  try{
    const userId=req.params.id   // kta mevon me token e shendrrrojm ne req.user._id;
    const{oldPassword, newPassword}=req.body;

    if(!oldPassword || !newPassword){
      return res.status(400).json({message:"Oldpassword and newPassword Required"})
    }
    const user = await User.findById(userId)
    if(!user){
      return  res.status(400).json({message:"User Not Found"})
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword,user.password)
    if(!isOldPasswordValid){
      return res.status(404).json({message:"Old Passwrod Incorrect"})
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(201).json({message:"Password Changed Succefully"})


  }catch(error){
    console.error("Change Password Doesnt Work")
    res.status(500).json({message:"Server Error"})
  }

}

export const deleteUser = async(req,res)=>{
  try{
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId)
    if(!user){
      return res.status(400).json({message:"User Not Found"})
    }
    res.status(201).json({message:"User Deleted Succefully"})


  }catch(erorr){
    console.error("Error deleting user",erorr),
    res.status(500).json({message:"Server Error"})

  }
}
export const getOneUser = async(req,res)=>{
  try{
    const userId=req.params.id;
    const user = await User.findById(userId)
    if(!user){
      return res.status(404).json({message:"User Not Found"})
    }
    res.status(201).json({message:"User Found",user})


  }catch(error){
    console.log("Error Finding User",error)
    res.status(500).json({message:"Server Error"})

  }
}



