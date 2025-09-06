import Product from "../product/product.model.js"

export const createProduct = async(req,res)=>{
    try{
        const {name,description,price,category,image,createdBy}=req.body;
        
        const product = new Product({
            name,description,price,category,image,createdBy
        })
        await product.save();
        res.status(201).json({message:"Product Created Succefully",product})

    }catch(error){
        console.log("Error Creating Product", error)
        res.status(500).json({message:"Server Error"})
    }
}
export const getAllProducts = async (req,res)=>{
    try{
        const search = req.query.search;
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);

        const skip = (page -1) *limit

        let filter={isActive:true}

        if(search){
            filter.$or=[
                {name:{$regex:search,$options:"i"}},
                {category:{$regex:search,$options:"i"}}
            ];
        }


        const product = await Product.find(filter).skip(skip).limit(limit).sort({createdAt:-1});
        const totalDocuments = await Product.countDocuments(filter)
        res.status(200).json({message:"Products Found Succefully",
        product,
        length:product.length,
        data:product,
        totalDocuments:totalDocuments

})


    }catch(error){
        console.log("Error Geting All Products", error)
        res.status(500).json({message:"Server Error"})
    }
}