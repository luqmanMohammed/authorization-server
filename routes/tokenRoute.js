const express = require("express");
const TokenController = require("../controllers/TokenController");
const TokenRouter = express.Router();

TokenRouter.post("/introspect", TokenController.introspectToken);

//TokenRouter.post("/login", (req,res) => TokenController.register(req,res));

module.exports = TokenRouter;