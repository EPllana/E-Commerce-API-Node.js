import express from "express";
import {createUser, getAllUsers,updateUser,changePassword,deleteUser,getOneUser} from "../user/user.controller.js"
import {isAuthenticated} from "../../middlewares/auth.middleware.js"


const router = express.Router();

router.post("/", createUser);
router.get("/getAllUsers",isAuthenticated, getAllUsers);
router.put("/update/:id", updateUser)
router.put("/changepassword/:id", changePassword);
router.delete("/:id",deleteUser)
router.get("/:id", getOneUser)
export default router;
