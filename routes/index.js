const express = require("express");
const IndexRouter = express.Router();

// auth/health
IndexRouter.get("/health", (req,res) => {
    req.json({
        "health": "active"
    })
})

// auth/register

// auth/login

// auth/token/revoke

// auth/token/introspect
