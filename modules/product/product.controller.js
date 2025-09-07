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
        const minPrice = parseFloat(req.query.minPrice) || 0;
        const maxPrice = parseFloat(req.query.maxPrice);        
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        const skip = (page -1) *limit

        let filter = {};

        if(search){
            filter.$or=[
                {name:{$regex:search,$options:"i"}},
                {category:{$regex:search,$options:"i"}}
            ];
        }

        if(!isNaN(minPrice) || !isNaN(maxPrice)){
            filter.price = {};
            if(!isNaN(minPrice)) filter.price.$gte = minPrice;
            if(!isNaN(maxPrice)) filter.price.$lte = maxPrice;
        }
        
        const product = await Product.find().skip(skip).limit(limit).sort({createdAt:-1});
        console.log(product);
        const totalDocuments = await Product.countDocuments()
       
        res.status(200).json({
            message: "Products Found Successfully",
            product,
            total: product.length
        });
        

    }catch(error){
        console.log("Error Geting All Products", error)
        res.status(500).json({message:"Server Error"})
    }
}

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const findProduct = await Product.findById(productId);
        if (!findProduct) {
            return res.status(404).json({ message: "Error Finding Product" });
        }

        const { name, description, price, category, image, isActive } = req.body;
        if (name) findProduct.name = name;
        if (description) findProduct.description = description;
        if (price) findProduct.price = price;
        if (category) findProduct.category = category;
        if (image) findProduct.image = image;
        if (typeof isActive === "boolean") findProduct.isActive = isActive;

        await findProduct.save();

        res.status(200).json({
            message: "Product Updated Successfully",
            product: findProduct
        });

    } catch (error) {
        console.log("Error Updating Product", error);
        res.status(500).json({ message: "Server Error" });
    }
};
