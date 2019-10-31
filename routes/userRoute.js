const express = require("express");
const UserController = require("../controllers/UserController");
const UserRouter = express.Router();
const { rs_auth } = require("../middleware/authMiddleware");

// auth/register
UserRouter.post("/register", rs_auth, UserController.register);
// auth/login
UserRouter.post("/login", UserController.login);

module.exports = UserRouter;
