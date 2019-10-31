const jwtHelper = require("../utils/JWTHelper");
const { JWT_SECRET } = process.env;

const authenticateToken = async (req, res, next, role) => {
  let auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(" ")[1];
    let bearer = null;
    try {
      bearer = await jwtHelper.verifyToken(token,JWT_SECRET);
    } catch (error) {
      res.status(401).send("Invalid Token");
      return;
    }
    if (bearer && bearer.role === role) next();
    else res.status(403).send("Unathorized");
  } else res.status(401).send("Invalid Token");
};

module.exports.rs_auth = (req,res,next) => authenticateToken(req,res,next,"resource_server");