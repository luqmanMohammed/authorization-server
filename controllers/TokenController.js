const jwtHelper = require("../utils/JWTHelper");
const { JWT_SECRET } = process.env;
class TokenController {
  async introspectToken(req, res, next) {
    const { token } = req.body;
    const splitToken = jwtHelper.splitToken(token);
    console.log(splitToken)
    try {
      const { role, email } = await jwtHelper.verifyToken(splitToken, JWT_SECRET);
      // check revoke
      return res.status(200).json({
        role,
        active: true
      });
    } catch (e) {
        console.log(e)
      return res.status(200).json({
        active: false
      });
    }
  }
}
module.exports = new TokenController();
