const jwtHelper = require("../utils/JWTHelper");
const { JWT_SECRET } = process.env;
class TokenController {
  async introspectToken(req, res, next) {
    const { token } = req.body;
    let splitToken = null
    try {
        splitToken = jwtHelper.splitToken(token);
    }catch (e) {
        console.log("token =>" + splitToken);
        return res.status(400).send("Invalid Token. Make Sure its a Bearer Token");
    }
    
    console.log(splitToken)
    try {
      const { role, email } = await jwtHelper.verifyToken(splitToken, JWT_SECRET);
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
