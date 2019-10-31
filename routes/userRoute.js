const express = require("express");
const UserController = require("../controllers/UserController");
const UserRouter = express.Router();


// auth/register
UserRouter.post("/register", (req,res) => UserController.register(req,res));
// auth/login
UserRouter.post("/login", (req,res) => UserController.login(req,res));
// auth/token/revoke

// auth/token/introspect

module.exports = UserRouter;