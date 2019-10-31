const express = require("express");
const TokenController = require("../controllers/TokenController");
const { rs_auth } = require("../middleware/authMiddleware");
const TokenRouter = express.Router();

TokenRouter.post("/introspect", rs_auth, TokenController.introspectToken);
TokenRouter.post("/revoke", rs_auth, TokenController.revokeToken);
module.exports = TokenRouter;
