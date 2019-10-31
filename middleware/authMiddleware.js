const jwt = require("jwt");

const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next, role) => {
  let auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ")[1];
    let bearer = null;
    try {
      bearer = jwt.verify(token, JWT_SECRET);
      //check if revoked

    } catch (error) {
      res.status(401).json({ msg: "Invalid Token" });
      return;
    }
    if (bearer && bearer.role === role) next();
    else res.status(403).json({ msg: "Unathorized" });
  } else res.status(401).json({ msg: "Invalid Token" });
};

module.exports.rs_auth = (req,res,next) => authenticateToken(req,res,next,"resource_server");