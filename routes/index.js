const express = require("express");
const UserRouter = require("./userRoute");
const TokenRouter = require("./tokenRoute");
const IndexRouter = express.Router();

// auth/health
IndexRouter.get("/health", (req, res) => {
  res.json({
    health: "active"
  });
});

IndexRouter.use("/user", UserRouter);
IndexRouter.use("/token", TokenRouter);
// auth/register

// auth/login

// auth/token/revoke

// auth/token/introspect

module.exports = IndexRouter;
