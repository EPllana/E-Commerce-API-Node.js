import express from "express";
import {createUser,loginUser, getAllUsers,updateUser,changePassword,deleteUser} from "../user/user.controller.js"
const router = express.Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/getAllUsers", getAllUsers);
router.put("/update/:id", updateUser)
router.put("/changepassword/:id", changePassword);
router.delete("/:id",deleteUser)
export default router;
