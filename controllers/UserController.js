const User = require("../models/UserSchema");
const jwtHelper = require("../utils/JWTHelper");
const { hash } = require("bcrypt");
const { BCRYPT_ROUNDS, JWT_SECRET } = process.env;

class UserController {
  async register(req, res, next) {
    const { email, password } = req.body;

    try {
      const isDuplicate = User.find({ email });
      if (isDuplicate) {
        return res.status(400).json();
      }
      const User = new User({
        email,
        password: await hash(password, BCRYPT_ROUNDS)
      });
      const savedUser = await User.save();
      const token = jwtHelper.createToken(user, JWT_SECRET);
      return res.status(201).json({
        access_token: token
      });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }
}

module.exports = new UserController();
