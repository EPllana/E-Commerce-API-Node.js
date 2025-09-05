import express, { Router } from "express";
import {createProduct} from "./product.controller.js"

const router = express.Router();

router.post("/createProduct", createProduct)

export default router;