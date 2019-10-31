const jwtHelper = require("../utils/JWTHelper");
const { JWT_SECRET } = process.env;
const RedisHelper = require("../utils/RedisHelper");
class TokenController {
  async introspectToken(req, res, next) {
    const { token } = req.body;
    let splitToken = null;
    try {
      splitToken = jwtHelper.splitToken(token);
    } catch (e) {
      console.log("token =>" + splitToken);
      return res
        .status(400)
        .send("Invalid Token. Make Sure its a Bearer Token");
    }

    console.log(splitToken);
    try {
      const { role, email, jti } = await jwtHelper.verifyToken(
        splitToken,
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
    const { token } = req.body;
    let splitToken = null;
    try {
      splitToken = jwtHelper.splitToken(token);
    } catch (e) {
      console.log("token =>" + token);
      return res
        .status(400)
        .send("Invalid Token. Make Sure its a Bearer Token");
    }

    console.log(splitToken);
    try {
      const { role, email, jti } = await jwtHelper.verifyToken(
        splitToken,
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
