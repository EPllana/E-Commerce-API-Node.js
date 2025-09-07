import express, { Router } from "express";
import {createProduct,getAllProducts,updateProduct} from "./product.controller.js"

const router = express.Router();

router.post("/createProduct", createProduct)
router.get("/getAllProducts", getAllProducts)
router.put("/updateProduct/:id", updateProduct)

export default router;