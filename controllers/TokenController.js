const jwtHelper = require("../utils/JWTHelper");
const { JWT_SECRET } = process.env;
const RedisHelper = require("../utils/RedisHelper");
class TokenController {
  async introspectToken(req, res, next) {
    const { token } = req.query;
    if(!token) {
      return res
        .status(400)
        .send("Invalid Token. Make sure the token is sent via the 'token' query parameter");
    }
    console.log(token);
    try {
      const { role, email, jti } = await jwtHelper.verifyToken(
        token,
        JWT_SECRET
      );
      try {
        if (await RedisHelper.isRevoked(email, jti))
          return res.status(200).json({
              active: false
          })
      } catch (redisError) {
        console.error(redisError);
        return res.status(500).send("System Error, Contact Support");
      }
      return res.status(200).json({
        role,
        active: true
      });
    } catch (e) {
      console.log(e);
      return res.status(200).json({
        active: false
      });
    }
  }
  async revokeToken(req,res,next) {
    const { token } = req.query;
    if(!token) {
      return res
        .status(400)
        .send("Invalid Token. Make sure the token is sent via the 'token' query parameter");
    }
    try {
      const { role, email, jti } = await jwtHelper.verifyToken(
        token,
        JWT_SECRET
      );
      try {
        await RedisHelper.addRevokedTokenJTI(email,jti);
      } catch (redisError) {
        console.error(redisError);
        return res.status(500).send("System Error, Contact Support");
      }
      return res.status(200).send("Revoked");
    } catch (e) {
      return res.status(200).send("Revoked");
    }
      
  }
}
module.exports = new TokenController();
