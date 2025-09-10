import express from "express";
import {createUser, getAllUsers,updateUser,changePassword,deleteUser,getOneUser,updateMe,deleteMe} from "../user/user.controller.js"
import {isAuthenticated,rolet} from "../../middlewares/auth.middleware.js"


const router = express.Router();

router.post("/", createUser);
router.delete("/deleteMe",isAuthenticated, deleteMe)

router.get("/getAllUsers",isAuthenticated, rolet(["admin"]), getAllUsers);
router.put("/update/:id", updateUser)
router.put("/changepassword",isAuthenticated, changePassword);
router.delete("/:id", isAuthenticated,rolet(["admin"]),deleteUser)
router.get("/:id", getOneUser)
router.put("/updateMe",isAuthenticated,updateMe)
export default router;
