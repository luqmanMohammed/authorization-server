const express = require("express");
const TokenController = require("../controllers/TokenController");
const { rs_auth } = require("../middleware/authMiddleware");
const TokenRouter = express.Router();

TokenRouter.get("/introspect", rs_auth, TokenController.introspectToken);
TokenRouter.get("/revoke", rs_auth, TokenController.revokeToken);
module.exports = TokenRouter;
