import express, { Router } from "express";
import {createProduct,getAllProducts} from "./product.controller.js"

const router = express.Router();

router.post("/createProduct", createProduct)
router.get("/getAllProducts", getAllProducts)

export default router;