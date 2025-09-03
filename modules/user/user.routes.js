import express from "express";
import {createUser, getAllUsers,} from "../user/user.controller.js"
const router = express.Router();

router.post("/", createUser)
router.get("/getAllUsers", getAllUsers)

export default router;
