import express from "express";
import {createUser,loginUser, getAllUsers,updateUser,changePassword} from "../user/user.controller.js"
const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/getAllUsers", getAllUsers);
router.put("/update/:id", updateUser)
router.put("/changepassword/:id", changePassword);
export default router;
