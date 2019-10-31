const express = require("express");
const UserController = require("../controllers/UserController");
const UserRouter = express.Router();


// auth/register
UserRouter.post("/register", (req,res) => UserController.register(req,res));
// auth/login

// auth/token/revoke

// auth/token/introspect

module.exports = UserRouter;