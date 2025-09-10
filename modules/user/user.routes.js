import express from "express";
import {createUser, getAllUsers,updateUser,changePassword,deleteUser,getOneUser,updateMe} from "../user/user.controller.js"
import {isAuthenticated,rolet} from "../../middlewares/auth.middleware.js"


const router = express.Router();

router.post("/", createUser);
router.get("/getAllUsers",isAuthenticated, rolet(["admin"]), getAllUsers);
router.put("/update/:id", updateUser)
router.put("/changepassword",isAuthenticated, changePassword);
router.delete("/:id",deleteUser)
router.get("/:id", getOneUser)
router.put("/updateMe",isAuthenticated,updateMe)
export default router;
