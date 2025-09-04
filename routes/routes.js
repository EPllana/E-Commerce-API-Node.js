import express from "express";
import userRoutes from "../modules/user/user.routes.js";
import orderRoutes from "../modules/order/order.routes.js";

const router = express.Router();

router.use("/users", userRoutes)
router.use("/orders", orderRoutes)


export default router;