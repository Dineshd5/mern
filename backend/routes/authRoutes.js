const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/authController");
const protectedRoutes = require("./ProtectedRoutes");
router.post("/login", login);
router.post("/register", register);
router.get("/protected", protectedRoutes);
module.exports = router;
