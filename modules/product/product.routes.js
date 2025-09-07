import express, { Router } from "express";
import {createProduct,getAllProducts,updateProduct,deleteProduct} from "./product.controller.js"

const router = express.Router();

router.post("/createProduct", createProduct)
router.get("/getAllProducts", getAllProducts)
router.put("/updateProduct/:id", updateProduct)
router.delete("/deleteProduct/:id",deleteProduct)

export default router;