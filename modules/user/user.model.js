import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    surname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        default:null
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    isActive:{
        type:Boolean,
        default:"true"
    },
    isVerified:{
        type:Boolean,
        default:"false"
    },

    roole:{
        type:String,
        enum:["admin","user","moderator"],
        default:"user"
    },
},
{timestampts:true});

const User = mongoose.model("user", userSchema);

export default User;