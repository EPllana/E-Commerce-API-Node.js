import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({

   
    shippingAddress:{
        addres:{
            type:String,
            required:true
        },

        city:{type:String,
              required:true
        },
        postalCode:{type:Number,
              required:true
        
        },
        country:{type:String,
                required:true
        },
    },
    status:{
        type:String,
        enum:["pending","shipped","delivered","cancelled"],
        default:"pending"
    },
    totalPrice:{
        type:Number,
        required:true
    },
    paymentResult:{
        id:String,
        status:String,
        email_address:String
    },


    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderItems:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
    },
],

    isActive:{
        type:Boolean,
        default:true
    },
  

    
},{ timestamps: true,}
);



const Order = mongoose.model("Order", orderSchema);
export default Order;