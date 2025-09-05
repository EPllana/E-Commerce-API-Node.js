
import mongoose  from "mongoose";

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
  },
  price:{
    type:Number,
    required:true
  },
  image:{
    type:String
  },
  category:{
    type:String
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,

  },
  reviews:[reviewSchema],

  isActive:{
    type:Boolean,
    default:"true"
  },

},{timestamps:true}
);

const reviewSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  },
  rating:{
    type:Number,
    min:1,
    max:5,
    required:true
  },
  comment:{
    type:String,

  }

  
})
const Product = mongoose.model("Product",productSchema)
