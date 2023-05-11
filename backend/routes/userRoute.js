const express=require("express");
const { registerUsers, LoginUser, logout } = require("../controllers/userController");
const router=express.Router();

router.route("/register").post(registerUsers);
router.route("/login").post(LoginUser);
router.route("/logout").get(logout)

module.exports=router;