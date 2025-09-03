import express from "express";
import {createUser,loginUser, getAllUsers,} from "../user/user.controller.js"
const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/getAllUsers", getAllUsers);
export default router;
