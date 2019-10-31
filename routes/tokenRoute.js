// auth/token/revoke

// auth/token/introspect
const express = require("express");
const UserController = require("../controllers/UserController");
const TokenRouter = express.Router();


// auth/register
TokenRouter.post("/register", (req,res) => UserController.register(req,res));
// auth/login
TokenRouter.post("/login", (req,res) => UserController.register(req,res));

module.exports = TokenRouter;