import express from "express";
import userRoutes from "../modules/user/user.routes.js";
import orderRoutes from "../modules/order/order.routes.js";
import productRoutes from "../modules/product/product.routes.js"
import authRoutes from "../modules/auth/auth.routes.js"

const router = express.Router();

router.use("/users", userRoutes)
router.use("/orders", orderRoutes)
router.use("/product",productRoutes)
router.use("/auth", authRoutes)


export default router;